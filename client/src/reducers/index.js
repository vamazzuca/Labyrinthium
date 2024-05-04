import { combineReducers } from 'redux'

import authReducer from './auth'
import userReducer from './user'
import roomReducer from './room'


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    room: roomReducer,
})