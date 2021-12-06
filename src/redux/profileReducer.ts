import {FormAction, stopSubmit} from "redux-form";
import {v1} from "uuid";
import {profileDataAPI, ProfileDataType, profileStatusAPI} from "../api/api";
import {AppActionsType, AppStateType, AppThunk} from "./reduxStore";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";


const ADD_POST = "ADD-POST"
const DELETE_POST = "DELETE_POST"
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS"
const SET_PHOTO = "SET_PHOTO"
const SET_PROFILE = "SET_PROFILE"
const SET_ERROR = "SET_ERROR"


const initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: "Hello my friend!", likesCount: 22},
        {id: v1(), message: "Hello samurai!", likesCount: 12},
        {id: v1(), message: "You are the best!", likesCount: 24},
        {id: v1(), message: "Good night!", likesCount: 15},
    ],
    profile: null as ProfileInfoType | null,
    status: "",
    errorUpdate: null as null | string,
}


export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            return {
                ...state, postsData: [{
                    id: v1(),
                    message: action.value,
                    likesCount: 0
                }, ...state.postsData,

                ]
            }
        }
        case "DELETE_POST": {
            return {...state, postsData: state.postsData.filter(p => p.id !== action.postId)}
        }
        case SET_PROFILE_STATUS: {
            return {...state, status: action.status}
        }
        case SET_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_PHOTO: {
            //@ts-ignore
            return {...state, profile: {...state.profile, photos: action.photo}}
        }
        case SET_ERROR: {
            return {...state, errorUpdate: action.error}
        }
        default:
            return state
    }
}

//actions
export const addPostActionCreator = (value: string): AddPostActionCreatorType => ({type: ADD_POST, value})

export const deletePostActionCreator = (postId: string): DeletePostActionCreatorType => ({type: DELETE_POST, postId})

export const setProfileStatusActionCreator = (status: string): SetProfileStatusActionCreatorType => ({
    type: SET_PROFILE_STATUS,
    status
})

export const setPhotoActionCreator = (photo: PhotosType): SetPhotoActionCreatorType => ({type: SET_PHOTO, photo})

export const setProfileAC = (profile: ProfileInfoType): SetProfileACType => ({type: SET_PROFILE, profile} as const)

export const setErrorAC = (error: string): SetErrorACType => ({type: SET_ERROR, error} as const)


// export type ThunkActionType = ThunkAction<void, AppStateType, unknown, AppActionsType>
// type DispatchType = ThunkDispatch<InitialStateType, undefined, AnyAction>


//thunks
export const getProfileStatusThunkCr = (userID: number): AppThunk => async (dispatch) => {
    const res = await profileStatusAPI.getProfileStatus(userID)
    try {
        dispatch(setProfileStatusActionCreator(res.data))
    } catch (error) {
        console.log(error)
    }

}

export const updateProfileStatusThunkCr = (status: string): AppThunk => async dispatch => {
    const res = await profileStatusAPI.updateProfileStatus(status)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setProfileStatusActionCreator(status))
        }
    } catch (error) {
        console.log(error)
    }
}

export const savePhotoSuccessThunkCr = (photo: File): AppThunk => async dispatch => {
    const res = await profileStatusAPI.savePhoto(photo)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setPhotoActionCreator(res.data.data.photos))
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateProfileDataThunkCr = (dataProfile: ProfileDataType): ProfileThunk => async (dispatch, getState) => {
    const userId = getState().auth.userID
    const res = await profileDataAPI.updateProfileData(dataProfile!)

    if (res.data.resultCode === 0) {
        if (userId) {
            dispatch(getProfileThunk(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("profileForm", {_error: res.data.messages[0]}))
        dispatch(setErrorAC(res.data.messages[0]))
        return Promise.reject(res.data.messages[0])
    }
}

export const getProfileThunk = (userID: number): AppThunk => async (dispatch) => {
    //const res = await userAPI.getProfile(userID)
    const res = await profileStatusAPI.getProfile(userID)
    try {
        dispatch(setProfileAC(res.data))
    } catch (error) {
        console.log(error)
    }
}


//types

type SetErrorACType = {
    type: typeof SET_ERROR
    error: string
}

type SetProfileACType = {
    type: typeof SET_PROFILE
    profile: ProfileInfoType
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    value: string
}
type DeletePostActionCreatorType = {
    type: typeof DELETE_POST
    postId: string
}
type SetProfileStatusActionCreatorType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
type SetPhotoActionCreatorType = {
    type: typeof SET_PHOTO
    photo: PhotosType
}


export type ProfileActionType =
    AddPostActionCreatorType
    | SetProfileStatusActionCreatorType
    | DeletePostActionCreatorType
    | SetPhotoActionCreatorType
    | SetProfileACType
    | SetErrorACType


export type PostDataType = {
    id: string
    message: string
    likesCount: number
}


export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}


export type ProfileInfoType = {
    userId: string
    aboutMe: ""
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    errors: string
}


export type ProfileType = {
    id: number
    firstName?: string
    name: string
    status: string
    followed: boolean
    location: { country: string, city: string }
    photoUser?: string
    photos: PhotosType
}


type PhotosType = {
    small: string | null,
    large: string | null
}

export type ProfilePageType = {
    postsData: Array<PostDataType>
    profile: ProfileInfoType | null
    status: string
    errorUpdate: null | string
}


//type ProfileThunkType = AppThunk<ProfileActionType | FormAction>
export type ProfileThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ProfileActionType | FormAction>
