import {v1} from "uuid";
import {profileStatusAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {AnyAction} from "redux";
import {ActionType, InitialStateType} from "./usersReducer";


const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS"


export type ActionDialogsReducerType =
    AddPostActionCreatorType
    | UpdateNewPostTextActionCreatorType
    | SetProfileStatusActionCreatorType


export type PostDataType = {
    id: string
    message: string
    likesCount: number
}


export type ProfilePageType = {
    postsData: Array<PostDataType>
    newPostText: string
    status: string
}

const initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: "Hello my friend!", likesCount: 22},
        {id: v1(), message: "Hello samurai!", likesCount: 12},
        {id: v1(), message: "You are the best!", likesCount: 24},
        {id: v1(), message: "Good night!", likesCount: 15},
    ],
    newPostText: "it-kamasutra.com",
    status: ""
}


export const profileReducer = (state: ProfilePageType = initialState, action: ActionDialogsReducerType): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            return {
                ...state, newPostText: "", postsData: [{
                    id: v1(),
                    message: state.newPostText,
                    likesCount: 0
                }, ...state.postsData,

                ]
            }
        }
        case SET_PROFILE_STATUS: {
            return {...state, status: action.status}
        }
        case UPDATE_NEW_POST_TEXT: {
            if (action.text != null) {
                return {...state, newPostText: action.text};
            }
            return state
        }
        default:
            return state
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
}
export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST})


type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT
    text: string
}
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionCreatorType => (
    {type: UPDATE_NEW_POST_TEXT, text}
)

type SetProfileStatusActionCreatorType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
const setProfileStatusActionCreator = (status: string): SetProfileStatusActionCreatorType => (
    {type: SET_PROFILE_STATUS, status})


export type ThunkActionType = ThunkAction<void, AppStateType, unknown, ActionType>
type DispatchType = ThunkDispatch<InitialStateType, undefined, AnyAction>


export const getProfileStatusThunkCr = (userID: string): ThunkActionType => (dispatch: DispatchType) => {
    profileStatusAPI.getProfileStatus(userID).then((response) => {
            dispatch(setProfileStatusActionCreator(response.data))
    })
}


export const updateProfileStatusThunkCr = (status: string): ThunkActionType => (dispatch: DispatchType) => {
    profileStatusAPI.updateProfileStatus(status).then((response) => {
        if (response.data.resultCode === 0) {
            dispatch(setProfileStatusActionCreator(status))
        }

    })
}
