import {applyMiddleware, combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogsReducer";
import {messageReducer} from "./messageReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from 'redux-thunk'


let rootReducer = combineReducers({
    profilePage : dialogsReducer,
    dialogsPage : messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export type ReducersType = typeof rootReducer
export type AppStateType = ReturnType<ReducersType>



export let store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store