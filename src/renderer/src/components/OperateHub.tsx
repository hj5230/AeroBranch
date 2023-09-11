import React from 'react'
import Panel from './Panel'
import Terminal from './Terminal'
import { Button, Row, Col, Popover } from 'antd'
import {
  FullscreenOutlined,
  BranchesOutlined,
  CodeOutlined,
  SettingOutlined
} from '@ant-design/icons'
// import style from '../assets/index.module.less'

interface Props {
  windowWidth: number
  windowHeight: number
}

class OperateHub extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { windowWidth, windowHeight } = this.props
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
              <Popover
                content={<Terminal windowWidth={windowWidth} windowHeight={windowHeight} />}
                placement="bottom"
                trigger="click"
              >
                <Button size="small">
                  <CodeOutlined />
                </Button>
              </Popover>
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
