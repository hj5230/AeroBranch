import { ipcRenderer, contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import TreeNode from '../renderer/src/interfaces/TreeNode'
import FileContent from '../renderer/src/interfaces/FileContent'
import DotaeroConfig from '../renderer/src/interfaces/DotaeroConfig'

// Custom APIs for renderer
const api = {
  getMacAddress: async (): Promise<string> => {
    return await ipcRenderer.invoke('get-mac-address')
  },
  openDirDialog: async (): Promise<TreeNode | null> => {
    return await ipcRenderer.invoke('open-dir-dialog')
  },
  getDirectoryContent: async (filePath: string): Promise<FileContent> => {
    return await ipcRenderer.invoke('get-directory-content', filePath)
  },
  readConfigData: async (dirPath: string): Promise<DotaeroConfig> => {
    return await ipcRenderer.invoke('read-config-data', dirPath)
  },
  dotaeroOrInit: async (dirPath: string, configData: DotaeroConfig): Promise<void> => {
    return await ipcRenderer.invoke('dotaero-or-init', dirPath, configData)
  }
  // syncRepository: async (dirPath: string): Promise<object> => {
  //   return await ipcRenderer.invoke('sync-repository-changes', dirPath)
  // }
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
