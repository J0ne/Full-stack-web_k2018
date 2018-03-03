import { createStore } from 'redux'
const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    average: 0,
    oks: 0
}

const counterReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case 'GOOD':
            newState.good++
            break
            //return newState
        case 'OK':
            newState.ok++
            break
            //return newState
        case 'BAD':
            newState.bad++
            break
            //return newState
        case 'ZERO':
        return initialState
    }
    newState.average = keskiarvo(newState)
    newState.oks = positiivisia(newState)
    console.log(newState)
    return newState
}
const keskiarvo = (state) => {
    let yhteensä = state.good + state.bad + state.ok;
    if (yhteensä === 0) {
        return 0;
    };
    return (state.good + state.bad) / yhteensä;
}
const positiivisia = (state) => {
    let yhteensä = state.good + state.bad + state.ok;
    if (yhteensä === 0) {
        return 0;
    };
    return state.good / yhteensä * 100;
}

export default counterReducer