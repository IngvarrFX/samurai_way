import React from 'react'
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/reduxStore";
import {followAC, InitialStateType, setUsersAC, unFollowAC, UserType} from "../../redux/usersReducer";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    users: UserType[]
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

type MapDispatchToPropsType = {
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: any) => void
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: string) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: any) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)