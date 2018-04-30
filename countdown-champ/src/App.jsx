import React, { Component } from 'react'

import Clock from './Clock'
import { Form, FormControl, Button } from 'react-bootstrap'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deadline: 'December 25, 2018',
            newDeadline: ''
        }

        this.changedDeadline = this.changedDeadline.bind(this)
        this.handleNewDeadline = this.handleNewDeadline.bind(this)
    }

    handleNewDeadline(e) {
        e.preventDefault()

        this.setState({
            newDeadline: e.target.value
        })
    }

    changedDeadline() {
        this.setState({
            deadline: this.state.newDeadline
        })
    }

    render() {
        return (
            <div className='App' >
                <div className='App-title' >Coutndown to {this.state.deadline}</div>
                <div>
                    <Clock deadline={this.state.deadline} />
                    <Form inline>
                        <FormControl
                            className='Deadline-input'
                            type="text"
                            placeholder="New Date"
                            onChange={this.handleNewDeadline}
                            value={this.state.newDeadline} />
                        <Button onClick={this.changedDeadline} >
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default App