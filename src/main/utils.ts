/**
 * Utility functions for the main process
 *
 * Dependencies:
 * - `fs`: Node.js File System module for file I/O operations.
 * - `path`: Node.js Path module for handling and transforming file paths.
 * - `js-yaml`: A library for YAML parsing and dumping.
 * - `@interface/TreeNode`: Custom interfaces for representing file and directory structures.
 * - `@interface/FileContent`: Interface for file content representation.
 * - `@interface/DotaeroConfig`: Interface for Dotaero configuration objects.
 *
 * Be awared that great amount of annotations within this file are generated by AI,
 * There is no gurantee that they are always correct, verify when necessary.
 */

import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
// import * as sodium from 'libsodium-wrappers'
// import { encode, decode } from '@msgpack/msgpack'
// import { deflate, inflate } from 'pako'
import TreeNode, { File, Directory } from '@interface/TreeNode'
import FileContent from '@interface/FileContent'
import { DotaeroConfig } from '@interface/Dotaero'

// await sodium.ready

// async function serializeData<T>(data: T): Promise<Uint8Array> {
//   return encode(data)
// }

// async function deserializeData(data: Uint8Array): Promise<unknown> {
//   return decode(data)
// }

// function compressData(data: Uint8Array): Uint8Array {
//   return deflate(data)
// }

// function decompressData(data: Uint8Array): Uint8Array {
//   return inflate(data)
// }

// function encryptData(data: Uint8Array, key: Uint8Array): Uint8Array {
//   const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
//   const encrypted = sodium.crypto_secretbox_easy(data, nonce, key)
//   return new Uint8Array([...nonce, ...encrypted])
// }

// function decryptData(data: Uint8Array, key: Uint8Array): Uint8Array {
//   const nonce = data.slice(0, sodium.crypto_secretbox_NONCEBYTES)
//   const encrypted = data.slice(sodium.crypto_secretbox_NONCEBYTES)
//   return sodium.crypto_secretbox_open_easy(encrypted, nonce, key)
// }

/**
 * Retrieves the MAC address of the device for verification purposes.
 * @returns {string} The MAC address of the first non-internal network interface, or 'unknown' if none is found.
 */
const getMacAddress = (): string => {
  const networkInterfaces = os.networkInterfaces()
  let macAddress: string | undefined
  for (const interfaceKey in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceKey]
    if (
      networkInterface &&
      networkInterface[0] &&
      networkInterface[0].mac &&
      !networkInterface[0].internal
    ) {
      macAddress = networkInterface[0].mac
      break
    }
  }
  return macAddress || 'unknown'
}

/**
 * Recursively generates a tree structure representing the directory and its contents.
 * @param {string} dirPath - The path to the directory to traverse.
 * @param {string} [basePath=dirPath] - The base path used to calculate the relative path of files. Defaults to `dirPath`.
 * @returns {TreeNode} A tree node representing the directory or file. Directories include child nodes for their contents.
 */
const getDirTree = (dirPath: string, basePath: string = dirPath): TreeNode => {
  const stats = fs.statSync(dirPath)
  if (stats.isDirectory() && path.basename(dirPath) !== '.aero') {
    const directory: Directory = {
      name: path.basename(dirPath),
      size: -1,
      base: dirPath,
      createTime: stats.birthtime.getTime(),
      modifyTime: stats.mtime.getTime(),
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
      createTime: stats.birthtime.getTime(),
      modifyTime: stats.mtime.getTime(),
      relative: path.relative(basePath, dirPath)
    }
    return file
  }
}

/**
 * Reads the content of a file and returns it in a structured format based on the file type.
 * @param {string} filePath - The path to the file to be read.
 * @returns {FileContent} An object containing the file's content and its type ('text', 'binary', or 'unsupported').
 */
const getFileContent = (filePath: string): FileContent => {
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

/**
 * Reads and parses the Dotaero configuration file from a specified directory.
 * @param {string} dirPath - The path to the directory containing the `.aero/config` file.
 * @returns {DotaeroConfig} The parsed configuration object or a default configuration if the file is not found.
 */
const readConfigData = (dirPath: string): DotaeroConfig => {
  const configPath = path.join(dirPath, '.aero/config')
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
      createTime: -1,
      modifyTime: -1
    }
  }
}

/**
 * Initializes or updates the Dotaero configuration in a specified directory.
 * @param {string} dirPath - The path to the directory where the `.aero` folder will be located or is located.
 * @param {DotaeroConfig} configData - The configuration data to initialize or update the `config` file with.
 */
const dotaeroOrInit = (dirPath: string, configData: DotaeroConfig): void => {
  const aeroPath = path.join(dirPath, '.aero')
  if (!fs.existsSync(aeroPath)) {
    fs.mkdirSync(aeroPath, { recursive: true })
  }
  const configPath = path.join(aeroPath, 'config')
  let config: DotaeroConfig
  if (fs.existsSync(configPath)) {
    const existingConfig = yaml.load(fs.readFileSync(configPath, 'utf8')) as DotaeroConfig
    config = { ...existingConfig, ...configData } as DotaeroConfig
  } else {
    config = configData
  }
  fs.writeFileSync(configPath, yaml.dump(config))
}

/**
 * Retrieves a file list (excluding '.aero') from a specified path.
 * @param {string} dirPath - The path to the directory to scan.
 * @returns {File[]} An array of `File` objects representing each directory found, excluding '.aero'.
 */
function getFiles(dirPath: string): File[] {
  const files: File[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === '.aero') continue
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      files.push({
        name: entry.name,
        size: -1,
        createTime: -1,
        modifyTime: -1,
        relative: fullPath
      })
    }
  }
  return files
}

// async function rollupRepo(dirPath: string, key: string): Promise<void> {
//   const queue = getFiles(dirPath)
//   for (const file of queue) {
//     // record the queue order into config
//     // concat the file content into a single Uint8Array
//     // when load repo to local, tear-up the roll with order, file size, and tree in config
//   }
// }

// async function scanAndProcessDirectory(dirPath: string, key: Uint8Array): Promise<void> {
//   const baseDir: Directory = {
//     name: path.basename(dirPath),
//     size: -1,
//     createTime: new Date(),
//     modifyTime: new Date(),
//     base: dirPath,
//     children: []
//   }

//   const queue: { path: string; node: Directory }[] = [{ path: dirPath, node: baseDir }]
//   const processedData: { path: string; data: Uint8Array }[] = []

//   while (queue.length > 0) {
//     const { path: currentPath, node: currentNode } = queue.shift()!
//     const entries = fs.readdir(currentPath, { withFileTypes: true })

//     for (const entry of entries) {
//       if (entry.name === '.aero') continue

//       const fullPath = path.join(currentPath, entry.name)
//       const stats = fs.stat(fullPath)

//       if (entry.isDirectory()) {
//         const dirNode: Directory = {
//           name: entry.name,
//           size: -1,
//           createTime: stats.birthtime,
//           modifyTime: stats.mtime,
//           base: fullPath,
//           children: []
//         }
//         currentNode.children.push(dirNode)
//         queue.push({ path: fullPath, node: dirNode })
//       } else {
//         const fileContent = fs.readFile(fullPath)
//         const compressedContent = compressData(fileContent)
//         const encryptedContent = encryptData(compressedContent, key)

//         const fileNode: File = {
//           name: entry.name,
//           size: stats.size,
//           createTime: stats.birthtime,
//           modifyTime: stats.mtime,
//           relative: path.relative(dirPath, fullPath)
//         }
//         currentNode.children.push(fileNode)
//         currentNode.size += stats.size

//         processedData.push({ path: fullPath, data: encryptedContent })
//       }
//     }
//   }

//   // 更新目录大小
//   updateDirectorySize(baseDir)

//   // 序列化并加密整个树结构
//   const serializedTree = await serializeData(baseDir)
//   const compressedTree = compressData(serializedTree)
//   const encryptedTree = encryptData(compressedTree, key)

//   // 保存处理后的数据到 .aero 目录
//   await saveToAero(dirPath, encryptedTree, processedData)
// }

export { getMacAddress, getDirTree, getFileContent, readConfigData, dotaeroOrInit, getFiles }
