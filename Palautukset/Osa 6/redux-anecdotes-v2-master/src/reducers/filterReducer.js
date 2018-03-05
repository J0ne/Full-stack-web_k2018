
const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
        //const filter = action.filter
            return action.filter
        default:
            return state
    }
}

export const filtering = (value) => {
    return {
        type: 'FILTER',
        filter: value
    }
}

export default filterReducer