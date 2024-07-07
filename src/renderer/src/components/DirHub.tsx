import React, { Key } from 'react'
import { Row, Spin, Tree, Input } from 'antd'
import type { DataNode } from 'antd/es/tree'
import AntTreeNode, { isDirectory, isFile } from '@interface/AntTreeNode'
import type { NodeInfo } from '@interface/AntdInterfaces'
import Repository from '@interface/Repository'
import TreeNode from '@interface/TreeNode'
import FileContent from '@interface/FileContent'
import Panel from '@renderer/components/Panel'
import Separator from '@renderer/components/Separator'
import style from '@renderer/assets/index.module.less'

const { DirectoryTree } = Tree

interface Props {
  repos: Repository[]
  currentRepo: Repository | null
  whichFile: (e: number | FileContent) => void
}

interface State {
  treeData: AntTreeNode[] | null
  search: string
  expandedKeys: Key[] | undefined
  autoExpandParent: boolean
}

class DirHub extends React.Component<Props, State> {
  state: State = {
    treeData: null,
    search: '',
    expandedKeys: [],
    autoExpandParent: false
  }

  componentDidMount = (): void => {
    const { updateDirTree } = this
    this.setState({
      treeData: []
    })
    updateDirTree()
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { updateDirTree } = this
    const { currentRepo } = this.props
    if (prevProps.currentRepo != currentRepo) updateDirTree()
  }

  updateDirTree = (): void => {
    const { convertToAntDirTree } = this
    const { currentRepo } = this.props
    if (currentRepo?.files) {
      const treeData = convertToAntDirTree(currentRepo.files)
      this.setState({ treeData: [treeData] })
    }
  }

  convertToAntDirTree = (node: TreeNode, parentKey: string = ''): AntTreeNode => {
    const { convertToAntDirTree } = this
    const baseKey = parentKey ? `${parentKey}-${node.name}` : node.name
    const treeNode: AntTreeNode = {
      title: node.name,
      key: baseKey
    }
    if (isDirectory(node)) {
      treeNode.children = node.children.map((childNode, index) =>
        convertToAntDirTree(childNode, `${baseKey}-${index}`)
      )
    } else if (isFile(node)) {
      treeNode.isLeaf = true
    }
    return treeNode
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    this.setState(
      {
        search: value
      },
      () => {
        if (value === '') {
          this.setState({
            expandedKeys: [],
            autoExpandParent: false
          })
        } else {
          const expandedKeys = this.searchInTreeData(value, this.state.treeData || [])
          this.setState({ expandedKeys, autoExpandParent: true })
        }
      }
    )
  }

  searchInTreeData = (searchVal: string, tree: DataNode[]): Key[] => {
    let keys: Key[] = []
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.title?.toString().includes(searchVal)) {
        keys.push(node.key)
      }
      if (node.children) {
        keys = keys.concat(this.searchInTreeData(searchVal, node.children))
      }
    }
    return keys
  }

  handleExpand = (expandedKeys: Key[]): void => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  findFilePath = (fileName: string, node: TreeNode, basePath: string): string => {
    const { findFilePath } = this
    if (node.relative && node.name === fileName) {
      return `${basePath}/${node.relative}`
    }
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const filePath = findFilePath(fileName, child, basePath)
        if (filePath) {
          return filePath
        }
      }
    }
    return ''
  }

  handleSelectFile = async (_: Key[], info: NodeInfo): Promise<void> => {
    const { findFilePath } = this
    const { currentRepo, whichFile } = this.props
    const { getDirContent } = window.api
    // only accept leafs(files), and only when title is pure string
    if (
      !info.node.isLeaf ||
      typeof info.node.title !== 'string' ||
      !currentRepo?.files ||
      !currentRepo?.localPath
    )
      return
    const filePath = findFilePath(info.node.title, currentRepo?.files, currentRepo?.localPath)
    const fileContent = await getDirContent(filePath)
    whichFile(fileContent)
  }

  render(): React.ReactNode {
    const { handleInputChange, handleExpand, handleSelectFile } = this
    const { treeData, search, autoExpandParent, expandedKeys } = this.state
    return (
      <>
        <Panel>
          {treeData ? (
            <>
              <Row>
                <Input
                  className={style.search_input}
                  value={search}
                  size="small"
                  placeholder="搜索文件"
                  onChange={handleInputChange}
                />
              </Row>
              <Separator />
              <Row>
                <DirectoryTree
                  multiple
                  showLine
                  treeData={treeData}
                  onExpand={handleExpand}
                  onSelect={handleSelectFile}
                  autoExpandParent={autoExpandParent}
                  expandedKeys={expandedKeys}
                />
              </Row>
            </>
          ) : (
            <Spin />
          )}
        </Panel>
      </>
    )
  }
}

export default DirHub
