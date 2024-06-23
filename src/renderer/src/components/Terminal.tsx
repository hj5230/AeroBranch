import React from 'react'
import Versions from '@renderer/components/Versions'
import style from '@renderer/assets/index.module.less'

interface Command {
  command: string
  output: string
}

// interface Props {}

interface State {
  inputValue: string
  commandHistory: Command[]
  historyIndex: number
}
class Terminal extends React.Component<object, State> {
  state: State = {
    inputValue: '',
    commandHistory: [],
    historyIndex: -1
  }

  handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ inputValue: e.target.value })
  }

  handleCommand = (): void => {
    const { inputValue, commandHistory } = this.state
    if (inputValue === '') return
    const output = `Execute: ${inputValue}`
    // commandHistory.filter((e) => e.command !== inputValue)
    this.setState({
      commandHistory: [...commandHistory, { command: inputValue, output }],
      inputValue: '',
      historyIndex: -1
    })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { handleCommand } = this
    const { historyIndex, commandHistory } = this.state
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand()
    } else if (e.key === 'ArrowUp' && historyIndex === -1) {
      this.setState({
        historyIndex: commandHistory.length - 1,
        inputValue: commandHistory[commandHistory.length - 1].command
      })
    } else if (e.key === 'ArrowUp' && historyIndex > 0) {
      this.setState({
        historyIndex: historyIndex - 1,
        inputValue: commandHistory[historyIndex - 1].command
      })
    } else if (
      e.key === 'ArrowDown' &&
      (historyIndex === commandHistory.length - 1 || historyIndex === -1)
    ) {
      this.setState({
        historyIndex: -1,
        inputValue: ''
      })
    } else if (e.key === 'ArrowDown' && historyIndex < commandHistory.length - 1) {
      this.setState({
        historyIndex: historyIndex + 1,
        inputValue: commandHistory[historyIndex + 1].command
      })
    }
  }

  render(): React.ReactNode {
    const { handleInputChange, handleKeyDown } = this
    const { innerWidth, innerHeight } = window
    const { commandHistory, inputValue } = this.state
    return (
      <>
        <div
          className={style.terminal}
          style={{ width: innerWidth * 0.8, height: innerHeight * 0.6 }}
        >
          <Versions />
          {commandHistory.map((item, index) => (
            <div key={index}>
              <div>{item.command}</div>
              <div>{item.output}</div>
            </div>
          ))}
          <textarea
            className={style.terminal_input}
            // value={`sasha@WUJIE-14:Repo$${inputValue}`}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{ width: '100%', height: '100%' }}
            spellCheck={false}
          />
        </div>
      </>
    )
  }
}

export default Terminal
