import React from 'react'
import { Row, Col, Button, Popover, Divider } from 'antd'
import RepoSelector from './RepoSelector'
import LoginModal from './LoginModal'
import style from '../assets/index.module.less'

interface Props {
  user: string | null
  whichUser: (e: string) => void
  repos: object[]
  whichRepo: (e: number) => void
}

interface State {
  loginOpen: boolean
}

class Navbar extends React.Component<Props, State> {
  state: State = {
    loginOpen: false
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
        <Button className={style.full_button} type="text">
          退 出
        </Button>
      </Row>
    </>
  )

  handleLoginOpen = (): void => {
    this.setState({ loginOpen: true })
  }

  handleLoginClose = (): void => {
    this.setState({ loginOpen: false })
  }

  render(): React.ReactNode {
    const { userPopover, handleLoginOpen, handleLoginClose } = this
    const { user, whichUser, whichRepo } = this.props
    const { loginOpen } = this.state
    return (
      <Row>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Button className={style.row_content} type="text">
            没用
          </Button>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          {/* <RepoSelector current={repo} whichRepo={whichRepo} /> */}
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
