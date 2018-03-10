import userService from '../services/users'


const userReducer = (state = [], action) => {
    // console.log(state, action)
    if (action.type === 'INIT_USERS') {
        console.log('INIT_USERS')
        return action.data
    }
    if (action.type === 'FIND_USER') {
        return action.data.find( u => u.id === action.id)
    }
    return state
}

export const userInitialization = (data) => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })

    }
}
export const findById = (id) => {
   debugger
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'FIND_USER',
            id
        })
    }
}
// export const userById = (data) => {

// }

export default userReducer