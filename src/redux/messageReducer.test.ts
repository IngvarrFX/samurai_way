import {
    ActionMessageReducerType, addMessageActionCreator,
    messageReducer,
    updateMessageActionCreator
} from "./messageReducer";
import {DialogsPageType} from "./state";
import {v1} from "uuid";


test("shuold be add new message in state", () => {


    const state: DialogsPageType = {
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

    const action: ActionMessageReducerType = addMessageActionCreator()

    const result = messageReducer(state, action)


    expect(result.messagesData.length).toBe(6)
})


test("shuold be update message in state", () => {


    const state: DialogsPageType = {
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

    const action: ActionMessageReducerType = updateMessageActionCreator('hello')

    const result = messageReducer(state, action)


    expect(result.newMessageText).toBe('hello')
})
