
const initialState = {
    message: '*render here...',
    status: 'none'
}


const notificationReducer = (state = initialState, action) => {
    console.log('ACTION',action)
    console.log('STATE', state)
    // const newState = { ...state }
    let newState = null
    switch (action.type) {
        case 'SHOW':
            newState = Object.assign({}, state, { message: action.message, status: 'block' })
            return newState
        case 'HIDE':
            newState = Object.assign({}, state, { message: null, status: 'none' })
            return newState
        default:

            return state
    }
}

export const showNotification = (message) => {
        return {
            type: 'SHOW',
            message: message
        }
}
export const hideNotification = () => {
        return {
            type: 'HIDE',
            message: null
        }
}

export default notificationReducer