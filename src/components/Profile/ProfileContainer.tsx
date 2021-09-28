import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ProfileUserType, setProfileAC} from "../../redux/messageReducer";
import {AppStateType} from "../../redux/reduxStore";
import axios from "axios";
import {Profile} from "./Profile";


type MapStateToPropsType = {
    profile: ProfileUserType
}

type MapDispatchToPropsType = {
    setProfile: (profile: ProfileUserType) => void
}

type OwnProfileContainerPropsType = {}


type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            console.log(response.data)
            this.props.setProfile(response.data)
        })
    }

    render() {
        return (
            <><Profile profile={this.props.profile}/> </>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return (
        {profile: state.dialogsPage.profile}
    )
}


const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setProfile: (profile: ProfileUserType) => {
            dispatch(setProfileAC(profile))
        }
    }
}

export const ProfileContainerComponent = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)