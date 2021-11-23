import {v1} from "uuid";
import {profileStatusAPI, userAPI} from "../api/api";
import {AppThunk} from "./reduxStore";



const ADD_POST = "ADD-POST"
const DELETE_POST = "DELETE_POST"
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS"
const SET_PHOTO = "SET_PHOTO"
const SET_PROFILE = "SET_PROFILE"




const initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: "Hello my friend!", likesCount: 22},
        {id: v1(), message: "Hello samurai!", likesCount: 12},
        {id: v1(), message: "You are the best!", likesCount: 24},
        {id: v1(), message: "Good night!", likesCount: 15},
    ],
    profile: null as null | ProfileInfoType,
    status: ""
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

            debugger
            //@ts-ignore
            return {...state, profile: {...state.profile, photos: action.photo}}
        }
        default:
            return state
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    value: string
}
export const addPostActionCreator = (value: string): AddPostActionCreatorType => ({type: ADD_POST, value})

type DeletePostActionCreatorType = {
    type: typeof DELETE_POST
    postId: string
}
export const deletePostActionCreator = (postId: string): DeletePostActionCreatorType => ({type: DELETE_POST, postId})


type SetProfileStatusActionCreatorType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
export const setProfileStatusActionCreator = (status: string): SetProfileStatusActionCreatorType => (
    {type: SET_PROFILE_STATUS, status})


type SetPhotoActionCreatorType = {
    type: typeof SET_PHOTO
    photo: PhotosType
}
export const setPhotoActionCreator = (photo: PhotosType): SetPhotoActionCreatorType => ({type: SET_PHOTO, photo})


type SetProfileACType = {
    type: typeof SET_PROFILE
    profile: ProfileInfoType
}
export const setProfileAC = (profile: ProfileInfoType): SetProfileACType => (
    {type: SET_PROFILE, profile} as const
)

// export type ThunkActionType = ThunkAction<void, AppStateType, unknown, AppActionsType>
// type DispatchType = ThunkDispatch<InitialStateType, undefined, AnyAction>


//thunks
export const getProfileStatusThunkCr = (userID: string): AppThunk => async (dispatch) => {
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
    debugger
    try {
        if (res.data.resultCode === 0) {
            dispatch(setPhotoActionCreator(res.data.data.photos))
        }
    } catch (error) {
        console.log(error)
    }
}
export const getProfileThunk = (userID: string): AppThunk => async (dispatch) => {
    debugger
    const response = await userAPI.getProfile(userID)
    try {
        dispatch(setProfileAC(response.data))
    } catch (error) {
        console.log(error)
    }

}


//types



export type ProfileActionType =
    AddPostActionCreatorType
    | SetProfileStatusActionCreatorType
    | DeletePostActionCreatorType
    | SetPhotoActionCreatorType
    |SetProfileACType



export type PostDataType = {
    id: string
    message: string
    likesCount: number
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


export type ProfileInfoType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
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
    small: string,
    large: string
}

export type ProfilePageType = {
    postsData: Array<PostDataType>
    profile: ProfileInfoType | null
    status: string
}
