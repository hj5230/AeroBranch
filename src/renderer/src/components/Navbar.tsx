import React from 'react'
import { Row, Col, Button, Popover, Divider, notification } from 'antd'
import RepoSelector from './RepoSelector'
import LoginModal from './LoginModal'
import Repository from '@renderer/interfaces/Repository'
import style from '@renderer/assets/index.module.less'

interface Props {
  user: string | null
  whichUser: (e: string | null) => void
  repos: Repository[]
  currentRepo: Repository | null
  whichRepo: (e: Repository | null) => void
  addRepo: (e: Repository) => void
}

interface State {
  loginOpen: boolean
}

class Navbar extends React.Component<Props, State> {
  state: State = {
    loginOpen: false
  }

  handleLoginOpen = (): void => {
    this.setState({ loginOpen: true })
  }

  handleLoginClose = (): void => {
    this.setState({ loginOpen: false })
  }

  handleSignOut = (): void => {
    const { openSignOutNote } = this
    const { whichUser } = this.props
    window.localStorage.removeItem('jwt')
    whichUser(null)
    openSignOutNote()
  }

  handleSelectLocalDir = async (): Promise<void> => {
    const { addRepo } = this.props
    const { openDirDialog } = window.api
    const dir = await openDirDialog()
    if (!dir?.name) return
    // check if exists on cloud
    // if no update `repos`
    addRepo({
      id: Date.now(),
      name: `新的本地仓库 "${dir.name}"`,
      fromAero: false,
      localPath: dir.base,
      files: dir
    })
  }

  openSignOutNote = (): void => {
    const { handleLoginOpen } = this
    notification.success({
      message: '退出成功',
      description: (
        <Button type="primary" size="small" onClick={handleLoginOpen}>
          重新登陆
        </Button>
      ),
      placement: 'bottom',
      duration: 3
    })
  }

  userPopover = (
    <>
      <Row>
        <Button className={style.full_button} type="text">
          设 置
        </Button>
      </Row>
      <Row>
        <Button className={style.full_button} type="text">
          服务器
        </Button>
      </Row>
      <Row>
        <Button className={style.full_button} type="text" onClick={this.handleSignOut}>
          退 出
        </Button>
      </Row>
    </>
  )

  render(): React.ReactNode {
    const { userPopover, handleLoginOpen, handleLoginClose, handleSelectLocalDir } = this
    const { user, whichUser, repos, currentRepo, whichRepo } = this.props
    const { loginOpen } = this.state
    return (
      <Row>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Button className={style.row_content} type="text" onClick={handleSelectLocalDir}>
            本地目录
          </Button>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <RepoSelector repos={repos} current={currentRepo} whichRepo={whichRepo} />
        </Col>
        <Col span={8} style={{ textAlign: 'end' }}>
          <Popover content={userPopover}>
            <Button className={style.row_content} type="link" onClick={handleLoginOpen}>
              {user ? user : '登 陆'}
            </Button>
          </Popover>
          <LoginModal onOpen={loginOpen} onClose={handleLoginClose} whichUser={whichUser} />
        </Col>
        <Divider className={style.nav_divider} />
      </Row>
    )
  }
}

export default Navbar
