import React from 'react'
import { Row, Col, Button, Popover, Divider } from 'antd'
import RepoSelector from './RepoSelector'
import style from '../assets/index.module.less'

interface Props {
  whichRepo: (e: number) => void
}

interface State {
  repo: number | undefined
}

class Navbar extends React.Component<Props, State> {
  state: State = {
    repo: undefined
  }

  userPopover = (
    <>
      <Row>
        <Button type="text">阿?</Button>
      </Row>
      <Row>
        <Button type="text">我的仓库</Button>
      </Row>
      <Row>
        <Button type="text">登陆</Button>
      </Row>
    </>
  )

  render(): React.ReactNode {
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
          <Popover className={style.row_content} content={this.userPopover}>
            <Button type="link">Username</Button>
          </Popover>
        </Col>
        <Divider className={style.nav_divider} />
      </Row>
    )
  }
}

export default Navbar
