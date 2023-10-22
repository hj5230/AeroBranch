import React from 'react'
import { Row, Col, Layout } from 'antd'
import DirHub from './DirHub'
import FileHub from './FileHub'
import OperateHub from './OperateHub'
import style from '../assets/index.module.less'

const { Content } = Layout

interface Props {
  windowWidth: number
  windowHeight: number
  repo: object[]
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
    const { windowWidth, windowHeight, repo } = this.props
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
                  repo={repo}
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
