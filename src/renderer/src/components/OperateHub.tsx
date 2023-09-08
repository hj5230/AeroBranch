import React from 'react'
import Panel from './Panel'
import { Button, Row, Col } from 'antd'
import {
  FullscreenOutlined,
  BranchesOutlined,
  CodeOutlined,
  SettingOutlined
} from '@ant-design/icons'
// import style from '../assets/index.module.less'

class OperateHub extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Panel>
          <Row>
            <Col>
              <Button size="small">
                <FullscreenOutlined />
              </Button>
            </Col>
            <Col>
              <Button size="small">
                <BranchesOutlined />
              </Button>
            </Col>
            <Col>
              <Button size="small">
                <CodeOutlined />
              </Button>
            </Col>
            <Col>
              <Button size="small">
                <SettingOutlined />
              </Button>
            </Col>
          </Row>
        </Panel>
      </>
    )
  }
}

export default OperateHub