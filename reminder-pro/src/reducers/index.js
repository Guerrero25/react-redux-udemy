import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants'
import { getStore, setStore } from '../lib'

const reminder = action => {
    const { text, dueDate } = action
    return {
        text,
        dueDate,
        id: Math.random()
    }
}

const removeById = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id)
    return reminders
}

const reminders = (state, action) => {
    state = getStore('reminders') || []
    let reminders = null

    switch(action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)]
            setStore('reminders', reminders)

            return reminders
        case DELETE_REMINDER:
            reminders = removeById(state, action.id)
            setStore('reminders', reminders)

            return reminders
        case CLEAR_REMINDERS:
            reminders = []
            setStore('reminders', reminders)

            return reminders
        default:
            return state
    }
}

export default reminders