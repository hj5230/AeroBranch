import TreeNode from '@interface/TreeNode'

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
