import React from 'react'
import Navbar from './components/Navbar'
import MainPanel from './components/MainPanel'
import Repository from '@renderer/interfaces/Repository'
import './assets/App.css'

interface State {
  windowWidth: number
  windowHeight: number
  user: string | null
  repos: Repository[]
  currentRepo: Repository | null
}

class App extends React.Component<object, State> {
  state: State = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    user: null,
    repos: [
      {
        id: 1693933379,
        name: 'Demo Repository',
        fromAero: true,
        description: 'the first repo instance as demo'
      },
      {
        id: 1693936982,
        name: 'Another Demo Repo',
        fromAero: true
      }
    ],
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

  whichRepo = (e: Repository | null): void => {
    this.setState({ currentRepo: e })
  }

  whichUser = (e: string | null): void => {
    this.setState({ user: e })
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
    const { whichUser, whichRepo, addRepo } = this
    const { windowHeight, windowWidth, user, repos, currentRepo } = this.state
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
          file={0}
          currentRepo={currentRepo}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
        />
      </>
    )
  }
}

export default App
