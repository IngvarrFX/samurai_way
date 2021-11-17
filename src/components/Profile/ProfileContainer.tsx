import React, {ComponentType} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {ProfileType} from "../../redux/messageReducer";
import {AppStateType} from "../../redux/reduxStore";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router";
import {getProfileThunk} from "../../redux/usersReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getProfileStatusThunkCr, updateProfileStatusThunkCr} from "../../redux/profileReducer";


type PathParamsType = {
    userId: string
}


type PropsType = RouteComponentProps<PathParamsType>

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    userID: number | null
}

type MapDispatchToPropsType = {
    getUserProfile: (userID: string) => void
    getProfileStatus: (status: string) => void
    updateProfileStatus: (status: string) => void
}

type OwnProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & PropsType & OwnPropsType

type OwnPropsType = {}

class ProfileContainer extends React.Component<OwnProfileContainerPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            debugger
            //userId = '19523'
            if(this.props.userID){
                userId = this.props.userID.toString()
            }
                if (!userId) {
                    this.props.history.push("/login")


            }
        }
        this.props.getUserProfile(userId)
        this.props.getProfileStatus(userId)


    }

    // componentDidUpdate(prevProps: Readonly<OwnProfileContainerPropsType>) {
    //     if (prevProps !== this.props) {
    //         if (this.props.profile !== null) {
    //             let userId = this.props.profile.userId
    //             this.props.getProfileStatus(userId)
    //         }
    //
    //     }
    // }

    render() {
        return (
            <><Profile profile={this.props.profile} status={this.props.status}
                       updateProfileStatus={this.props.updateProfileStatus}/> </>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.dialogsPage.profile,
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
    updateProfileStatus: updateProfileStatusThunkCr
}), withRouter, withAuthRedirect)(ProfileContainer)