import React, { CSSProperties, ReactNode } from 'react'
import { Card } from 'antd'
import style from '@renderer/assets/index.module.less'

interface Props {
  inputStyle?: CSSProperties
  inputRef?: React.RefObject<HTMLDivElement>
  children: ReactNode
}

class Panel extends React.Component<Props, object> {
  render(): React.ReactNode {
    const { inputStyle, inputRef, children } = this.props
    return (
      <>
        <Card
          className={style.panel}
          ref={inputRef}
          styles={{ body: { padding: 5 } }}
          style={inputStyle}
        >
          {children}
        </Card>
      </>
    )
  }
}

export default Panel
