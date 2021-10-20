import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messageReducer} from "./messageReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from 'redux-thunk'


let rootReducer = combineReducers({
    profilePage : profileReducer,
    dialogsPage : messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export type ReducersType = typeof rootReducer
export type AppStateType = ReturnType<ReducersType>



export let store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store