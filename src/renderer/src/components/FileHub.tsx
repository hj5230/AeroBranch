import React, { ReactNode } from 'react'
import Panel from './Panel'
import FileContent from '@renderer/interfaces/FileContent'

interface Props {
  file: number | FileContent | null
}

interface State {
  displayContent: ReactNode
}

class FileHub extends React.Component<Props, State> {
  state: State = {
    displayContent: <></>
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps !== this.props) {
      const { renderFileContent } = this
      const { file } = this.props
      if (typeof file === 'number') {
        // fetch...
        // fileContent = ...fetchResult
        // this.setState({...})
      } else if (file === null) {
        // ...
      } else {
        this.setState({ displayContent: renderFileContent(file) })
      }
    }
  }

  renderFileContent = (fileContent: FileContent): ReactNode => {
    if (!fileContent) return <div>Loading...</div>
    if (fileContent.type === 'text') return <pre>{fileContent.content}</pre>
    else if (fileContent.type === 'binary' && fileContent.ext) {
      if (fileContent.ext === '.pdf') {
        return (
          <embed
            src={`data:application/pdf;base64,${fileContent.content}`}
            type="application/pdf"
            width="500"
            height="600"
          />
        )
      } else {
        return (
          <img
            src={`data:image/${fileContent.ext.substring(1)};base64,${fileContent.content}`}
            alt="File content"
          />
        )
      }
    } else {
      return <div>Unsupported or error</div>
    }
  }

  render(): React.ReactNode {
    const { displayContent } = this.state
    return (
      <>
        <Panel>{displayContent}</Panel>
      </>
    )
  }
}

export default FileHub
