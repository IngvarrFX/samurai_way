import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store} from './redux/reduxStore';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {StateType,  StoreType} from './redux/state';


let rerenderEntireTree = (state:StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                store={store}
                /*updatePostText={store.updateNewPostText.bind(store)}*/
            />
        </BrowserRouter>,
        document.getElementById('root')
    );
}


rerenderEntireTree(store.getState())

store.subscribe(() => rerenderEntireTree(store.getState()))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();