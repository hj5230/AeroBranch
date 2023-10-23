import React from 'react'
import { Row, Button, Drawer, Spin, Popover } from 'antd'
import style from '../assets/index.module.less'
import Repository from '@renderer/interfaces/Repository'

// type RepoData = {
//   key: number
//   title: string
//   description: string
// }

// type Repository = {
//   timeStamp: number
//   repos: RepoData[]
// }

interface Props {
  current: number | null
  repos: Repository[]
  whichRepo: (e: number) => void
}

interface State {
  drawerOpen: boolean
  repos: Repository[] | null
}

class RepoSelector extends React.Component<Props, State> {
  state: State = {
    drawerOpen: false,
    repos: null
  }

  componentDidMount = (): void => {
    // fetch()
    //   .then(pms => pms.json())
    //   .then(jsn => ...)
    // 以下仅为展示，通常直接设置fetch结果
    this.setState({
      repos: [
        {
          id: 1693933379,
          name: 'Demo Repository',
          description: 'the first repo instance as demo'
        },
        {
          id: 1693936982,
          name: 'Another Demo Repo'
        }
      ]
    })
  }

  onDrawerOpen = (): void => {
    this.setState({ drawerOpen: true })
  }

  onDrawerClose = (): void => {
    this.setState({ drawerOpen: false })
  }

  onSelectRepo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const { whichRepo } = this.props
    const { value } = e.currentTarget
    whichRepo(parseInt(value))
  }

  render(): React.ReactNode {
    const { onDrawerOpen, onDrawerClose, onSelectRepo } = this
    const { current } = this.props
    const { drawerOpen, repos } = this.state
    return (
      <>
        <Button className={style.select_repo_btn} shape="round" onClick={onDrawerOpen}>
          {current ? current : '选择文件仓库'}
        </Button>
        <Drawer placement="top" closable={false} open={drawerOpen} onClose={onDrawerClose}>
          {repos ? (
            repos.map((repo, index) => (
              <Row className={style.row_content} key={index}>
                <Popover content={repo.description} placement="bottom" trigger="hover">
                  <Button
                    className={style.full_button}
                    shape="round"
                    value={repo.id}
                    onClick={onSelectRepo}
                  >
                    {repo.name}
                  </Button>
                </Popover>
              </Row>
            ))
          ) : (
            <Row>
              <Spin size="large" />
            </Row>
          )}
        </Drawer>
      </>
    )
  }
}

export default RepoSelector
