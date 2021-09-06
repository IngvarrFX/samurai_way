import {combineReducers, createStore} from 'redux';
import {dialogsReducer} from './dialogsReducer';
import {messageReducer} from './messageReducer';



let reducers = combineReducers({
    profilePage : dialogsReducer,
    dialogsPage : messageReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>



export let store = createStore(reducers);

