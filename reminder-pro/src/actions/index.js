import { ADD_REMINDER } from '../constants'

export const addReminder = text => {
    const action = {
        text,
        type: ADD_REMINDER
    }

    console.log('action in addReminder ', action)
    return action
}