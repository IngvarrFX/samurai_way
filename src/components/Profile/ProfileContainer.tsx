import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ProfileType, setProfileAC} from "../../redux/messageReducer";
import {AppStateType} from "../../redux/reduxStore";
import axios from "axios";
import {Profile} from "./Profile";
import { withRouter,RouteComponentProps } from "react-router";



type PathParamsType = {
    userId: string
}


type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

type MapStateToPropsType = {
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    setProfile: (profile: ProfileType) => void
}

type OwnProfileContainerPropsType = {}


type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) userId =`2`
        console.log(userId)
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
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
        setProfile: (profile: ProfileType) => {
            dispatch(setProfileAC(profile))
        }
    }
}

let WithUrlDataContainerComponent =   withRouter(ProfileContainer)


export const ProfileContainerComponent = connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent)