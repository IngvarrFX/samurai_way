import {authAPI, loginAPI, securityAPI} from "../api/api";
import {toggleIsFetchingAC, ToggleIsFetchingACType} from "./usersReducer";
import {AppThunk} from "./reduxStore";
import {stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {FormAction} from "redux-form/lib/actions";

const SET_USER_DATA = "SET_USER_DATA"
const SET_USER_PROFILE_DATA = "SET_USER_PROFILE_DATA"
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL"


const initialState = {
    userID: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    user: null as UserType | null,
    error: "",
    captchaUrl: null as string | null,
}
type InitialStateType = typeof initialState


export const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userID: action.payload.userID,
                email: action.payload.email,
                isAuth: action.payload.isAuth,
                login: action.payload.login
            }
        }
        case SET_USER_PROFILE_DATA: {
            return {
                ...state, user: action.profileData
            }
        }
        case SET_CAPTCHA_URL: {
            return {...state, captchaUrl: action.captchaUrl}
        }
        default:
            return state
    }
}


//actions
export const setUserDataAC = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataACType => ({
    type: SET_USER_DATA,
    payload: {userID, email, login, isAuth}
})


export const setUserProfileDataAC = (profileData: UserType): SetUserProfileDataACType => ({
    type: SET_USER_PROFILE_DATA,
    profileData
})
export const setCaptchaUrlAC = (captchaUrl: string): SetCapchaUrlACType => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
})


// export type ThunkActionType = ThunkAction<void, AppStateType, unknown, AppActionsType>
// type DispatchType = ThunkDispatch<InitialStateType, undefined, AnyAction>


//thunks
export const getUserDataThunk = () => async (dispatch: ThunkDispatch<Promise<string | void>, unknown, AuthActionType>) => {
    dispatch(toggleIsFetchingAC(true))
    // const res = await authAPI.me()
    // if (res.data.resultCode === 0) {
    //     let {id, email, login} = res.data.data
    //     dispatch(setUserDataAC(id, email, login, true))
    // }
    let res = await authAPI.me()
    try {
        if (res.data.resultCode === 0) {
            const {id, email, login} = res.data.data
            dispatch(setUserDataAC(id, email, login, true))
        }
        return res
    } catch (error) {
        console.log(error)
    }

}


export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: ThunkDispatch<Promise<string | void>, unknown, AuthActionType | FormAction>) => {
    const res = await loginAPI.login(email, password, rememberMe, captcha)
    try {
        if (res.data.resultCode === 0) {
            dispatch(getUserDataThunk())
        } else {
            if (res.data.resultCode === 10) {
                dispatch(getCaptchaTC())
            }
            dispatch(stopSubmit("form", {_error: res.data.messages[0]}))
        }
    } catch (error) {
        console.log(error)
    }

}

export const getCaptchaTC = () => async (dispatch: ThunkDispatch<Promise<string | void>, unknown, AuthActionType | FormAction>) => {
    const res = await securityAPI.getCapcha()
    try {
        const captchaUrl = res.data.url
        dispatch(setCaptchaUrlAC(captchaUrl))
    } catch (error) {
        console.log(error)
    }
}


export const logOutTC = (): AppThunk => async dispatch => {
    const res = await loginAPI.logOut()
    try {
        if (res.data.resultCode === 0) {
            dispatch(setUserDataAC(null, null, null, false))
        }
    } catch (error) {
        console.log(error)
    }

}


//types

// type InitialStateType = {
//     userID: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
//     user: UserType | null,
//     error: string
// }

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

export type AuthActionType = SetUserDataACType
    | SetUserProfileDataACType
    | ToggleIsFetchingACType
    | SetCapchaUrlACType


type SetUserDataActionPayloadType = {
    userID: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserDataACType = {
    type: typeof SET_USER_DATA
    payload: SetUserDataActionPayloadType
}


type SetUserProfileDataACType = {
    type: typeof SET_USER_PROFILE_DATA
    profileData: UserType
}
type SetCapchaUrlACType = {
    type: typeof SET_CAPTCHA_URL
    captchaUrl: string
}


//enums

