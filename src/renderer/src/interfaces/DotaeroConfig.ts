import TreeNode from '@renderer/interfaces/TreeNode'

interface DotaeroConfig {
  userId: number
  macAddress: string
  hashedPass: string
  createTime: number
  lastModified: number
  description?: string
  structure: TreeNode
}

export default DotaeroConfig
