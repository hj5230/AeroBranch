import React from 'react'
import Repository from '@interface/Repository'
import { Row, Button, Drawer, Spin, Popover } from 'antd'
import style from '../assets/index.module.less'

interface Props {
  current: Repository | null
  repos: Repository[]
  whichRepo: (e: Repository | null) => void
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

  onDrawerOpen = (): void => {
    this.setState({ drawerOpen: true })
  }

  onDrawerClose = (): void => {
    this.setState({ drawerOpen: false })
  }

  onSelectRepo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const { repos, whichRepo } = this.props
    const { value } = e.currentTarget
    const res = repos.filter((repo) => repo.id == parseInt(value))
    whichRepo(res[0])
  }

  render(): React.ReactNode {
    const { onDrawerOpen, onDrawerClose, onSelectRepo } = this
    const { current, repos } = this.props
    const { drawerOpen } = this.state
    return (
      <>
        <Popover content="当前仓库介绍" placement="bottom" trigger="hover">
          <Button className={style.select_repo_btn} shape="round" onClick={onDrawerOpen}>
            {current ? current.name : '选择文件仓库'}
          </Button>
        </Popover>
        <Drawer placement="top" closable={false} open={drawerOpen} onClose={onDrawerClose}>
          {repos ? (
            repos.map((repo, index) => (
              <Row className={style.row_content} key={index}>
                <Popover content={repo.description} placement="bottom" trigger="hover">
                  <Button
                    className={style.full_btn}
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
