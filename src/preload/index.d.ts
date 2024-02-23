import { ElectronAPI } from '@electron-toolkit/preload'
import FileContent from '@renderer/interfaces/FileContent'
import TreeNode from '@renderer/interfaces/TreeNode'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getMacAddress: () => Promise<string>
      getEnvServer: () => Promise<string>
      openDirDialog: () => Promise<TreeNode | null>
      getDirectoryContent: (filePath: string) => Promise<FileContent>
    }
  }
}
