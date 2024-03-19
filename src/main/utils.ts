// import os from 'os'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import TreeNode, { File, Directory } from '../renderer/src/interfaces/TreeNode'
import FileContent from '../renderer/src/interfaces/FileContent'
import DotaeroConfig from '../renderer/src/interfaces/DotaeroConfig'

const os = require('os')

const getMacAddress = (): string => {
  const networkInterfaces = os.networkInterfaces()
  let macAddress: string | undefined
  for (const interfaceKey in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceKey]
    if (networkInterface[0] && networkInterface[0].mac && !networkInterface[0].internal) {
      macAddress = networkInterface[0].mac
      break
    }
  }
  return macAddress || 'unknown'
}

const getDirTree = (dirPath: string, basePath: string = dirPath): TreeNode => {
  const stats = fs.statSync(dirPath)
  if (stats.isDirectory()) {
    const directory: Directory = {
      name: path.basename(dirPath),
      size: 0,
      base: dirPath,
      createTime: new Date(stats.birthtime),
      modifyTime: new Date(stats.mtime),
      children: []
    }
    fs.readdirSync(dirPath).forEach((file) => {
      const childNode = getDirTree(path.join(dirPath, file), basePath)
      directory.children!.push(childNode)
      directory.size += childNode.size
    })
    return directory
  } else {
    const file: File = {
      name: path.basename(dirPath),
      size: stats.size,
      createTime: new Date(stats.birthtime),
      modifyTime: new Date(stats.mtime),
      relative: path.relative(basePath, dirPath)
    }
    return file
  }
}

const getDirContent = (filePath: string): FileContent => {
  const ext = path.extname(filePath).toLowerCase()
  try {
    if (ext === '' || ext === '.txt' || ext === '.md') {
      // process text file (extnames undone)
      const content = fs.readFileSync(filePath, 'utf-8')
      return { type: 'text', content }
    } else if (
      ext === '.png' ||
      ext === '.jpg' ||
      ext === '.jpeg' ||
      ext === '.webp' ||
      ext === '.pdf'
    ) {
      // process binary file (extnames undone)
      const content = fs.readFileSync(filePath).toString('base64')
      return { type: 'binary', ext, content }
    } else {
      return { type: 'unsupported' }
    }
  } catch (error) {
    console.error('File read error:', error)
    throw error
  }
}

const readConfigData = (dirPath: string): DotaeroConfig | null => {
  const configPath = path.join(dirPath, '.aero/config.yaml')
  if (fs.existsSync(configPath))
    return yaml.load(fs.readFileSync(configPath, 'utf-8')) as DotaeroConfig
  return null
}

const dotaeroOrInit = (dirPath: string, configData: DotaeroConfig): void => {
  const aeroPath = path.join(dirPath, '.aero')
  if (!fs.existsSync(aeroPath)) {
    fs.mkdirSync(aeroPath, { recursive: true })
  }
  const configPath = path.join(aeroPath, 'config.yaml')
  let config: DotaeroConfig
  if (fs.existsSync(configPath)) {
    const existingConfig = yaml.load(fs.readFileSync(configPath, 'utf8')) as DotaeroConfig
    config = { ...existingConfig, ...configData } as DotaeroConfig
  } else {
    config = configData
  }
  fs.writeFileSync(configPath, yaml.dump(config))
}

// const filesToChunks = (dirPath: string): void => {}
// const compareDifference = (dirPath: string): void => {}
// const syncChanges = (dirPath: string): void => {}

export { getMacAddress, getDirTree, getDirContent, readConfigData, dotaeroOrInit }
