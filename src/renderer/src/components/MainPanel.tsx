import React from 'react'
import { Row, Col, Layout } from 'antd'
import DirHub from './DirHub'
import FileHub from './FileHub'
import OperateHub from './OperateHub'
import Repository from '@renderer/interfaces/Repository'
import FileContent from '@renderer/interfaces/FileContent'
import style from '@renderer/assets/index.module.less'

const { Content } = Layout

interface Props {
  windowWidth: number
  windowHeight: number
  repos: Repository[]
  currentRepo: Repository | null
  file: number | FileContent | null
  whichFile: (e: number | FileContent) => void
}

class MainPanel extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { file, whichFile } = this.props
    const { repos, currentRepo, windowWidth, windowHeight } = this.props
    return (
      <>
        <Content className={style.page_content}>
          <Row gutter={[5, 0]}>
            <Col span={4}>
              <Row>
                <OperateHub
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                  currentRepo={currentRepo}
                />
              </Row>
              <Row>
                <DirHub
                  repos={repos}
                  currentRepo={currentRepo}
                  whichFile={whichFile}
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                />
              </Row>
            </Col>
            <Col span={20}>
              <FileHub file={file} />
            </Col>
          </Row>
        </Content>
      </>
    )
  }
}

export default MainPanel
