// import os from 'os'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
// import crypto, { generateKey } from 'crypto'
import TreeNode, { File, Directory } from '../shared/interface/TreeNode'
import FileContent from '../shared/interface/FileContent'
import DotaeroConfig from '../shared/interface/DotaeroConfig'

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
  if (stats.isDirectory() && path.basename(dirPath) !== '.aero') {
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

const readConfigData = (dirPath: string): DotaeroConfig => {
  const configPath = path.join(dirPath, '.aero/config.yaml')
  if (fs.existsSync(configPath))
    return yaml.load(fs.readFileSync(configPath, 'utf-8')) as DotaeroConfig
  return {
    userId: -1,
    macAddress: '',
    hashedPass: '',
    createTime: -1,
    lastModified: -1,
    structure: {
      name: 'undefined',
      size: -1,
      createTime: new Date(),
      modifyTime: new Date()
    }
  }
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
  // console.log(config)
  fs.writeFileSync(configPath, yaml.dump(config))
}

// const encryptAndChunk = (dirPath: string, chunkSize: number = 5 * 1024 * 1024): void => {
//   const fileBuffer = fs.readFileSync(filePath)
//   const key = crypto.scryptSync(encryptionKey, 'salt', 32)
//   const iv = crypto.randomBytes(16)
// }

// const compareDifference = (dirPath: string): void => {}
// const syncChanges = (dirPath: string): void => {}

export { getMacAddress, getDirTree, getDirContent, readConfigData, dotaeroOrInit }
