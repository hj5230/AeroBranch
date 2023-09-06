import React from 'react'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
import './assets/App.css'

interface State {
  repo: number | undefined
}

class App extends React.Component<object, State> {
  state: State = {
    repo: undefined
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
        <MainPage repo={repo} />
      </>
    )
  }
}

export default App
