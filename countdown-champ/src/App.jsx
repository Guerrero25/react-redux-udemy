import React, { Component } from 'react'

import './App.css'

class App extends Component {
    render() {
        return (
            <div className='App' >
                <div className='App-title' >Coutndown to December 25, 2017</div>
                <div>
                    <div>
                        <span className='Clock-num' >14 days</span>
                        <span className='Clock-num' >30 hours</span>
                        <span className='Clock-num' >15 minutes</span>
                        <span className='Clock-num' >20 seconds</span>
                    </div>
                    <div>
                        <input type="text" placeholder="New Date" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App