import { app, BrowserWindow, dialog } from "electron";
import * as path from "path";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
    title: 'First Test App',
    backgroundColor: "#fcba03",
    opacity: 0.5,
    alwaysOnTop: true,
    // show: false,
    // resizable:false, //drag and drop resizable
    // movable:false,
    fullscreen: true, //we can set fullscreeen for app ^_____^
    frame: false,//frameless =>create a windows without tab remove frame =>splash screen ^_____^
    // transparent: true,
  });


  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  const childWindow = new BrowserWindow({
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  childWindow.setBounds(mainWindow.getBounds());
  // Show the locked overlay
  childWindow.show();

  // Load a blank page in the child window
  childWindow.loadURL('about:blank');

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

  mainWindow.webContents.on("did-finish-load", () => {
    dialog.showOpenDialog(mainWindow,{
      buttonLabel:"select item",
      defaultPath:app.getPath('desktop')
    })
    });
    

}

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

