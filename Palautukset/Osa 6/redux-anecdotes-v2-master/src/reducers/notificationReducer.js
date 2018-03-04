
const initialState = {
    message: '*render here...'
}

const notificationReducer = (state = initialState, action) => {
    console.log('ACTION',action)
    console.log('STATE', state)
    switch (action.type) {
        case 'SHOW':
            const newState = { ...state, message: action.message }
            return newState
        default:
            return state
    }
}

export const actionFor = {
    notificationShowing(message) {
        console.log(message)
        return {
            type: 'SHOW',
            message
        }
    }
}

export default notificationReducer