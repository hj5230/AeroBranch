import * as path from 'path'
import * as fs from 'fs'
import TreeNode, { File, Directory } from '../renderer/src/interfaces/TreeNode'

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

// const createOrReplaceAero = (dirPath: string): void => {}
// const createOrReplaceConfig = (dirPath: string): void => {}
// const filesToChunks = (dirPath: string): void => {}
// const compareDifference = (dirPath: string): void => {}
// const syncChanges = (dirPath: string): void => {}

export default getDirTree
