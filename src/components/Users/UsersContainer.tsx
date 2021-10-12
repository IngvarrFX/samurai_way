import React from "react"
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {folowThunk, getUsersThunk, toggleIsFetchingAC, unfolowThunk, UserType} from "../../redux/usersReducer";
import {compose} from "redux";
import {Users} from "./Users";
import {Preloader} from "../../common/preloader/Preloader";


type MapStateToPropsType = {
    users: UserType[]
    totalUsers: number
    currentPage: number
    count: number
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

        this.props.getUsers(this.props.currentPage, this.props.count)
    }


    onSetPage = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.count)
    }


    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={this.props.users}
                    count={this.props.count}
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
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        count: state.usersPage.count,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             // @ts-ignore
//
//             dispatch(folowThunk(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         toggleIsFollowing: (isFetching: boolean, id: number) => {
//             dispatch(toggleIsFollowingAC(isFetching, id))
//         },
//         getUsers: (currentPage: number, count: number) => {
//             // @ts-ignore
//             dispatch(getUsersThunk(currentPage, count))
//         }
//     }
// }


export default compose(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow: folowThunk,
    unfollow: unfolowThunk,
    toggleIsFollowing: toggleIsFetchingAC,
    getUsers: getUsersThunk
}))(UsersContainer)