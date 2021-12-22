import {applyMiddleware, combineReducers, compose, createStore, Action} from "redux";
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

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

export type AppDispatch = typeof store.dispatch
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers (applyMiddleware (thunkMiddleware) ))
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store


