import {v1} from "uuid";


export type ActionMessageReducerType =
    AddMessageActionCreatorType
    | UpdateMessageActionCreatorType
    | SetProfileACType

export const ADD_MESSAGE = "ADD-MESSAGE"
export const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"
export const SET_PROFILE = "SET_PROFILE"

export type MessageType = {
    id: string
    message: string
    likesCount: number
}


export type DialogsType = {
    id: string
    name: string
}

export type ProfileUserType = {
    aboutMe: string
    contacts: {
        facebook: string,
        website: null,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: null,
        github: string,
        mainLink: null
    },
    lookingForAJob: true,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string,
        large: string
    }
}

export type DialogsPageType = {
    dialogsData: Array<DialogsType>
    messagesData: Array<MessageType>
    newMessageText: string
    profile: ProfileUserType
}

const initialState: DialogsPageType = {
    dialogsData: [
        {id: v1(), name: "Dimych"},
        {id: v1(), name: "Sveta"},
        {id: v1(), name: "Valera"},
        {id: v1(), name: "Victor"},
        {id: v1(), name: "Sasha"},
        {id: v1(), name: "Andrey"},
        {id: v1(), name: "Igor"},
    ],
    messagesData: [
        {id: v1(), message: "Hello", likesCount: 22},
        {id: v1(), message: "How is your learning?", likesCount: 36},
        {id: v1(), message: "Yo", likesCount: 23},
        {id: v1(), message: "You good!", likesCount: 55},
        {id: v1(), message: "My name is Mike", likesCount: 12},
    ],
    newMessageText: "",
    profile: {
        aboutMe: "",
        contacts: {
            facebook: "",
            website: null,
            vk: "",
            twitter: "",
            instagram: "",
            youtube: null,
            github: "",
            mainLink: null
        },
        lookingForAJob: true,
        lookingForAJobDescription: "",
        fullName: "",
        userId: 0,
        photos: {
            small: "",
            large: ""
        }
    },
}


export const messageReducer = (state: DialogsPageType = initialState, action: ActionMessageReducerType): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state, newMessageText: "", messagesData: [{
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
    profile: ProfileUserType
}
export const setProfileAC = (profile: ProfileUserType): SetProfileACType => (
    {type: SET_PROFILE, profile} as const
)
