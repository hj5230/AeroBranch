import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.webp?asset'
import dotenv from 'dotenv'
import { join, resolve } from 'path'
import { getMacAddress, getDirTree, getDirContent } from './utils'
import TreeNode from '../renderer/src/interfaces/TreeNode'
import FileContent from '../renderer/src/interfaces/FileContent'

dotenv.config({
  path: resolve(__dirname, '../../.env'),
  encoding: 'utf8',
  debug: false
}).parsed

ipcMain.handle('get-mac-address', async (): Promise<string> => {
  return getMacAddress()
})

ipcMain.handle('get-env-server', async (): Promise<string> => {
  return process.env.SERVER || 'localhost:3000'
})

ipcMain.handle('open-dir-dialog', async (): Promise<TreeNode | null> => {
  const res = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (res.canceled) return null
  else return getDirTree(res.filePaths[0])
})

ipcMain.handle('get-directory-content', async (_, filePath: string): Promise<FileContent> => {
  return getDirContent(filePath)
})

// Apart from this, channel for each step within is needed for manual operations via cli
// ipcMain.handle('sync-repository-changes', async (_, dirPath: string): Promise<object> => {})

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
