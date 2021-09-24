import {v1} from 'uuid';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'


export type UserType = {
    id: string
    firstName?: string
    name: string
    status: string
    follow: boolean
    location: { country: string, city: string }
    photoUser?: string
    photos: {
        small: string,
        large: string
    }
}

export type InitialStateType = {
    users: Array<UserType>
    totalCount: number
    pageCount: number
    count: number
    currentPage: number
}


const initialState: InitialStateType = {
    users: [],
    pageCount: 5,
    count: 5,
    totalCount: 0,
    currentPage: 1,
}


type ActionType = FollowACType
    | unfollowACType
    | SetUsersACType
    | SetTotalCountACType
    | SetCurrentPageACType

export const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, follow: true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, follow: false} : u)}
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalCount: action.totalCount}
        }
        case SET_CURRENT_PAGE:{
            return{...state, currentPage: action.currentPage}
        }
        default: return state
    }

}


type FollowACType = {
    type: typeof FOLLOW
    userId: string
}

export const followAC = (userId: string): FollowACType => ({type: FOLLOW, userId})


type unfollowACType = {
    type: typeof UNFOLLOW
    userId: string
}
export const unfollowAC = (userId: string): unfollowACType => ({type: UNFOLLOW, userId})


type SetUsersACType = {
    type: typeof SET_USERS
    users: UserType[]
}
export const setUsersAC = (users: UserType[]): SetUsersACType => ({type: SET_USERS, users})


type SetTotalCountACType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalCountAC = (totalCount: number): SetTotalCountACType => ({type: SET_TOTAL_COUNT, totalCount})


type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage})