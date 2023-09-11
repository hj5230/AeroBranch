import React from 'react'
import Navbar from './components/Navbar'
import MainPanel from './components/MainPanel'
import './assets/App.css'

interface State {
  windowWidth: number
  windowHeight: number
  repo: number | null
}

class App extends React.Component<object, State> {
  state: State = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    repo: null
  }

  componentDidMount = (): void => {
    const { updateWidth, updateHeight } = this
    window.addEventListener('resize', updateWidth)
    window.addEventListener('resize', updateHeight)
  }

  componentWillUnmount = (): void => {
    const { updateWidth, updateHeight } = this
    window.removeEventListener('resize', updateWidth)
    window.removeEventListener('resize', updateHeight)
  }

  updateWidth = (): void => {
    this.setState({ windowWidth: window.innerWidth })
  }

  updateHeight = (): void => {
    this.setState({ windowHeight: window.innerHeight })
  }

  whichRepo = (e: number): void => {
    this.setState({ repo: e })
  }

  render(): React.ReactNode {
    const { whichRepo } = this
    const { windowHeight, windowWidth, repo } = this.state
    return (
      <>
        <Navbar whichRepo={whichRepo} />
        <MainPanel repo={repo} file={0} windowWidth={windowWidth} windowHeight={windowHeight} />
      </>
    )
  }
}

export default App
