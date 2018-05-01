import React, { Component } from 'react'
import { Form, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: ''
        }

        this.search = this.search.bind(this)
    }

    search(e) {
        e.preventDefault()
        console.log('this.state', this.state)
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
                            onChange={event => this.setState({query: event.target.value})} />
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