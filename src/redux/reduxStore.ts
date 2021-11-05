import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionType, profileReducer} from "./profileReducer";
import {MessageActionType, messageReducer} from "./messageReducer";
import {UserActionType, usersReducer} from "./usersReducer";
import {AuthActionType, authReducer} from "./authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import {FormAction, reducer as formReducer} from "redux-form";
import {appReducer} from "./app-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type ReducersType = typeof rootReducer
export type AppStateType = ReturnType<ReducersType>

export type AppActionsType = AuthActionType | MessageActionType | ProfileActionType | UserActionType | FormAction


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store


