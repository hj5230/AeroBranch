import React from 'react'
import Repository from '@interface/Repository'
import { Row, Col, Button, Popover, Divider, notification } from 'antd'
import RepoSelector from '@renderer/components/RepoSelector'
import LoginModal from '@renderer/components/LoginModal'
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
    const { addRepo, whichRepo } = this.props
    const { openDirDialog } = window.api
    const dir = await openDirDialog()
    if (!dir?.name) return
    // check if exists on cloud
    // if no update `repos`
    // Confusing logic, select Repo with id since allocated
    const newLocalRepo = {
      id: Date.now(),
      name: `新的本地仓库 "${dir.name}"`,
      fromAero: false,
      localPath: dir.base,
      files: dir
    }
    addRepo(newLocalRepo)
    whichRepo(newLocalRepo)
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
        <Button className={style.full_btn} type="text">
          设 置
        </Button>
      </Row>
      <Row>
        <Button className={style.full_btn} type="text">
          服务器
        </Button>
      </Row>
      <Row>
        <Button className={style.full_btn} type="text" onClick={this.handleSignOut}>
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
        <Col span={8} className={style.nav_col_l}>
          <Button className={style.nav_btn_l} type="text" onClick={handleSelectLocalDir}>
            本地目录
          </Button>
        </Col>
        <Col span={8} className={style.nav_col}>
          <RepoSelector repos={repos} current={currentRepo} whichRepo={whichRepo} />
        </Col>
        <Col span={8} className={style.nav_col_r}>
          <Popover content={userPopover}>
            <Button className={style.nav_btn_r} type="text" onClick={handleLoginOpen}>
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
