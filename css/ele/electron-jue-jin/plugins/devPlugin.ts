import { type ViteDevServer } from 'vite'

export const devPlugin = () => {
  return {
    name: 'dev-plugin',
    configureServer(server: ViteDevServer) {
      // 构建主进程代码
      require('esbuild').buildSync({
        entryPoints: ['./src/main/mainEntry.ts'],
        bundle: true,
        platform: 'node',
        outfile: './dist/mainEntry.js',
        external: ['electron']
      })

      server.httpServer?.once('listening', () => {
        const { spawn } = require('child_process')
        const addressInfo = server.httpServer?.address()
        let httpAddress: string
        
        if (typeof addressInfo === 'string') {
          httpAddress = addressInfo
        } else if (addressInfo) {
          httpAddress = `http://localhost:${addressInfo.port}`
        } else {
          httpAddress = 'http://localhost:3000'
        }

        console.log('Starting Electron with URL:', httpAddress)
        
        const electronProcess = spawn(
          require('electron').toString(),
          ['./dist/mainEntry.js', httpAddress],
          { 
            cwd: process.cwd(), 
            stdio: 'inherit' 
          }
        )

        electronProcess.on('close', () => {
          server.close()
          process.exit()
        })
      })
    }
  }
}

export let getReplacer = () => {
  let externalModels = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url", "better-sqlite3", "knex"];
  let result: Record<string, Function> = {};
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};