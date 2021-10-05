import React from "react"
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersAC,
    setUsersAC,
    toggleIsFetchingAC,
    toggleIsFollowingAC,
    unfollowAC,
    UserType
} from "../../redux/usersReducer";
import {Dispatch} from "redux";
import {Users} from "./Users";
import {Preloader} from "../../common/preloader/Preloader";
import {userAPI} from "../../api/api";


type MapStateToPropsType = {
    users: UserType[]
    totalUsers: number
    currentPage: number
    count: number
    isFetching: boolean
    followingInProgress:Array<number>
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setTotalUsers: (totalUsers: number) => void
    setCurrentPage: (currentPage: number) => void
    setIsFetching: (isFetching: boolean) => void
    toggleIsFollowing: (isFetching: boolean, id: number) => void
}

type OwnPropsType = {

}

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)
        userAPI.getUsers(this.props.currentPage,this.props.count)
            .then(data => {
            this.props.setUsers(data.items)
            this.props.setTotalUsers(data.totalCount)
            this.props.setIsFetching(false)
        })
    }


    onSetPage = (pageNumber: number) => {
        this.props.setIsFetching(true)
        userAPI.getUsers(pageNumber,this.props.count)
            .then(data => {
            this.props.setUsers(data.items)
            this.props.setCurrentPage(pageNumber)
            this.props.setIsFetching(false)
        })
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
        followingInProgress:state.usersPage.followingInProgress
    }
}





const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setTotalUsers: (totalUsers: number) => {
            dispatch(setTotalUsersAC(totalUsers))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        },
        toggleIsFollowing: (isFetching: boolean, id: number) => {
            dispatch(toggleIsFollowingAC(isFetching,id))
        },
    }
}


export const UsersContainerComponent = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,mapDispatchToProps)(UsersContainer)