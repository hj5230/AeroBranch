interface FileContent {
  type: 'text' | 'binary' | 'unsupported'
  content?: string
  ext?: string
}

export default FileContent
