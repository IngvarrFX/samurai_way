import React from "react";
import "./App.css";
import {NavBar} from "./components/NavBar/NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainerComponent from "./components/Users/UsersContainer";
import ProfileContainerComponent from "./components/Profile/ProfileContainer";
import HeaderContainerComponent from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";


const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainerComponent/>
                <NavBar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile/:userId?" render={() => <ProfileContainerComponent/>}/>
                    <Route path="/users" render={() => <UsersContainerComponent/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

