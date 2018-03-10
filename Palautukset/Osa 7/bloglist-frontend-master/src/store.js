import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
// import filterReducer from './reducers/filterReducer'
// import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer
})
console.log("STORE!")
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store