import React from 'react'
import { Row, Col, Layout } from 'antd'
import Repository from '@renderer/interfaces/Repository'
import DirHub from './DirHub'
import FileHub from './FileHub'
import OperateHub from './OperateHub'
import style from '@renderer/assets/index.module.less'

const { Content } = Layout

interface Props {
  windowWidth: number
  windowHeight: number
  repos: Repository[]
  currentRepo: Repository | null
  file: number | null
}

interface State {
  file: number | null
}

class MainPanel extends React.Component<Props, State> {
  state: State = {
    file: null
  }

  whichFile = (e: number): void => {
    this.setState({ file: e })
  }

  render(): React.ReactNode {
    const { whichFile } = this
    const { repos, currentRepo, windowWidth, windowHeight } = this.props
    return (
      <>
        <Content className={style.page_content}>
          <Row gutter={[5, 0]}>
            <Col span={4}>
              <Row>
                <OperateHub windowWidth={windowWidth} windowHeight={windowHeight} />
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
              <FileHub file={null} />
            </Col>
          </Row>
        </Content>
      </>
    )
  }
}

export default MainPanel
