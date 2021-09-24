import React from "react"
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {followAC, setCurrentPageAC, setTotalCountAC, setUsersAC, unfollowAC, UserType} from "../../redux/usersReducer";
import {Dispatch} from "redux";
import axios from "axios";
import {Users} from "./Users";


type UsersContainerPropsType = {
    users: UserType[]
    pageCount: number
    totalCount: number
    currentPage: number
    count: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number)=> void
}


class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.count}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalCount(response.data.totalCount)
        })
    }


    onSetPage = (pageNumber: number) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.count}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setCurrentPage(pageNumber)
        })
    }


    render() {

        /*
                let pagesC = Math.ceil(this.props.totalCount / this.props.pageCount)
                let pages = []
                for (let i = 1; i <= pagesC; i++) {
                    pages.push(i)
                }*/
        return (
            <Users
                users={this.props.users}
                pageCount={this.props.pageCount}
                totalCount={this.props.totalCount}
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
    pageCount: number
    totalCount: number
    currentPage: number
    count: number
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageCount: state.usersPage.pageCount,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        count: state.usersPage.count,
    }
}

type MapDispatchToPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
    setTotalCount: (totalCount: number) => void
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
        setTotalCount: (totalCount: number) => {
            dispatch(setTotalCountAC(totalCount))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
    }
}

export const UsersContainerComponent = connect(mapStateToProps, mapDispatchToProps)(UsersContainer)