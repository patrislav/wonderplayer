import React from 'react'

const SEEK_STEP = 5
const VOLUME_STEP = 0.05

export default class Video extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 32: { // SPACE
          this.toggle()
          event.preventDefault()
          return
        }

        case 37: { // LEFT
          this.seekLeft()
          event.preventDefault()
          return
        }

        case 38: { // UP
          this.volumeUp()
          event.preventDefault()
          return
        }

        case 39: { // RIGHT
          if (this.video.paused) {
            this.seekRight()
          }
          else {
            this.video.playbackRate = 4.0
          }
          event.preventDefault()
          return
        }

        case 40: { // DOWN
          this.volumeDown()
          event.preventDefault()
          return
        }
      }
    })

    document.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case 39: { // RIGHT
          this.video.playbackRate = 1.0
          event.preventDefault()
          return
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.video.load()
    }
  }

  render() {
    const { url, autoplay, subtitles } = this.props

    return (
      <video ref={c => this.video = c} controls style={{ width: '100%', height: '100%' }} autoPlay={autoplay}>
        {url ? (
          <source type="video/webm" src={url} />
        ) : null}
        {subtitles ? (
          <track src={subtitles} label="Subtitles" kind="subtitles" default="default" />
        ) : null}
      </video>
    )
  }

  toggle = () => {
    if (this.video.paused) {
      this.play()
    }
    else {
      this.pause()
    }
  }

  play = () => {
    this.video.play()
  }

  pause = () => {
    this.video.pause()
  }

  seekLeft = () => {
    this.video.currentTime = Math.max(this.video.currentTime - SEEK_STEP, 0)
  }

  seekRight = () => {
    this.video.currentTime = Math.min(this.video.currentTime + SEEK_STEP, this.video.duration)
  }

  volumeUp = () => {
    this.video.volume = Math.min(this.video.volume + VOLUME_STEP, 1.0)
  }

  volumeDown = () => {
    this.video.volume = Math.max(this.video.volume - VOLUME_STEP, 0.0)
  }
}
