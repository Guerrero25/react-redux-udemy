import React, { Component } from 'react'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deadline: 'December 25, 2017',
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
                    <div>
                        <span className='Clock-num' >14 days</span>
                        <span className='Clock-num' >30 hours</span>
                        <span className='Clock-num' >15 minutes</span>
                        <span className='Clock-num' >20 seconds</span>
                    </div>
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