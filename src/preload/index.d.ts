import { ElectronAPI } from '@electron-toolkit/preload'
import TreeNode from '@renderer/interfaces/TreeNode'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getMacAddress: () => Promise<string>
      getEnvServer: () => Promise<string>
      openDirDialog: () => Promise<TreeNode | null>
    }
  }
}
