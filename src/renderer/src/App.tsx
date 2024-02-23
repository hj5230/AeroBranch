import React from 'react'
import Navbar from '@renderer/components/Navbar'
import MainPanel from '@renderer/components/MainPanel'
import Repository from '@renderer/interfaces/Repository'
import FileContent from '@renderer/interfaces/FileContent'
import './assets/App.css'

interface State {
  windowWidth: number
  windowHeight: number
  user: string | null
  repos: Repository[]
  currentRepo: Repository | null
  file: number | FileContent | null
}

class App extends React.Component<object, State> {
  state: State = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    user: null,
    repos: [],
    currentRepo: null,
    file: null
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

  whichUser = (e: string | null): void => {
    this.setState({ user: e })
  }

  whichRepo = (e: Repository | null): void => {
    this.setState({ currentRepo: e })
  }

  whichFile = (e: number | FileContent): void => {
    this.setState({ file: e })
  }

  addRepo = (e: Repository): void => {
    const { repos } = this.state
    this.setState({ repos: [...repos, e] }, () => {
      // console.log('current repos: ', this.state.repos)
    })
  }

  loadReposInfo = (): void => {
    // fetch(repos)
  }

  render(): React.ReactNode {
    const { whichUser, whichRepo, whichFile, addRepo } = this
    const { windowHeight, windowWidth, user, repos, currentRepo, file } = this.state
    return (
      <>
        <Navbar
          user={user}
          whichUser={whichUser}
          repos={repos}
          currentRepo={currentRepo}
          whichRepo={whichRepo}
          addRepo={addRepo}
        />
        <MainPanel
          repos={repos}
          file={file}
          whichFile={whichFile}
          currentRepo={currentRepo}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
        />
      </>
    )
  }
}

export default App
