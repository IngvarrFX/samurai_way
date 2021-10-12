import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {ProfileType} from "../../redux/messageReducer";
import {AppStateType} from "../../redux/reduxStore";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router";
import {setProfileThunk} from "../../redux/usersReducer";


type PathParamsType = {
    userId: string
}


type PropsType = RouteComponentProps<PathParamsType>

type MapStateToPropsType = {
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    setProfile: (userID: string) => void
}

type OwnProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & PropsType & OwnPropsType

type OwnPropsType = {}

class ProfileContainer extends React.Component<OwnProfileContainerPropsType> {
    componentDidMount() {
        this.props.setProfile(this.props.match.params.userId)
    }

    render() {
        return (
            <><Profile profile={this.props.profile}/> </>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
            profile: state.dialogsPage.profile
        }

}


let WithUrlDataContainerComponent =   withRouter(ProfileContainer)


export default compose( connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    setProfile: setProfileThunk
})(WithUrlDataContainerComponent))