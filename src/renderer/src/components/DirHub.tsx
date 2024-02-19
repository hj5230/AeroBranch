import React, { Key } from 'react'
import { Row, Spin, Tree, Input } from 'antd'
import Repository from '@renderer/interfaces/Repository'
import Panel from './Panel'
import style from '@renderer/assets/index.module.less'
import TreeNode from '@renderer/interfaces/TreeNode'
import AntTreeNode, { isDirectory, isFile } from '@renderer/interfaces/AntTreeNode'
import type { DataNode } from 'antd/es/tree'

const { DirectoryTree } = Tree

interface Props {
  windowWidth: number
  windowHeight: number
  repos: Repository[]
  currentRepo: Repository | null
  whichFile: (e: number) => void
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
    // fetch()
    //   .then(pms => pms.json())
    //   .then(jsn => ...)
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
    const { currentRepo } = this.props
    if (currentRepo?.files) {
      console.log(currentRepo.files)
      const treeData = this.convertToAntDirectoryTree(currentRepo.files)
      console.log(treeData)
      this.setState({ treeData: [treeData] })
    }
  }

  convertToAntDirectoryTree = (node: TreeNode, parentKey: string = ''): AntTreeNode => {
    const { convertToAntDirectoryTree } = this
    const baseKey = parentKey ? `${parentKey}-${node.name}` : node.name
    const treeNode: AntTreeNode = {
      title: node.name,
      key: baseKey
      // icon: <CarryOutOutlined />,
    }
    if (isDirectory(node)) {
      treeNode.children = node.children.map((childNode, index) =>
        convertToAntDirectoryTree(childNode, `${baseKey}-${index}`)
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

  render(): React.ReactNode {
    const { handleInputChange, handleExpand } = this
    const { windowHeight } = this.props
    const { treeData, search, autoExpandParent, expandedKeys } = this.state
    return (
      <>
        <Panel>
          {treeData ? (
            <>
              <Row className={style.row_content}>
                <Input
                  value={search}
                  size="small"
                  placeholder="搜索文件"
                  onChange={handleInputChange}
                />
              </Row>
              <Row className={style.row_content} style={{ height: windowHeight - 170 }}>
                <DirectoryTree
                  multiple
                  showLine
                  treeData={treeData}
                  onExpand={handleExpand}
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
