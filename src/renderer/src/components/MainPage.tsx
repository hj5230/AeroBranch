import React from 'react'
import { Row, Col, Layout } from 'antd'
import TreeBar from './TreeBar'
import FilePanel from './FilePanel'

const { Content } = Layout

interface Props {
  repo: number | undefined
}

class MainPage extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { repo } = this.props
    return (
      <>
        <Content style={{ margin: 12 }}>
          <Row gutter={[5, 0]}>
            <Col span={6}>
              <TreeBar repo={repo} />
            </Col>
            <Col span={18}>
              <FilePanel />
            </Col>
          </Row>
        </Content>
      </>
    )
  }
}

export default MainPage
