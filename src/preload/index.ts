import { ipcRenderer, contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getMacAddress: async (): Promise<string> => {
    return await ipcRenderer.invoke('get-mac-address')
  },
  getEnvServer: async (): Promise<string> => {
    return await ipcRenderer.invoke('get-env-server')
  },
  openDirDialog: async (): Promise<object> => {
    return await ipcRenderer.invoke('open-dir-dialog')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
