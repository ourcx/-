//plugins\buildPlugin.ts
import path from 'path'
import fs from 'fs'

class BuildObj {
  //编译主进程代码
  buildMain () {
    require('esbuild').buildSync({
      entryPoints: ['./src/main/mainEntry.ts'],
      bundle: true,
      platform: 'node',
      minify: true,
      outfile: './dist/mainEntry.js',
      external: ['electron']
    })
  }
  //为生产环境准备package.json
  preparePackageJson () {
    let pkgJsonPath = path.join(process.cwd(), 'package.json')
    let localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    let electronConfig = localPkgJson.devDependencies.electron.replace('^', '')
    localPkgJson.main = 'mainEntry.js'
    delete localPkgJson.scripts
    delete localPkgJson.devDependencies
    localPkgJson.devDependencies = { electron: electronConfig }
    let tarJsonPath = path.join(process.cwd(), 'dist', 'package.json')
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson))
    fs.mkdirSync(path.join(process.cwd(), 'dist/node_modules'))
  }
  //使用electron-builder制成安装包
  buildInstaller () {
    let options = {
      config: {
        directories: {
          output: path.join(process.cwd(), 'release'),
          app: path.join(process.cwd(), 'dist')
        },
        files: ['**'],
        extends: null,
        productName: 'JueJin',
        appId: 'com.juejin.desktop',
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'juejinDesktop'
        },
        publish: [{ provider: 'generic', url: 'http://localhost:5500/' }]
      },
      project: process.cwd()
    }
    return require('electron-builder').build(options)
  }
}

export let buildPlugin = () => {
  return {
    name: 'build-plugin',
    closeBundle: () => {
      let buildObj = new BuildObj()
      buildObj.buildMain()
      buildObj.preparePackageJson()
      buildObj.buildInstaller()
    }
  }
}

//Vite 编译完成之后，将在项目dist目录内会生成一系列的文件（如下图所示），此时closeBundle钩子被调用，我们在这个钩子中把上述生成的文件打包成一个应用程序安装包。
