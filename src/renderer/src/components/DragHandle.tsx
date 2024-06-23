import React, { RefObject, CSSProperties } from 'react'

interface Props {
  inputRef: RefObject<HTMLDivElement>
  inputStyle: CSSProperties
}

const DragHandle: React.FC<Props> = ({ inputRef, inputStyle }): JSX.Element => (
  <div ref={inputRef} style={inputStyle}>
    ⋮⋮⋮
  </div>
)

export default DragHandle
