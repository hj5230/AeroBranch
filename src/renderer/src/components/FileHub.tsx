import React from 'react'
// import { Card } from 'antd'
import Panel from './Panel'

interface Props {
  file: number | null
}

interface State {}

class FileHub extends React.Component<Props, State> {
  state: State = {}

  componentDidMount = (): void => {
    // fetch()
    //   .then(pms => pms.json())
    //   .then()
    this.setState({})
  }

  // componentDidUpdate = (
  //   prevProps: Readonly<Props>,
  //   prevState: Readonly<State>,
  //   snapshot?: any
  // ): void => {}

  render(): React.ReactNode {
    return (
      <>
        <Panel></Panel>
      </>
    )
  }
}

export default FileHub
