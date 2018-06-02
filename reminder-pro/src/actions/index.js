import { ADD_REMINDER, DELETE_REMINDER } from '../constants'

export const addReminder = (text, dueDate) => {
    const action = {
        text,
        dueDate,
        type: ADD_REMINDER
    }

    console.log('action in addReminder ', action)
    return action
}

export const deleteReminder = id => {
    const action = {
        id,
        type: DELETE_REMINDER
    }

    console.log('action in deleteReminder ', action)
    return action
}