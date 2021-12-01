import React, {ComponentType} from "react";
import "./App.css";
import {NavBar} from "./components/NavBar/NavBar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import HeaderContainerComponent from "./components/Header/HeaderContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "./redux/reduxStore";
import {initializeApp} from "./redux/app-reducer";
import {withRouter} from "react-router";
import {Preloader} from "./common/preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainerComponent = React.lazy(() => import("./components/Users/UsersContainer"));
const ProfileContainerComponent = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));


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
        if (!this.props.isInitialize) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainerComponent/>
                    <NavBar/>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                            <Route path="/profile/:userId?" render={withSuspense(ProfileContainerComponent)}/>
                            <Route path="/users" render={withSuspense(UsersContainerComponent)}/>
                            <Route path="/login" render={withSuspense(Login)}/>
                            <Route path="*" render={() => <h1>404 Page not found</h1>}/>
                        </Switch>
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

