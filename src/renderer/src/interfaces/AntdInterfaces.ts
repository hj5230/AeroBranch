import type { DataNode, EventDataNode } from 'antd/es/tree'

interface NodeInfo {
  event: 'select'
  selected: boolean
  node: EventDataNode<DataNode>
  selectedNodes: DataNode[]
  nativeEvent: MouseEvent
}

export type { NodeInfo }
