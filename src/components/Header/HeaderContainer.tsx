import React from "react";
import {Header} from "./Header";
import {AppStateType} from "../../redux/reduxStore";
import {Dispatch} from "redux";
import {setUserDataAC, setUserProfileDataAC, UserType} from "../../redux/authReducer";
import axios from "axios";
import {connect} from "react-redux";


type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
    photoProfile: string | null | undefined
}
type MapDispatchToPropsType = {
    setUserData: (userId: number, email: string, login: string) => void
    setUserProfileData: (profileData: UserType) => void
}
type OwnPropsType = {}

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class HeaderContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then((response) => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setUserData(id, email, login)
                }
                return response.data.data.id

            })
            .then((id) => {
                axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
                    .then((response) => {
                        this.props.setUserProfileData(response.data.data)
                    })
            })

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

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setUserData: (userId: number, email: string, login: string) => {
            dispatch(setUserDataAC(userId, email, login))
        },
        setUserProfileData: (profileData: UserType) => {
            dispatch(setUserProfileDataAC(profileData))
        },

    }
}

export const HeaderContainerComponent = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer)