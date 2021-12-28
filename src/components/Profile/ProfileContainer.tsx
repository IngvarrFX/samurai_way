import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router";

import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getProfileStatusThunkCr,
    getProfileThunk,
    savePhotoSuccessThunkCr,
    updateProfileDataThunkCr,
    updateProfileStatusThunkCr
} from "../../redux/profileReducer";
import {ProfileDataType} from "../../api/api";


type PathParamsType = {
    userId: string
}


type PropsType = RouteComponentProps<PathParamsType>

type MapStateToPropsType = ReturnType<typeof mapStateToProps>


type MapDispatchToPropsType = {
    getUserProfile: (userID: number) => void
    getProfileStatus: (userID: number) => void
    updateProfileStatus: (status: string) => void
    savePhoto: (file: File) => void
    updateProfileData: (data: ProfileDataType) => Promise<any>
}


type OwnProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & PropsType & OwnPropsType

type OwnPropsType = {}

class ProfileContainer extends React.Component<OwnProfileContainerPropsType> {
    constructor(props: OwnProfileContainerPropsType) {
        super(props);
    }

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getProfileStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()


    }

    componentDidUpdate(prevProps: OwnProfileContainerPropsType, prevState: OwnProfileContainerPropsType) {
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
                updateProfileData={this.props.updateProfileData}
                updateProfileStatus={this.props.updateProfileStatus}/> </>
        )
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userID: state.auth.userID,
        authorizedUserId: state.auth.userID
    }

}


const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return (
        {
            getUserProfile: (userID: number) => {
                dispatch(getProfileThunk(userID))
            },
            getProfileStatus: (userID: number) => {
                dispatch(getProfileStatusThunkCr(userID))
            },
            updateProfileStatus: (status: string) => {
                dispatch(updateProfileStatusThunkCr(status))
            },
            savePhoto: (file: File) => {
                dispatch(savePhotoSuccessThunkCr(file))
            },
            updateProfileData: (data: ProfileDataType) => {
                return dispatch(updateProfileDataThunkCr(data))
            },
        }

    )
}

export default compose<React.ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps), withRouter, withAuthRedirect)(ProfileContainer)


/*{
    getUserProfile: getProfileThunk,
    getProfileStatus: getProfileStatusThunkCr,
    updateProfileStatus: updateProfileStatusThunkCr,
    savePhoto: savePhotoSuccessThunkCr,
    updateProfileData: updateProfileDataThunkCr,
}*/
