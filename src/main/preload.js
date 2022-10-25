import { contextBridge, ipcRenderer, webFrame } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {on: ipcRenderer.on.bind(this), invoke: ipcRenderer.invoke});
contextBridge.exposeInMainWorld('webFrame', {
    setZoomFactor: (value) => webFrame.setZoomFactor(value)
});