import React from 'react'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { verifyMacAddress, signIn } from '@service/user'
import { Modal, Form, Input, Button, Space, Badge, notification } from 'antd'
import { LoadingOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

const { Item } = Form
const { Password } = Input
const { Compact } = Space

interface PasswordRequirementProps {
  text: string
  satisfied: boolean
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({
  text,
  satisfied
}): React.ReactNode => (satisfied ? <></> : <Badge color="red" text={text} />)

type LoginForm = {
  macAddr: string
  ipAddr: string
  password: string
}

interface Props {
  onOpen: boolean
  onClose: () => void
  whichUser: (e: string) => void
}

interface State {
  macAddr: string
  ipAddr: string
  password: string
  macOk: boolean | null
  pwdOk: boolean[]
}

class LoginModal extends React.Component<Props, State> {
  state: State = {
    macAddr: '',
    ipAddr: '',
    password: '',
    macOk: null,
    pwdOk: [false, false, false, false]
  }

  openUnknownMacNote = (placement: NotificationPlacement): void => {
    const { macAddr } = this.state
    notification.error({
      message: '未被记录的设备',
      description: `当前MAC地址为 ${macAddr} 的设备未被服务器记录，访问因此被拒绝。`,
      placement,
      duration: 0
    })
  }

  openPasswordNotMatchNote = (placement: NotificationPlacement): void => {
    notification.error({
      message: '密码错误',
      description: '提交的密码与MAC地址拥有者的密码不匹配。',
      placement,
      duration: 3
    })
  }

  openLoggedInNote = (placement: NotificationPlacement, username: string): void => {
    notification.success({
      message: '登陆成功',
      description: `欢迎回来，${username}。`,
      placement,
      duration: 3
    })
  }

  componentDidMount = async (): Promise<void> => {
    const { getMacAddress } = window.api
    const macAddr = await getMacAddress()
    const macOk = await verifyMacAddress(macAddr)
    this.setState({ macAddr, macOk })
  }

  componentDidUpdate = (): void => {
    const { openUnknownMacNote } = this
    const { onOpen } = this.props
    const { macOk } = this.state
    if (onOpen === true && macOk === false) {
      openUnknownMacNote('bottom')
    }
  }

  onCheckPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    this.setState({
      password: value,
      pwdOk: [
        value.length >= 8,
        /\d/.test(value),
        /[a-z]/.test(value) && /[A-Z]/.test(value),
        /[~`!@#$%^&*()_\-+={[}\]:;"'<,>.?/]/.test(value)
      ]
    })
  }

  onDisableSubmit = (): boolean => {
    const { macOk, pwdOk } = this.state
    if (macOk && pwdOk.every((e) => e === true)) return false
    else return true
  }

  handleSubmit = async (): Promise<void> => {
    const { openLoggedInNote, openPasswordNotMatchNote } = this
    const { onClose, whichUser } = this.props
    const { macAddr, password } = this.state
    const response = await signIn(macAddr, password)
    if (!response.errno && response.token) {
      window.localStorage.setItem('jwt', response.token)
      onClose()
      whichUser(response.username)
      openLoggedInNote('bottom', response.username)
    } else if (response.errno === 'PWDNM') openPasswordNotMatchNote('bottom')
    else if (response.errno === 'USRNF') this.setState({ macOk: false })
  }

  render(): React.ReactNode {
    const { onCheckPassword, onDisableSubmit, handleSubmit } = this
    const { onOpen, onClose } = this.props
    const { macAddr, password, macOk, pwdOk } = this.state
    return (
      <>
        <Modal open={onOpen} onCancel={onClose} footer={null}>
          <Form onFinish={handleSubmit} autoComplete="off" style={{ marginTop: 30 }}>
            <Item<LoginForm> style={{ marginBottom: 0 }} initialValue={macAddr}>
              {macOk === null && (
                <Input
                  placeholder="MAC地址"
                  status="warning"
                  size="small"
                  prefix={<LoadingOutlined />}
                  disabled
                />
              )}
              {macOk === true && (
                <Input
                  placeholder="MAC地址"
                  size="small"
                  prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                  disabled
                />
              )}
              {macOk === false && (
                <Input
                  placeholder="MAC地址"
                  status="error"
                  size="small"
                  prefix={<CloseCircleTwoTone twoToneColor="#FF1616" />}
                  disabled
                />
              )}
            </Item>
            <Item<LoginForm> style={{ marginBottom: 0 }}>
              <Password
                value={password}
                onChange={onCheckPassword}
                placeholder="密码"
                size="small"
                prefix={
                  pwdOk.every((e) => e) ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#FF1616" />
                  )
                }
              />
            </Item>
            <Item>
              <Compact direction="vertical">
                <PasswordRequirement satisfied={pwdOk[0]} text="密码长度至少为8位" />
                <PasswordRequirement satisfied={pwdOk[1]} text="密码必须含有数字" />
                <PasswordRequirement satisfied={pwdOk[2]} text="密码必须含有大小写字母" />
                <PasswordRequirement
                  satisfied={pwdOk[3]}
                  text="密码必须含有 ~`!@#$%^&*()_-+={[}]|\:;”‘<,>.?/ 之一"
                />
              </Compact>
            </Item>
            <Item style={{ textAlign: 'right', marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" size="small" disabled={onDisableSubmit()}>
                登陆
              </Button>
            </Item>
          </Form>
        </Modal>
      </>
    )
  }
}

export default LoginModal
