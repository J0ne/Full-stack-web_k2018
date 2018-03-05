
// const displayStatus = () => {
//     this.visible = 'none',
//     this.hidden = ''
// }

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
            newState = Object.assign({}, state, { message: "joojoojoo", status: 'none' })
            return newState
        default:

            return state
    }
}

// const showNotification = ( message, time) => {

// }

export const actionForAlerts = {
    notificationShowing(message) {
        console.log(message)
        return {
            type: 'SHOW',
            message
        }
    },
    notificationHiding(){
        return {
            type: 'HIDE',
            message: null
        }
    },
    showNotification(message){
        return {
            type: 'SHOW',
            message: message
        }
    },
    hideNotification(){
        return {
            type: 'HIDE',
            message: null
        }
    }
}

export default notificationReducer