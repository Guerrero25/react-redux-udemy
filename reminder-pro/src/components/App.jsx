import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addReminder, deleteReminder, clearReminders } from '../actions'

import moment from 'moment'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      dueDate: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.addReminder = this.addReminder.bind(this)
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate)
    this.setState({
      text: '',
      dueDate: ''
    })
  }

  deleteReminder(id) {
    this.props.deleteReminder(id)
  }

  renderReminders() {
    const { reminders } = this.props

    return (
      <ul className="list-group col-sm-4" >
        {
          reminders.map(reminder => (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item" >
                <div>{reminder.text}</div>
                <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
              </div>
              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
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
    const { text, dueDate } = this.state

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
              value={text}
              onChange={this.handleChange}
            />
            <input
              type="datetime-local"
              className="form-control"
              value={dueDate}
              onChange={event => this.setState({ dueDate: event.target.value })}
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
        {this.props.reminders.length > 0
          ? <button
              className="btn btn-danger"
              onClick={() => this.props.clearReminders()}
            >
              Clear Reminders
            </button>
          : ''
        }
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

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App)
