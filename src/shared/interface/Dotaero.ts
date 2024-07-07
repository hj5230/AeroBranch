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

interface DotaeroTree {
  name: string
  size: number
  createTime: number
  modifyTime: number
  children: DotaeroTree[]
  md5?: string
}

export type { DotaeroConfig, DotaeroTree }
