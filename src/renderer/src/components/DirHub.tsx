import React, { Key } from 'react'
import { Row, Card, Spin, Tree, Input } from 'antd'
import type { DataNode } from 'antd/es/tree'
import style from '../assets/index.module.less'

const { DirectoryTree } = Tree

interface Props {
  repo: number | null
}

interface State {
  treeData: DataNode[] | undefined
  search: string
  expandedKeys: Key[] | undefined
  autoExpandParent: boolean
}

class DirHub extends React.Component<Props, State> {
  state: State = {
    treeData: undefined,
    search: '',
    expandedKeys: [],
    autoExpandParent: false
  }

  componentDidMount = (): void => {
    // fetch()
    //   .then(pms => pms.json())
    //   .then(jsn => ...)
    this.setState({
      treeData: [
        {
          title: 'parent 0',
          key: '0-0',
          children: [
            { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
            { title: 'leaf 0-1', key: '0-0-1', isLeaf: true }
          ]
        },
        {
          title: 'parent 1',
          key: '0-1',
          children: [
            { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
            { title: 'leaf 1-1', key: '0-1-1', isLeaf: true }
          ]
        }
      ]
    })
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

  searchInTreeData = (searchValue: string, tree: DataNode[]): Key[] => {
    let keys: Key[] = []
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.title?.toString().includes(searchValue)) {
        keys.push(node.key)
      }
      if (node.children) {
        keys = keys.concat(this.searchInTreeData(searchValue, node.children))
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
    const { treeData, search, autoExpandParent, expandedKeys } = this.state
    return (
      <>
        <Card>
          {treeData ? (
            <>
              <Row className={style.row_content}>
                <Input value={search} placeholder="搜索文件" onChange={handleInputChange} />
              </Row>
              <Row className={style.row_content}>
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
        </Card>
      </>
    )
  }
}

export default DirHub
