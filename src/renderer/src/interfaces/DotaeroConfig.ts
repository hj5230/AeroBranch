import TreeNode from '@renderer/interfaces/TreeNode'

interface DotaeroConfig {
  userId: number
  macAddress: string
  hashedpass: string
  createTime: number
  lastModified: number
  description: string
  structure: TreeNode
}

export default DotaeroConfig
