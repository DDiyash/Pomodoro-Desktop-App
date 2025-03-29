// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

// Preload: Expose safe data to the renderer process
contextBridge.exposeInMainWorld("appPaths", {
    minimizeIcon: "assets/minimize.png",
    closeIcon: "assets/close.png"
});

contextBridge.exposeInMainWorld('electron',{
    send: (channel,data) => ipcRenderer.send(channel,data),
    receive: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
    minimize: () => ipcRenderer.send("minimize-window"),
    close: () => ipcRenderer.send("close-window"),
});



