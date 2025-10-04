// src\main\mainEntry.ts
import { app, BrowserWindow } from "electron";
import { CustomScheme } from "./CustomScheme";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
//设置渲染进制开发者调试的警告不显示
let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  let config = {
    webPreferences: {
      nodeIntegration: true,
      // 允许加载不安全的资源，集成node到渲染进程里面去
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      // 允许使用webview标签
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: "undocked" });
 if (process.argv[2]) {
  mainWindow.loadURL(process.argv[2]);
} else {
  CustomScheme.registerScheme();
  mainWindow.loadURL(`app://index.html`);
}
});