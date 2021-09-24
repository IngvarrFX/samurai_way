const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_TOTAL_USERS = 'SET_TOTAL_USERS'
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
    totalUsers: number
    count: number
    currentPage: number
}


const initialState: InitialStateType = {
    users: [],
    count: 5,
    totalUsers: 0,
    currentPage: 1,
}


type ActionType = FollowACType
    | unfollowACType
    | SetUsersACType
    | SetTotalUsersACType
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
        case SET_TOTAL_USERS: {
            return {...state, totalUsers: action.totalUsers}
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