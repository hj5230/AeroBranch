import TreeNode from './TreeNode'

interface Repository {
  id: number
  name: string
  fromAero: boolean
  description?: string
  localPath?: string
  files?: TreeNode
}

export default Repository
