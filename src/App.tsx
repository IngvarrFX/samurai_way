import React, {ComponentType} from "react";
import "./App.css";
import {NavBar} from "./components/NavBar/NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainerComponent from "./components/Users/UsersContainer";
import ProfileContainerComponent from "./components/Profile/ProfileContainer";
import HeaderContainerComponent from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "./redux/reduxStore";
import {initializeApp} from "./redux/app-reducer";
import {withRouter} from "react-router";
import {Preloader} from "./common/preloader/Preloader";


type MapDispatchToPropsType = {
    initializedApp: () => void
}

type OwnPropsType = {}

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if(!this.props.isInitialize){
            return <Preloader/>
        }
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
}

type MapStateToPropsType = {
    isInitialize: boolean
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isInitialize: state.app.initialized
    }

}

export default compose<ComponentType>(withRouter, connect(mapStateToProps, {
    initializedApp: initializeApp
}))(App)

