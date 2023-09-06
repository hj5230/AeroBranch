import React from 'react'
import { Card, Spin, Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'

const { DirectoryTree } = Tree

interface Props {
  repo: number | undefined
}

interface State {
  treeData: DataNode[] | undefined
}

class TreeBar extends React.Component<Props, State> {
  state: State = {
    treeData: undefined
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

  render(): React.ReactNode {
    const { treeData } = this.state
    return (
      <>
        <Card>
          {treeData ? (
            <>
              <DirectoryTree multiple defaultExpandAll showLine treeData={treeData} />
            </>
          ) : (
            <>
              <Spin />
            </>
          )}
        </Card>
      </>
    )
  }
}

export default TreeBar
