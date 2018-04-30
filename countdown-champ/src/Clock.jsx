import React, { Component } from 'react'

class Clock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    componentWillMount() {
        this.getTimeUntil(this.props.deadline)
    }

    componentDidMount() {
        setInterval(() => this.getTimeUntil(this.props.deadline), 1000)
    }

    leading0(num) {
        return num <10 ? '0' + num : num
    }

    getTimeUntil(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date())
        const newState = {
            seconds: Math.floor((time/1000) % 60),
            minutes: Math.floor((time/1000/60) % 60),
            hours: Math.floor((time/(1000*60*60)) % 24),
            days: Math.floor(time/(1000*60*60*24))
        }

        this.setState(newState)
    }

    render() {
        return (
            <div>
                <span className='Clock-num' >{this.leading0(this.state.days)} days</span>
                <span className='Clock-num' >{this.leading0(this.state.hours)} hours</span>
                <span className='Clock-num' >{this.leading0(this.state.minutes)} minutes</span>
                <span className='Clock-num' >{this.leading0(this.state.seconds)} seconds</span>
            </div>
        )
    }
}

export default Clock
