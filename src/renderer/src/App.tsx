import React from 'react'
import Navbar from './components/Navbar'
import MainPanel from './components/MainPanel'
import './assets/App.css'

interface State {
  windowWidth: number
  windowHeight: number
  user: string | null
  repos: object[]
  currentRepo: number | null
}

class App extends React.Component<object, State> {
  state: State = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    user: null,
    repos: [],
    currentRepo: null
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
    this.setState({ currentRepo: e })
  }

  whichUser = (e: string): void => {
    this.setState({ user: e })
  }

  render(): React.ReactNode {
    const { whichUser, whichRepo } = this
    const { windowHeight, windowWidth, user, repos } = this.state
    return (
      <>
        <Navbar user={user} whichUser={whichUser} repos={repos} whichRepo={whichRepo} />
        <MainPanel repo={repos} file={0} windowWidth={windowWidth} windowHeight={windowHeight} />
      </>
    )
  }
}

export default App
