import {ActionsType, MessagePageType, MessageType} from './state';
import {v1} from 'uuid';




const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'


export const messageReducer = (state: MessagePageType, action:ActionsType): MessagePageType => {

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

export const addMessageActionCreator = () => ({type: 'ADD-MESSAGE'} as const)

export const updateMessageActionCreator = (text: string) => (
    {type: 'UPDATE-NEW-MESSAGE-TEXT', newMessageBody: text} as const
)