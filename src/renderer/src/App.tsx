import React from 'react'
import Repository from '@interface/Repository'
import FileContent from '@interface/FileContent'
import { verifyJwt } from '@service/user'
import Navbar from '@renderer/components/Navbar'
import MainPanel from '@renderer/components/MainPanel'
import OperateHub from '@renderer/components/OperateHub'
import '@renderer/assets/App.css'

interface State {
  user: string | null
  repos: Repository[]
  currentRepo: Repository | null
  file: number | FileContent | null
}

class App extends React.Component<object, State> {
  state: State = {
    user: null,
    repos: [],
    currentRepo: null,
    file: null
  }

  componentDidMount = async (): Promise<void> => {
    const jwt = await verifyJwt()
    if (jwt) {
      this.setState({ user: jwt.username })
    }
  }

  componentWillUnmount = (): void => {}

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

  // loadReposInfo = (): void => {
  //   // fetch(repos)
  // }

  render(): React.ReactNode {
    const { whichUser, whichRepo, whichFile, addRepo } = this
    const { user, repos, currentRepo, file } = this.state
    return (
      <>
        <OperateHub currentRepo={currentRepo} />
        <Navbar
          user={user}
          whichUser={whichUser}
          repos={repos}
          currentRepo={currentRepo}
          whichRepo={whichRepo}
          addRepo={addRepo}
        />
        <MainPanel repos={repos} file={file} whichFile={whichFile} currentRepo={currentRepo} />
      </>
    )
  }
}

export default App
