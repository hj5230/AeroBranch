interface TreeNode {
  name: string
  size: number
  createTime: Date
  modifyTime: Date
  base?: string
  children?: TreeNode[]
  relative?: string
}

interface Directory extends TreeNode {
  base?: string
  children: TreeNode[]
}

interface File extends TreeNode {
  relative: string
}

export default TreeNode
export type { File, Directory }
