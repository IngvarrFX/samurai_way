import {v1} from "uuid";
import {profileStatusAPI} from "../api/api";
import {AppThunk} from "./reduxStore";


const ADD_POST = "ADD-POST"
const DELETE_POST = "DELETE_POST"
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS"


export type ProfileActionType =
    AddPostActionCreatorType
    | SetProfileStatusActionCreatorType
    | DeletePostActionCreatorType


export type PostDataType = {
    id: string
    message: string
    likesCount: number
}


export type ProfilePageType = {
    postsData: Array<PostDataType>
    status: string
}

const initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: "Hello my friend!", likesCount: 22},
        {id: v1(), message: "Hello samurai!", likesCount: 12},
        {id: v1(), message: "You are the best!", likesCount: 24},
        {id: v1(), message: "Good night!", likesCount: 15},
    ],
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
const setProfileStatusActionCreator = (status: string): SetProfileStatusActionCreatorType => (
    {type: SET_PROFILE_STATUS, status})


// export type ThunkActionType = ThunkAction<void, AppStateType, unknown, AppActionsType>
// type DispatchType = ThunkDispatch<InitialStateType, undefined, AnyAction>


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
