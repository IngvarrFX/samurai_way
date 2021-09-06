import {ActionsType, DialogsPageType, MessagePageType, MessageType} from './state';
import {v1} from 'uuid';
import {addPostActionCreator, updateNewPostTextActionCreator} from './dialogsReducer';

// export type MessageActionType =
//     ReturnType<typeof addMessageActionCreator>
//     | ReturnType<typeof updateMessageActionCreator>

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const initialState: DialogsPageType = {
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
    ], newMessageText: ''
}


export const messageReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {

    if (action.type === ADD_MESSAGE) {
        const newMessage: MessageType = {
            id: v1(),
            message: state.newMessageText,
            likesCount: 0
        }
        state.messagesData.push(newMessage)
        state.newMessageText = '';
        return state

    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
        if (action.newMessageBody != null) {
            state.newMessageText = action.newMessageBody;
        }
        return state
    }

    return state
}

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
}
export const addMessageActionCreator = (): AddMessageActionCreatorType => ({type: ADD_MESSAGE} as const)


type UpdateMessageActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newMessageBody: string
}
export const updateMessageActionCreator = (text: string): UpdateMessageActionCreatorType => (
    {type: UPDATE_NEW_MESSAGE_TEXT, newMessageBody: text} as const
)