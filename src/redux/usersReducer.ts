import {userAPI} from "../api/api";
import {AppThunk} from "./reduxStore";
import {setProfileAC} from "./messageReducer";
import {Dispatch} from "redux";
import {ActionTypes} from "redux-form";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_TOTAL_USERS = "SET_TOTAL_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS"


export type UserType = {
    id: number
    firstName?: string
    name: string
    status: string
    followed: boolean
    location: { country: string, city: string }
    photoUser?: string
    photos: {
        small: string,
        large: string
    }
}


export type InitialStateType = {
    users: Array<UserType>
    totalUsers: number
    count: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}


const initialState: InitialStateType = {
    users: [],
    count: 100,
    totalUsers: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [2, 3]
}


export type UserActionType = FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetTotalUsersACType
    | SetCurrentPageACType
    | ToggleIsFetchingACType
    | ToggleIsFollowingACType

export const usersReducer = (state: InitialStateType = initialState, action: UserActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_TOTAL_USERS: {
            return {...state, totalUsers: action.totalUsers}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        }
        default:
            return state
    }

}


type FollowACType = {
    type: typeof FOLLOW
    userId: number
}

export const followAC = (userId: number): FollowACType => ({type: FOLLOW, userId})


type UnfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (userId: number): UnfollowACType => ({type: UNFOLLOW, userId})


type SetUsersACType = {
    type: typeof SET_USERS
    users: UserType[]
}
export const setUsersAC = (users: UserType[]): SetUsersACType => ({type: SET_USERS, users})


type SetTotalUsersACType = {
    type: typeof SET_TOTAL_USERS
    totalUsers: number
}
export const setTotalUsersAC = (totalUsers: number): SetTotalUsersACType => ({type: SET_TOTAL_USERS, totalUsers})


type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage})


export type ToggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingACType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})


type ToggleIsFollowingACType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    id: number
}
export const toggleIsFollowingAC = (isFetching: boolean, id: number): ToggleIsFollowingACType => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching,
    id
})


// export type ThunkActionType = ThunkAction<void, AppStateType, unknown, AppActionsType>
// type DispatchType = ThunkDispatch<InitialStateType, undefined, AnyAction>


export const requestUsersThunk = (currentPage: number, count: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(currentPage))
    const data = await userAPI.getUsers(currentPage, count)
    try {
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersAC(data.totalCount))
        dispatch(toggleIsFetchingAC(false))
    } catch (error) {
        console.log(error)
    }


}


const followUnfollow = async (dispatch: Dispatch, userID: number, APIMethod: any, actionCreator: (userID: number) => FollowACType | UnfollowACType) => {
    dispatch(toggleIsFollowingAC(true, userID))
    const data = await APIMethod(userID)
    try {
        if (data.resultCode === 0) {
            dispatch(actionCreator(userID))
        }
        dispatch(toggleIsFollowingAC(false, userID))
    } catch (error) {
        console.log(error)
    }
}

export const unfolowThunk = (userID: number): AppThunk => async (dispatch) => {
    followUnfollow(dispatch, userID, userAPI.unFollowed.bind(userAPI), unfollowAC)
}


export const folowThunk = (userID: number): AppThunk => async (dispatch) => {
    followUnfollow(dispatch, userID, userAPI.followed.bind(userAPI), followAC)
}


export const getProfileThunk = (userID: string): AppThunk => async (dispatch) => {

    const response = await userAPI.getProfile(userID)
    try {
        dispatch(setProfileAC(response.data))
    } catch (error) {
        console.log(error)
    }

}



