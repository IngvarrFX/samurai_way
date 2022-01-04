import {v1} from "uuid";


export type MessageActionType =
    AddMessageActionCreatorType


export const ADD_MESSAGE = "ADD-MESSAGE"
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




const initialState = {
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
}
export type InitialStateType = typeof initialState

export const messageReducer = (state: InitialStateType = initialState, action: MessageActionType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state, messagesData: [{
                    id: v1(),
                    message: action.newMessage,
                    likesCount: 0
                }, ...state.messagesData,

                ]
            }
        }
        default:
            return state
    }
}

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessage: string
}
export const addMessageActionCreator = (newMessage: string): AddMessageActionCreatorType => ({
    type: ADD_MESSAGE,
    newMessage
} as const)

