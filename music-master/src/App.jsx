import React, { Component } from 'react'
import { Form, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            params: this.getHashParams(),
            access_token: ''
        }

        this.search = this.search.bind(this)
    }

    componentWillMount() {
        if (this.state.params.access_token) {
            const access_token = this.state.params.access_token

            window.localStorage.setItem('auth_token', access_token)

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

        if (!this.state.access_token) {
            this.setState({
                access_token: window.localStorage.getItem('auth_token')
            })
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
              FETCH_URL = BASE_URL + this.stringify(OPTIONS)

        console.log('FETCH_URL', FETCH_URL)
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
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App