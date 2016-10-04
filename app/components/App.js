import React from 'react'
import { ipcRenderer as ipc } from 'electron'
import Video from './Video'

export default class App extends React.Component {
  state = {
    videoPath: null,
    subtitles: null,
    autoplay: false
  }

  componentDidMount() {
    ipc.on('open-file', (event, paths) => {
      if (paths && paths[0]) {
        const videoPath = `file://${paths[0]}`
        this.setState({ videoPath, autoplay: true })
      }
    })

    ipc.on('load-subtitles', (event, subtitles) => {
      if (subtitles) {
        this.setState({ subtitles })
      }
    })
  }

  render() {
    const { videoPath, autoplay, subtitles } = this.state

    return (
      <div style={{ height: '100%' }}>
        <Video url={videoPath} autoplay={autoplay} subtitles={subtitles} />
      </div>
    )
  }
}
