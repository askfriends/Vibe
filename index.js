require('v8-compile-cache');
const { app, BrowserWindow } = require("electron");
const path = require("path");
const { getPluginEntry } = require("mpv.js");

// Absolute path to the plugin directory.
const pluginDir = path.join(
  path.dirname(require.resolve("mpv.js")),
  "build",
  "Release"
);
// See pitfalls section for details.
if (process.platform !== "linux") {
  process.chdir(pluginDir);
}
// Fix for latest Electron.
app.commandLine.appendSwitch("no-sandbox");
// To support a broader number of systems.
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch(
  "register-pepper-plugins",
  getPluginEntry(pluginDir)
);


function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1560,
    height: 720,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      //nodeIntegration: true,
      plugins: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  
  // and load the index.html of the app.
  win.loadURL("http://localhost:3000");
  require("./server/app.js");
  //if(isDev) win.loadURL("http://localhost:3000");
  //else
  //win.loadFile(`./build/index.html`);
  // if (isDev) {
  //   // Open the DevTools.
  //   //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
  //win.webContents.openDevTools();
  //
  // win.setMenuBarVisibility(false)
}

app.whenReady().then(createWindow);
