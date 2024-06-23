import React, { useState } from 'react'
import style from '@renderer/assets/index.module.less'

const Versions: React.FC = (): JSX.Element => {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className={style.versions}>
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <li className="v8-version">V8 v{versions.v8}</li>
    </ul>
  )
}

export default Versions
