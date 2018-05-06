import React, { Component } from 'react'
import { Form, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile'
import Gallery from './Gallery'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            artist: null,
            tracks: [],
            params: this.getHashParams(),
            access_token: window.localStorage.getItem('auth_token'),
            token_type: window.localStorage.getItem('token_type')
        }

        this.search = this.search.bind(this)
    }

    componentWillMount() {
        if (this.state.params.access_token) {
            const { access_token, expires_in, token_type } = this.state.params

            window.localStorage.setItem('auth_token', access_token)
            window.localStorage.setItem('expires_in', expires_in)
            window.localStorage.setItem('token_type', token_type)

            window.location = 'http://localhost:3000'
        }
    }

    componentDidMount() {
        if (!window.localStorage.getItem('auth_token')) {
            const AUTH_SETTINGS = {
                client_id: '37c1a14b73b4453793a822017255f767',
                response_type: 'token',
                redirect_uri: 'http://localhost:3000'
            }
            
            window.location = 'https://accounts.spotify.com/authorize?' + this.stringify(AUTH_SETTINGS)
        }
    }

    stringify(object) {
        return Object.keys(object).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(object[k])).join('&')
    }

    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1)
        
        e = r.exec(q)

        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }

        return hashParams;
    }

    search(e) {
        e.preventDefault()
        console.log('this.state', this.state)
        const BASE_URL = 'https://api.spotify.com/v1/search?',
            OPTIONS = {
                q: this.state.query,
                type: 'artist',
                limit: 1
            },
            ALBUM_URL = 'https://api.spotify.com/v1/artists',
            Authorization = this.state.token_type + ' ' + this.state.access_token
        let FETCH_URL = BASE_URL + this.stringify(OPTIONS)

        console.log('FETCH_URL', FETCH_URL)

        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                Authorization
            }
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0]

            this.setState({ artist })

            FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=CO`

            fetch(FETCH_URL, {
                method: 'GET',
                headers: {
                    Authorization
                }
            })
            .then(response => response.json())
            .then(json => {
                const { tracks } = json

                this.setState({ tracks })
            })
        })
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