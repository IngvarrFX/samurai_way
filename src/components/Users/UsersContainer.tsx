import React from "react"
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {followAC, setCurrentPageAC, setTotalUsersAC, setUsersAC, unfollowAC, UserType} from "../../redux/usersReducer";
import {Dispatch} from "redux";
import axios from "axios";
import {Users} from "./Users";


type UsersContainerPropsType = {
    users: UserType[]
    totalUsers: number
    currentPage: number
    count: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setTotalUsers: (totalUsers: number) => void
    setCurrentPage: (currentPage: number)=> void
}


class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.count}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsers(response.data.totalCount)
        })
    }


    onSetPage = (pageNumber: number) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.count}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setCurrentPage(pageNumber)
        })
    }


    render() {
        return (
            <Users
                users={this.props.users}
                count={this.props.count}
                totalUsers={this.props.totalUsers}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onSetPage={this.onSetPage}
            />
        )
    }
}




type MapStateToPropsType = {
    users: UserType[]
    totalUsers: number
    currentPage: number
    count: number
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        count: state.usersPage.count,
    }
}

type MapDispatchToPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
    setTotalUsers: (totalUsers: number) => void
    setCurrentPage: (currentPage: number) => void
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: string) => {
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
    }
}

export const UsersContainerComponent = connect(mapStateToProps, mapDispatchToProps)(UsersContainer)