import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {NavBar} from './components/NavBar/NavBar';
import {Profile} from './components/Profile/Profile';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    StateType,
    StoreType,
} from './redux/state';
import {store} from './redux/reduxStore';
import {Store} from 'redux';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';


/*type AppPropsType = {
    state: StateType
    store: Store
}*/

const App = () => {
    //const state: StateType = props.state
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile" render={() => <Profile/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

