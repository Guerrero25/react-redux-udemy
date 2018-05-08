import React, { Component } from 'react'
import { Form, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

import Profile from './Profile'
import Gallery from './Gallery'

import AuthSpotifyService from './services/AuthSpotifyService'
import spotifyConfig from './config/spotifyConfig'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            artist: null,
            tracks: []
        }

        this.auth = new AuthSpotifyService('https://api.spotify.com/v1/', spotifyConfig)
        this.search = this.search.bind(this)
    }

    componentWillMount() {
        this.auth.authorize()
    }

    search(e) {
        e.preventDefault()
        console.log('this.state', this.state)
        const BASE_URL = 'search?',
            OPTIONS = {
                q: this.state.query,
                type: 'artist',
                limit: 1
            },
            ALBUM_URL = 'artists',
            Auth = this.auth
        let FETCH_URL = BASE_URL + Auth.stringify(OPTIONS)

        console.log('FETCH_URL', FETCH_URL)

        Auth.fetch(FETCH_URL, {
            method: 'GET'
        })
        .then(json => {
            const artist = json.artists.items[0]

            this.setState({ artist })

            FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=CO`

            Auth.fetch(FETCH_URL, {
                method: 'GET'
            })
            .then(json => {
                const { tracks } = json

                this.setState({ tracks })
            })
        })
        .catch(err => console.log('Error: ', err))
    }

    render() {
        return (
            <div className="App" >
                <div className="App-title">Music Master</div>
                <Form onSubmit={this.search}>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search an artist..."
                            value={this.state.query}
                            onChange={event => this.setState({ query: event.target.value })} />
                        <InputGroup.Addon onClick={this.search} >
                            <Glyphicon glyph="search" />
                        </InputGroup.Addon>
                    </InputGroup>
                </Form>
                {
                    this.state.artist
                    ? 
                    <div>
                        <Profile
                            artist={this.state.artist} />
                        <Gallery
                            tracks={this.state.tracks} />
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default App