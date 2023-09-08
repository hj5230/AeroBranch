import React from 'react'
import { Row, Button, Drawer, Spin, Popover } from 'antd'
import style from '../assets/index.module.less'

type RepoData = {
  key: number
  title: string
  description: string
}

type Repository = {
  timeStamp: number
  repos: RepoData[]
}

interface Props {
  current?: number | null
  whichRepo: (e: number) => void
}

interface State {
  drawerOpen: boolean
  repos: Repository | null
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
      repos: {
        timeStamp: 1693933379,
        repos: [
          {
            key: 230906011801,
            title: 'The First AeroBranch Instance',
            description: 'this is the first repo'
          },
          {
            key: 230906011802,
            title: 'Another Branch Demo',
            description: 'another repo as demo'
          }
        ]
      }
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
        <Button
          className={`${style.row_content} ${style.full_button}`}
          shape="round"
          onClick={onDrawerOpen}
        >
          {current ? current : '选择文件仓库'}
        </Button>
        <Drawer placement="top" closable={false} open={drawerOpen} onClose={onDrawerClose}>
          {repos ? (
            repos['repos'].map((repo, index) => (
              <Row className={style.row_content} key={index}>
                <Popover content={repo.description} placement="bottom" trigger="hover">
                  <Button
                    className={style.full_button}
                    shape="round"
                    value={repo.key}
                    onClick={onSelectRepo}
                  >
                    {repo.title}
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
