import React from 'react'
import Navbar from './components/Navbar'
import MainPanel from './components/MainPanel'
import './assets/App.css'

interface State {
  repo: number | null
}

class App extends React.Component<object, State> {
  state: State = {
    repo: null
  }

  whichRepo = (e: number): void => {
    this.setState({ repo: e })
  }

  render(): React.ReactNode {
    const { whichRepo } = this
    const { repo } = this.state
    return (
      <>
        <Navbar whichRepo={whichRepo} />
        <MainPanel repo={repo} />
      </>
    )
  }
}

export default App
