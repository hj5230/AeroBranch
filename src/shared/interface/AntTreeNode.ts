import { ReactNode } from 'react'
import TreeNode, { Directory, File } from './TreeNode'

interface AntTreeNode {
  title: ReactNode
  key: string
  icon?: ReactNode
  children?: AntTreeNode[]
  isLeaf?: boolean
}

function isDirectory(node: TreeNode): node is Directory {
  return 'children' in node
}

function isFile(node: TreeNode): node is File {
  return 'relative' in node
}

export default AntTreeNode
export { isDirectory, isFile }
