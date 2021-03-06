import React, { Component } from 'react'

import './Gallery.css'

class Gallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }

    playAudio(previewUrl) {
        const audio = new Audio(previewUrl)

        if (!this.state.playing) {
            audio.play()

            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio
            })
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause()

                this.setState({
                    playing: false,
                    playingUrl: ''
                })
            } else {
                this.state.audio.pause()
                audio.play()

                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio
                })
            }
        }
    }

    render() {
        const { tracks } = this.props

        return (
            <div className='Gallery' >
                {tracks.map((track, k) => {
                    const trackImg = track.album.images[0].url

                    return (
                        <div
                            key={k}
                            className='track'
                            onClick={() => this.playAudio(track.preview_url)}
                        >
                            <img
                                src={trackImg}
                                alt="track-img"
                                className='track-img' />
                            <div className="track-play">
                                <div className="track-play-inner">
                                    {
                                        this.state.playingUrl === track.preview_url
                                        ? <span>||</span>
                                        : <span>&#9654;</span>
                                    }
                                </div>
                            </div>
                            <p className="track-text">
                                {track.name}
                            </p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Gallery