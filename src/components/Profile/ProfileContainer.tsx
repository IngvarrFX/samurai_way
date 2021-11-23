import React, {ComponentType} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router";

import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getProfileStatusThunkCr,
    getProfileThunk,
    ProfileInfoType,
    savePhotoSuccessThunkCr,
    updateProfileStatusThunkCr
} from "../../redux/profileReducer";


type PathParamsType = {
    userId: string
}


type PropsType = RouteComponentProps<PathParamsType>

type MapStateToPropsType = {
    profile: ProfileInfoType | null
    status: string
    userID: number | null
}

type MapDispatchToPropsType = {
    getUserProfile: (userID: string) => void
    getProfileStatus: (status: string) => void
    updateProfileStatus: (status: string) => void
    savePhoto: (file: File)=> void
}

type OwnProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & PropsType & OwnPropsType

type OwnPropsType = {}

class ProfileContainer extends React.Component<OwnProfileContainerPropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            //userId = '19523'
            if (this.props.userID) {
                userId = this.props.userID.toString()
            }
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getProfileStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()


    }

    componentDidUpdate(prevProps: Readonly<OwnProfileContainerPropsType>) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <><Profile
                profile={this.props.profile}
                status={this.props.status}
                isOwnPhoto={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto}
                updateProfileStatus={this.props.updateProfileStatus}/> </>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userID: state.auth.userID
    }

}
// let WithAuthRedirectComponent = withAuthRedirect(ProfileContainer)
//
// let WithUrlDataContainerComponent = withRouter(WithAuthRedirectComponent)


export default compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    getUserProfile: getProfileThunk,
    getProfileStatus: getProfileStatusThunkCr,
    updateProfileStatus: updateProfileStatusThunkCr,
    savePhoto: savePhotoSuccessThunkCr
}), withRouter, withAuthRedirect)(ProfileContainer)


