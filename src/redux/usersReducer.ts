import {v1} from "uuid";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
export type UserType = {
    id: string
    firstName?: string
    name: string
    status: string
    follow: boolean
    location: { country: string, city: string }
    photoUser?: string
    photos: { small: string,
        large: string }
}

export type InitialStateType = {
    users: Array<UserType>
}


const initialState: InitialStateType = {
    users: [
        // {
        //     id: v1(),
        //     firstName: 'Ingvarr',
        //     status: '"I am a boss"',
        //     follow: true,
        //     location: {country: "Canada", city: "Toronto"},
        //     photoUser: 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'
        // },
        // {
        //     id: v1(),
        //     firstName: 'Oxi',
        //     status: '"I am a boss too"',
        //     follow: true,
        //     location: {country: "Canada", city: "Toronto"},
        //     photoUser: 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'
        //
        // },
        // {
        //     id: v1(),
        //     firstName: 'Andrew',
        //     status: '"I am a not boss"',
        //     follow: false,
        //     location: {country: "Russia", city: "Astrahan"},
        //     photoUser:'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'
        //
        // },
        // {
        //     id: v1(),
        //     firstName: 'Ando',
        //     status: '"I am a traner"',
        //     follow: false,
        //     location: {country: "Russia", city: "Vladimir"},
        //     photoUser: 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'
        //
        // },
    ]
}


type ActionType = FollowACType | unfollowACType | SetUsersACType

export const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, follow: true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, follow: false} : u)}
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
    }
    return state
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


