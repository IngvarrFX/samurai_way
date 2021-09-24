import {combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogsReducer";
import {messageReducer} from "./messageReducer";
import {usersReducer} from "./usersReducer";


let rootReducer = combineReducers({
    profilePage : dialogsReducer,
    dialogsPage : messageReducer,
    usersPage: usersReducer
})

export type ReducersType = typeof rootReducer
export type AppStateType = ReturnType<ReducersType>



export let store = createStore(rootReducer);

