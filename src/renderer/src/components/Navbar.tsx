import React from 'react'
import { Row, Col, Button, Popover, Divider } from 'antd'
import RepoSelector from './RepoSelector'
import style from '../assets/index.module.less'

interface Props {
  whichRepo: (e: number) => void
}

interface State {
  repo: number | null
}

class Navbar extends React.Component<Props, State> {
  state: State = {
    repo: null
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

  render(): React.ReactNode {
    const { userPopover } = this
    const { whichRepo } = this.props
    const { repo } = this.state
    return (
      <Row>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Button className={style.row_content} type="text">
            没用
          </Button>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <RepoSelector current={repo} whichRepo={whichRepo} />
        </Col>
        <Col span={8} style={{ textAlign: 'end' }}>
          <Popover className={style.row_content} content={userPopover}>
            <Button type="link">未登录</Button>
          </Popover>
        </Col>
        <Divider className={style.nav_divider} />
      </Row>
    )
  }
}

export default Navbar
