import React, {ComponentType} from "react";
import {Header} from "./Header";
import {AppStateType} from "../../redux/reduxStore";
import {compose} from "redux";
import {getUserDataThunk} from "../../redux/authReducer";
import {connect} from "react-redux";


type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
    photoProfile: string | null | undefined
}
type MapDispatchToPropsType = {
    setUserData: () => void
}


type OwnPropsType = {}

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class HeaderContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.setUserData()
    }

    render() {
        return (
            <Header login={this.props.login}
                    isAuth={this.props.isAuth}
                    profilePhoto={this.props.photoProfile}
            />
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        photoProfile: state.auth.user?.photos.small
    }
}


export default compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    setUserData: getUserDataThunk,
}))(HeaderContainer)