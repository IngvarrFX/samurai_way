import React from 'react'
import {connect} from 'react-redux';
import UsersC from './UsersC';
import {AppStateType} from '../../redux/reduxStore';
import {followAC, setTotalCountAC, setUsersAC, setCurrentPageAC, unfollowAC, UserType} from '../../redux/usersReducer';
import {Dispatch} from 'redux';


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

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)