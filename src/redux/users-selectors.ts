import {AppStateType} from "./reduxStore";
import {UserType} from "./usersReducer";
import {createSelector} from "reselect";

const getUsersSelector = (state: AppStateType):UserType[]=>{
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, (users)=>{
    return users
})


export const getTotalUsers = (state: AppStateType):number => {
    return state.usersPage.totalUsers
}


export const getCurrentPage = (state:AppStateType):number => {
    return state.usersPage.currentPage
}


export const getCount = (state:AppStateType):number => {
    return state.usersPage.usersOnPage
}

export const getIsFetching = (state: AppStateType): boolean=> {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType):Array<number> =>{
    return state.usersPage.followingInProgress
}