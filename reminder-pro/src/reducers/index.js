import { ADD_REMINDER, DELETE_REMINDER } from '../constants'

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

const reminders = (state = [], action) => {
    let reminders = null

    switch(action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)]
            console.log('reminder as state ', reminders)
            return reminders
        case DELETE_REMINDER:
            reminders = removeById(state, action.id)
            console.log('reminder as state ', reminders)
            return reminders
        default:
            return state
    }
}

export default reminders