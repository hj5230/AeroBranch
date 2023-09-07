import React from 'react'
import { Row, Col, Layout } from 'antd'
import DirHub from './DirHub'
import FileHub from './FileHub'

const { Content } = Layout

interface Props {
  repo: number | null
}

class MainPanel extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { repo } = this.props
    return (
      <>
        <Content style={{ margin: 12 }}>
          <Row gutter={[5, 0]}>
            <Col span={6}>
              <DirHub repo={repo} />
            </Col>
            <Col span={18}>
              <FileHub />
            </Col>
          </Row>
        </Content>
      </>
    )
  }
}

export default MainPanel
