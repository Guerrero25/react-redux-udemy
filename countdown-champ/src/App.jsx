import React, { Component } from 'react'

import Clock from './Clock'

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
                    <div>
                        <input
                            type="text"
                            placeholder="New Date"
                            onChange={this.handleNewDeadline} />
                        <button onClick={this.changedDeadline} >Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App