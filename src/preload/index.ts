import { ipcRenderer, contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import EnvSchema from '@interface/EnvInterface'
import TreeNode from '@interface/TreeNode'
import FileContent from '@interface/FileContent'
import { DotaeroConfig } from '@interface/Dotaero'

// Custom APIs for renderer
const api = {
  getEnvData: async (): Promise<EnvSchema> => {
    return await ipcRenderer.invoke('get-env-data')
  },
  getMacAddress: async (): Promise<string> => {
    return await ipcRenderer.invoke('get-mac-address')
  },
  openDirDialog: async (): Promise<TreeNode | null> => {
    return await ipcRenderer.invoke('open-dir-dialog')
  },
  getDirContent: async (filePath: string): Promise<FileContent> => {
    return await ipcRenderer.invoke('get-dir-content', filePath)
  },
  readConfigData: async (dirPath: string): Promise<DotaeroConfig> => {
    return await ipcRenderer.invoke('read-config-data', dirPath)
  },
  dotaeroOrInit: async (dirPath: string, configData: DotaeroConfig): Promise<void> => {
    return await ipcRenderer.invoke('dotaero-or-init', dirPath, configData)
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
