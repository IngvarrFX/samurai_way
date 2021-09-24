import React from "react";
import "./App.css";
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainerComponent} from "./components/Users/UsersContainer";


const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile" render={() => <Profile/>}/>
                    <Route path="/users" render={() => <UsersContainerComponent/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

