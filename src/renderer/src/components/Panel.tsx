import React, { ReactNode } from 'react'
import { Row } from 'antd'
import style from '../assets/index.module.less'

interface Props {
  width?: number | string
  height?: number | string
  children?: ReactNode
}

class Panel extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { width, height, children } = this.props
    return (
      <>
        <Row className={style.display_panel} style={{ width: width, height: height }}>
          {children}
        </Row>
      </>
    )
  }
}

export default Panel
