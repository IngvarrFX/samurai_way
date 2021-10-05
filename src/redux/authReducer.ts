const SET_USER_DATA = "SET_USER_DATA"
const SET_USER_PROFILE_DATA = "SET_USER_PROFILE_DATA"

type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    user: UserType | null,
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string | null
    large: string | null
}
export type UserType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType

} | null



const initialState: InitialStateType = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    user: null as UserType | null,
}

type ActionType = SetUserDataACType | SetUserProfileDataACType

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, id: action.userID, email: action.email, login: action.login, isAuth: true}
        }
        case SET_USER_PROFILE_DATA:{
            return {
                ...state, user: action.profileData
            }
        }
        default:
            return state
    }
}


type SetUserDataACType = {
    type: typeof SET_USER_DATA
    userID: number
    email: string
    login: string
}
export const setUserDataAC = (userID: number, email: string, login: string): SetUserDataACType => ({
    type: SET_USER_DATA,
    userID,
    email,
    login
})

type SetUserProfileDataACType = {
    type: typeof SET_USER_PROFILE_DATA
    profileData: UserType
}
export const setUserProfileDataAC = (profileData: UserType): SetUserProfileDataACType => ({
    type: SET_USER_PROFILE_DATA,
    profileData
})