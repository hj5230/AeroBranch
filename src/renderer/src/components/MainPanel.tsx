import React from 'react'
import { Row, Col, Layout } from 'antd'
import Repository from '@interface/Repository'
import FileContent from '@interface/FileContent'
import DirHub from '@renderer/components/DirHub'
import FileHub from '@renderer/components/FileHub'
import style from '@renderer/assets/index.module.less'

const { Content } = Layout

interface Props {
  repos: Repository[]
  currentRepo: Repository | null
  file: number | FileContent | null
  whichFile: (e: number | FileContent) => void
}

class MainPanel extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { file, whichFile } = this.props
    const { repos, currentRepo } = this.props
    return (
      <>
        <Content className={style.content}>
          <Row className={style.row}>
            <Col span={6} className={style.col}>
              <DirHub repos={repos} currentRepo={currentRepo} whichFile={whichFile} />
            </Col>
            <Col span={18} className={style.col}>
              <FileHub file={file} currentRepo={currentRepo} />
            </Col>
          </Row>
        </Content>
      </>
    )
  }
}

export default MainPanel
