import { ElectronAPI } from '@electron-toolkit/preload'
import FileContent from '@renderer/interfaces/FileContent'
import TreeNode from '@renderer/interfaces/TreeNode'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getMacAddress: () => Promise<string>
      openDirDialog: () => Promise<TreeNode | null>
      getDirectoryContent: (filePath: string) => Promise<FileContent>
      readConfigData: (dirPath: string) => Promise<DotaeroConfig>
      dotaeroOrInit: (dirPath: string, configData: DotaeroConfig) => Promise<void>
      // syncRepository: (dirPath: string) => Promise<object>
    }
  }
}
