import React from 'react'

interface Props {
  width?: number
  height?: number
}

const PlaceHolder: React.FC<Props> = ({ width = 100, height = 100 }): JSX.Element => (
  <div style={{ width: width, height: height, border: '1px solid black' }} />
)

export default PlaceHolder
