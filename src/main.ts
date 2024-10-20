import {
  app,
   BrowserWindow,
  // dialog,
  globalShortcut,
  Menu,
  powerMonitor,
  Tray,
} from "electron";
import * as path from "path";

let appTray;
let mainWindow: BrowserWindow;
const trayMenu = Menu.buildFromTemplate([
  { label: "item1" },
  { label: "item2" }
]);


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
    title: 'First Test App',
    backgroundColor: "#fcba03",
    // opacity: 0.5,
    // alwaysOnTop: true,
    // show: false,
    // resizable:false, //drag and drop resizable
    // movable:false,
    // fullscreen: true, //we can set fullscreeen for app ^_____^
    // frame: false,//frameless =>create a windows without tab remove frame =>splash screen ^_____^
    // transparent: true,
  });
  CreateAppTray()

  // mainWindow.loadFile(path.join(__dirname, "../index.html"));
  // const childWindow = new BrowserWindow({
  //   show: false,
  //   frame: false,
  //   transparent: true,
  //   backgroundColor: 'rgba(255, 255, 255, 0)',
  //   webPreferences: {
  //     nodeIntegration: false,
  //     contextIsolation: true,
  //   },
  // });
  // childWindow.setBounds(mainWindow.getBounds());
  // Show the locked overlay
  // childWindow.show();

  // Load a blank page in the child window
  // childWindow.loadURL('about:blank');

  // Open the DevTools for debugging
  mainWindow.webContents.openDevTools();
  // const child = new BrowserWindow({
  //   width: 150,
  //   height: 150,
  //   parent: mainWindow,
  //   modal: true,
  //   show: false,
  // });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  // mainWindow.loadURL('https://www.digikala.com/'); //we can use url a exist website ^_____^

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.show();
  // child.show(); //create a child tab and open after parent

  // mainWindow.on('ready-to-show',function(){
  //   mainWindow.show()
  //   child.show()
  // })
  globalShortcut.register('CommandOrControl+F', () => {
    console.log('user press F');
    globalShortcut.unregister('CommandOrControl+F')
  })
  // globalShortcut.register('CommandOrControl+F', () => {
  //   console.log('user press F');

  // })
  // mainWindow.webContents.on("did-finish-load", () => {
  // dialog.showOpenDialog(mainWindow,{
  //   title:"select new item",
  //   buttonLabel:"select item",
  //   defaultPath:app.getPath('desktop'),
  //   properties:["createDirectory","promptToCreate"]
  // }).then((res)=>{
  //   console.log(res.filePaths ,"res") ;
  // })
  //     dialog.showMessageBox({
  //       title:"title of message box",
  //       message:"this is message of messageBox",
  //       detail:"this is detail of messageBox",
  //       buttons:['yes','no','cancel']
  //     }).then((res)=>{
  //       console.log(res.response ,"res");

  //     })
  //     });


}
function CreateAppTray() {
  const imagePath: string = path.join('assets', 'tray-icon.png')
  appTray = new Tray(imagePath)
  appTray.setToolTip('my application')
  appTray.setContextMenu(trayMenu)
  appTray.on('click', function (e) {
    if (e.shiftKey) {
      app.quit()
    }
    else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()

    }
  })
}
powerMonitor.on('suspend', function (e: any) {
  console.log(e, 'This is a Suspend event');

  powerMonitor.on('resume', function () {
    if (mainWindow == null) {
      createWindow()
    }
  })
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

