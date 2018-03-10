import userService from '../services/users'


const userReducer = (state = [], action) => {
    // console.log(state, action)

    if (action.type === 'INIT_USERS') {
        return action.data
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

export default userReducer