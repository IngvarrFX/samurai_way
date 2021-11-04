import {authAPI, loginAPI} from "../api/api";
import {toggleIsFetchingAC} from "./usersReducer";
import {AppThunk} from "./reduxStore";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA"
const SET_USER_PROFILE_DATA = "SET_USER_PROFILE_DATA"

type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    user: UserType | null,
    error: string
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
    error: ''
}

export type AuthActionType = SetUserDataACType | SetUserProfileDataACType

export const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case SET_USER_PROFILE_DATA: {
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
    payload: {
        userID: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
export const setUserDataAC = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataACType => ({
    type: SET_USER_DATA,
    payload: {
        userID,
        email,
        login,
        isAuth
    }

})

type SetUserProfileDataACType = {
    type: typeof SET_USER_PROFILE_DATA
    profileData: UserType
}
export const setUserProfileDataAC = (profileData: UserType): SetUserProfileDataACType => ({
    type: SET_USER_PROFILE_DATA,
    profileData
})


// export type ThunkActionType = ThunkAction<void, AppStateType, unknown, AppActionsType>
// type DispatchType = ThunkDispatch<InitialStateType, undefined, AnyAction>

export const getUserDataThunk = (): AppThunk => async dispatch => {
    dispatch(toggleIsFetchingAC(true))
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        let {id, email, login} = res.data.data
        dispatch(setUserDataAC(id, email, login, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => async dispatch => {
    const res = await loginAPI.login(email, password, rememberMe)
    if (res.data.resultCode === 0) {
        dispatch(getUserDataThunk())
    }else{
        dispatch(stopSubmit("form",{_error: res.data.messages[0]}))
    }
}


export const logOutTC = (): AppThunk => async dispatch => {
    const res = await loginAPI.logOut()
    if (res.data.resultCode === 0) {
        dispatch(setUserDataAC(null, null, null, false))
    }
}