import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addReminder } from '../actions'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.addReminder = this.addReminder.bind(this)
  }

  addReminder() {
    this.props.addReminder(this.state.text)
  }

  renderReminders() {
    const { reminders } = this.props

    return (
      <ul className="list-group col-sm-4" >
        {
          reminders.map(reminder => (
            <li key={reminder.id} className="list-group-item">
              <div>{reminder.text}</div>
            </li>
          ))
        }
      </ul>
    )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              type="text"
              name="text"
              className="form-control"
              placeholder="I have to ..."
              onChange={this.handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addReminder}
          >
            Add Reminder
          </button>
        </div>
        {this.renderReminders()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state: ', state)

  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder })(App)
