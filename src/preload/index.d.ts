import { ElectronAPI } from '@electron-toolkit/preload'
import EnvSchema from '@interface/EnvInterface'
import FileContent from '@interface/FileContent'
import TreeNode from '@interface/TreeNode'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getEnvData: () => Promise<EnvSchema>
      getMacAddress: () => Promise<string>
      openDirDialog: () => Promise<TreeNode | null>
      getDirContent: (filePath: string) => Promise<FileContent>
      readConfigData: (dirPath: string) => Promise<DotaeroConfig>
      dotaeroOrInit: (dirPath: string, configData: DotaeroConfig) => Promise<void>
    }
  }
}
