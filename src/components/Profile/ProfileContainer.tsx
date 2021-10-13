import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {ProfileType} from "../../redux/messageReducer";
import {AppStateType} from "../../redux/reduxStore";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router";
import {getProfileThunk} from "../../redux/usersReducer";
import {Redirect} from "react-router-dom";


type PathParamsType = {
    userId: string
}


type PropsType = RouteComponentProps<PathParamsType>

type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userID: string) => void
}

type OwnProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & PropsType & OwnPropsType

type OwnPropsType = {}

class ProfileContainer extends React.Component<OwnProfileContainerPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) userId =`19523`
        this.props.getUserProfile(userId)
    }

    render() {
        if(!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <><Profile profile={this.props.profile}/> </>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
            profile: state.dialogsPage.profile,
        isAuth: state.auth.isAuth
        }

}


let WithUrlDataContainerComponent =   withRouter(ProfileContainer)


export default compose( connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    getUserProfile: getProfileThunk
})(WithUrlDataContainerComponent))