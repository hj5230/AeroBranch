import React, { ReactNode } from 'react'
import FileContent from '@interface/FileContent'
import Repository from '@interface/Repository'
import Panel from '@renderer/components/Panel'

interface Props {
  file: number | FileContent | null
}

interface Props {
  currentRepo: Repository | null
}

interface State {
  displayContent: ReactNode
}

// File content loading: text files wont load to the end of the file, large PDFs cannot load properly
// Less setting needed, currently it didn't display in correct format
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
