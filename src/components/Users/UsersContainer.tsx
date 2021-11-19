import React, {ComponentType} from "react"
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {folowThunk, requestUsersThunk, toggleIsFetchingAC, unfolowThunk, UserType} from "../../redux/usersReducer";
import {compose} from "redux";
import {Users} from "./Users";
import {Preloader} from "../../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCount,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getTotalUsers,
    getUsers
} from "../../redux/users-selectors";


type MapStateToPropsType = {
    users: UserType[]
    totalUsers: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleIsFollowing: (isFetching: boolean, id: number) => void
    getUsers: (currentPage: number, count: number) => void
}

type OwnPropsType = {}

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }


    onSetPage = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }


    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={this.props.users}
                    usersOnPage={this.props.pageSize}
                    totalUsers={this.props.totalUsers}
                    currentPage={this.props.currentPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onSetPage={this.onSetPage}
                    followingInProgress={this.props.followingInProgress}
                    toggleIsFollowing={this.props.toggleIsFollowing}
                />
            </>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


// let wAR = withAuthRedirect(UsersContainer)

export default compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow: folowThunk,
    unfollow: unfolowThunk,
    toggleIsFollowing: toggleIsFetchingAC,
    getUsers: requestUsersThunk
}),withAuthRedirect)(UsersContainer)