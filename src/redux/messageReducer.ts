import {v1} from 'uuid';


export type ActionMessageReducerType =
    AddMessageActionCreatorType
    | UpdateMessageActionCreatorType
    | SetProfileACType

export const ADD_MESSAGE = 'ADD-MESSAGE'
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
export const SET_PROFILE = 'SET_PROFILE'

export type MessageType = {
    id: string
    message: string
    likesCount: number
}


export type DialogsType = {
    id: string
    name: string
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
export type ProfileType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType

}


const initialState = {
    dialogsData: [
        {id: v1(), name: 'Dimych'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Valera'},
        {id: v1(), name: 'Victor'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Andrey'},
        {id: v1(), name: 'Igor'},
    ],
    messagesData: [
        {id: v1(), message: 'Hello', likesCount: 22},
        {id: v1(), message: 'How is your learning?', likesCount: 36},
        {id: v1(), message: 'Yo', likesCount: 23},
        {id: v1(), message: 'You good!', likesCount: 55},
        {id: v1(), message: 'My name is Mike', likesCount: 12},
    ],
    newMessageText: '',
    profile: null as ProfileType | null,
}
export type InitialStateType = typeof initialState

export const messageReducer = (state: InitialStateType = initialState, action: ActionMessageReducerType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state, newMessageText: '', messagesData: [{
                    id: v1(),
                    message: state.newMessageText,
                    likesCount: 0
                }, ...state.messagesData,

                ]
            }
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            if (action.newMessageBody != null) {
                return {...state, newMessageText: action.newMessageBody}
            }
            return state
        }
        case SET_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
}
export const addMessageActionCreator = (): AddMessageActionCreatorType => ({type: ADD_MESSAGE} as const)


type UpdateMessageActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newMessageBody: string
}
export const updateMessageActionCreator = (newMessageBody: string): UpdateMessageActionCreatorType => (
    {type: UPDATE_NEW_MESSAGE_TEXT, newMessageBody} as const
)


type SetProfileACType = {
    type: typeof SET_PROFILE
    profile: ProfileType
}
export const setProfileAC = (profile: ProfileType): SetProfileACType => (
    {type: SET_PROFILE, profile} as const
)
