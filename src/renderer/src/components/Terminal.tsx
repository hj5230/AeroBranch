import React from 'react'
import Versions from './Versions'
import style from '../assets/index.module.less'

interface Command {
  command: string
  output: string
}

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
    console.log(inputValue)
    const output = `Execute: ${inputValue}`
    this.setState({
      commandHistory: [...commandHistory, { command: inputValue, output }],
      inputValue: '',
      historyIndex: -1
    })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { handleCommand } = this
    const { historyIndex, commandHistory } = this.state
    console.log(historyIndex)
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand()
    } else if (e.key === 'ArrowUp' && historyIndex === -1) {
      this.setState({
        historyIndex: commandHistory.length - 1,
        inputValue: commandHistory[commandHistory.length - 1].command
      })
    } else if (e.key === 'ArrowUp' && historyIndex > 0) {
      console.log(historyIndex)
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
    const { commandHistory, inputValue } = this.state
    return (
      <>
        <div className={style.terminal} style={{ width: 850, height: 350 }}>
          <Versions />
          {commandHistory.map((item, index) => (
            <div key={index}>
              <div>{item.command}</div>
              <div>{item.output}</div>
            </div>
          ))}
          <textarea
            className={style.terminal_input}
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