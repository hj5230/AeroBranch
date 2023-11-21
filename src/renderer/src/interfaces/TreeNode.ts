interface File {
  name: string
  size: number
  createTime: Date
  modifyTime: Date
  relative: string
}

interface Directory {
  name: string
  size: number
  createTime: Date
  modifyTime: Date
  children: TreeNode[]
}

type TreeNode = File | Directory

export default TreeNode
export type { File, Directory }
