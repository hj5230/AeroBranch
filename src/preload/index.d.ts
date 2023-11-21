import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getMacAddress: () => Promise<string>
      getEnvServer: () => Promise<string>
      openDirDialog: () => Promise<string>
    }
  }
}
