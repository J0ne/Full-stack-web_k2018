import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe.only('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0,
        average: 0,
        oks: 0
    }

    it('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    it('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            average: 1,
            good: 1,
            ok: 0,
            oks: 100,
            bad: 0
        })
    })
    it('average and oks is counted', () => {
        let action = {
            type: 'GOOD'
        }
        let state = initialState

        deepFreeze(state)
        let newState = counterReducer(state, action)
        expect(newState).toEqual({
            average: 1,
            good: 1,
            ok: 0,
            oks: 100,
            bad: 0
        })
        action = {
            type: 'BAD'
        }
        deepFreeze(newState)
        newState = counterReducer(newState, action)
        expect(newState).toEqual({
            average: 1,
            good: 1,
            ok: 0,
            oks: 50,
            bad: 1
        })
    })
})