interface TreeNode {
  name: string
  size: number
  createTime: Date
  modifyTime: Date
  children?: TreeNode[]
  relative?: string
}

interface Directory extends TreeNode {
  children: TreeNode[]
}

interface File extends TreeNode {
  relative: string
}

export default TreeNode
export type { File, Directory }
