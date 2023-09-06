import React from 'react'

interface props {
  width?: number
  height?: number
}

const PlaceHolder: React.FC<props> = ({ width = 100, height = 100 }) => (
  <div style={{ width: width, height: height, border: '1px solid black' }} />
)

export default PlaceHolder
