import React, { createRef, RefObject } from 'react'
import Repository from '@interface/Repository'
import { Button, Popover, Row } from 'antd'
import Panel from '@renderer/components/Panel'
import Terminal from '@renderer/components/Terminal'
import {
  FolderAddOutlined,
  BranchesOutlined,
  CodeOutlined,
  SettingOutlined
} from '@ant-design/icons'
import DragHandle from './DragHandle'

interface Props {
  currentRepo: Repository | null
}

class OperateHub extends React.Component<Props, object> {
  private wrapperRef: RefObject<HTMLDivElement>
  private dragHandleRef: RefObject<HTMLDivElement>
  private offsetX: number = 0
  private offsetY: number = 0

  constructor(props: Props) {
    super(props)
    this.wrapperRef = createRef()
    this.dragHandleRef = createRef()
  }

  initRepo = (): void => {
    const { currentRepo } = this.props
    const { dotaeroOrInit } = window.api
    if (currentRepo && currentRepo.localPath) {
      console.log(currentRepo)
      dotaeroOrInit(currentRepo.localPath, {
        userId: -1,
        macAddress: '',
        hashedPass: '',
        createTime: -1,
        lastModified: -1,
        structure: currentRepo.files
      })
    }
  }

  componentDidMount = (): void => {
    const dragHandle = this.dragHandleRef.current
    if (dragHandle) {
      dragHandle.addEventListener('mousedown', this.onMouseDown)
    }
  }

  componentWillUnmount = (): void => {
    const dragHandle = this.dragHandleRef.current
    if (dragHandle) {
      dragHandle.removeEventListener('mousedown', this.onMouseDown)
    }
  }

  onMouseDown = (e: MouseEvent): void => {
    const wrapper = this.wrapperRef.current
    if (wrapper) {
      this.offsetX = e.clientX - wrapper.getBoundingClientRect().left
      this.offsetY = e.clientY - wrapper.getBoundingClientRect().top
      wrapper.style.cursor = 'grabbing'
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
      e.preventDefault() // Prevent text selection
    }
  }

  onMouseMove = (e: MouseEvent): void => {
    const wrapper = this.wrapperRef.current
    if (wrapper) {
      const parent = wrapper.parentElement
      if (parent) {
        const parentRect = parent.getBoundingClientRect()
        const wrapperRect = wrapper.getBoundingClientRect()

        let newLeft = e.clientX - this.offsetX
        let newTop = e.clientY - this.offsetY

        const minLeft = parentRect.left
        const maxLeft = parentRect.right - wrapperRect.width - 10
        const minTop = parentRect.top
        const maxTop = parentRect.bottom - wrapperRect.height - 5

        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft))
        newTop = Math.max(minTop, Math.min(newTop, maxTop))

        wrapper.style.left = `${newLeft - parentRect.left}px`
        wrapper.style.top = `${newTop - parentRect.top}px`
      }
    }
  }

  onMouseUp = (): void => {
    const wrapper = this.wrapperRef.current
    if (wrapper) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
      wrapper.style.cursor = 'grab'
    }
  }

  render(): React.ReactNode {
    const { wrapperRef, dragHandleRef, initRepo } = this
    return (
      <Panel
        inputRef={wrapperRef}
        inputStyle={{ position: 'absolute', cursor: 'grab', zIndex: 1000, userSelect: 'none' }}
      >
        <Row>
          <DragHandle
            inputRef={dragHandleRef}
            inputStyle={{ marginRight: '10px', cursor: 'grab', userSelect: 'none' }}
          />
          <Button size="small" onClick={initRepo}>
            <FolderAddOutlined />
          </Button>
          <Button size="small">
            <BranchesOutlined />
          </Button>
          <Popover content={<Terminal />} placement="bottom" trigger="click">
            <Button size="small">
              <CodeOutlined />
            </Button>
          </Popover>
          <Button size="small">
            <SettingOutlined />
          </Button>
        </Row>
      </Panel>
    )
  }
}

export default OperateHub
