import React from 'react'
import { Row, Col, Layout } from 'antd'
import DirHub from './DirHub'
import FileHub from './FileHub'
import OperateHub from './OperateHub'
import style from '../assets/index.module.less'

const { Content } = Layout

interface Props {
  repo: number | null
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
    const { repo } = this.props
    return (
      <>
        <Content className={style.page_content}>
          <Row gutter={[5, 0]}>
            <Col span={4}>
              <Row>
                <OperateHub />
              </Row>
              <Row>
                <DirHub repo={repo} whichFile={whichFile} />
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
