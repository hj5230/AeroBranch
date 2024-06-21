import React from 'react'
import Panel from './Panel'
import Terminal from './Terminal'
import { Button, Row, Col, Popover } from 'antd'
import {
  FolderAddOutlined,
  BranchesOutlined,
  CodeOutlined,
  SettingOutlined
} from '@ant-design/icons'
import Repository from '@interface/Repository'
// import DotaeroConfig from '@interface/DotaeroConfig'

interface Props {
  windowWidth: number
  windowHeight: number
  currentRepo: Repository | null
}

class OperateHub extends React.Component<Props, object> {
  initRepo = (): void => {
    const { currentRepo } = this.props
    const { dotaeroOrInit } = window.api
    if (currentRepo && currentRepo.localPath) {
      console.log(currentRepo)
      dotaeroOrInit(currentRepo.localPath, {
        userId: -1,
        macAddress: '',
        hashedPass: '',
        createTime: -1,
        lastModified: -1,
        structure: currentRepo.files
      })
    }
  }

  render(): React.ReactNode {
    const { initRepo } = this
    const { windowWidth, windowHeight } = this.props
    return (
      <>
        <Panel>
          <Row>
            <Col>
              <Button size="small" onClick={initRepo}>
                <FolderAddOutlined />
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
