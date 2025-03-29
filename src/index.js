const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

let mainWindow;
let setTimerWindow;
let timerWindow;
let endWindow;



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  if (mainWindow) return;
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 450,
    height: 500,
    frame: false,
    webPreferences: {

      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();


  mainWindow.on("closed", () => {
    mainWindow = null; // Clear reference when closed
  });

 
};

const createSetTimerWindow = () => {
  if (setTimerWindow) return;

  setTimerWindow = new BrowserWindow({
    width: 450,
    height: 500,
    frame: false,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  setTimerWindow.loadFile(path.join(__dirname, 'set_timer.html'));

  // Open the DevTools.
  //setTimerWindow.webContents.openDevTools();
  setTimerWindow.on("closed", () => {
    setTimerWindow = null; // Clear reference when closed
  });

};


const createTimerStartWindow = () => {
  if (timerWindow) return;
  timerWindow = new BrowserWindow({
    width: 450,
    height: 500,
    frame: false,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  timerWindow.loadFile(path.join(__dirname, 'timer_start.html'));

   // Open the DevTools.
  //timerWindow.webContents.openDevTools();
  timerWindow.on("closed", () => {
    timerWindow = null; // Clear reference when closed
  });
};

const createTimerEndWindow = () => {
  if (endWindow) return;
  endWindow = new BrowserWindow({
    width: 450,
    height: 500,
    frame: false,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  endWindow.loadFile(path.join(__dirname, 'timer_end.html'));

  //endWindow.webContents.openDevTools();
  endWindow.on("closed", () => {
    endWindow = null; // Clear reference when closed
  });
};






// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();



  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on("minimize-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win && !win.isDestroyed()) {
    win.minimize();
  }
});

ipcMain.on("close-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win && !win.isDestroyed()) {
    win.close();
  }
});




ipcMain.on('open-set-timer', () => createSetTimerWindow());
ipcMain.on('open-timer-start', () => createTimerStartWindow());
ipcMain.on('open-timer-end', () => createTimerEndWindow());

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
