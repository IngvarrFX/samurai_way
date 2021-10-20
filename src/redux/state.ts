import {v1} from 'uuid';
import {
    addPostActionCreator,
    profileReducer, updateNewPostTextActionCreator,
} from './profileReducer';
import {
    addMessageActionCreator,
    messageReducer, updateMessageActionCreator,
} from './messageReducer';


type MessageType = {
    id: string
    message: string
    likesCount: number
}

type DialogsType = {
    id: string
    name: string
}

type PostDataType = {
    id: string
    message: string
    likesCount: number
}

export type MessagePageType = {
    messagesData: Array<MessageType>
    newMessageText: string
}

type DialogsPageType = {
    dialogsData: Array<DialogsType>
    messagesData: Array<MessageType>
    newMessageText: string
}

type ProfilePageType = {
    postsData: Array<PostDataType>
    newPostText: string
}

type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType

}


type StoreType = {
    _state: StateType
    callSubscriber: () => void
    subscribe: (abserver: () => void) => void
    getState: () => StateType
    //dispatch: (action: ActionsType) => void
}


// export type ActionsType =
//     ReturnType<typeof addMessageActionCreator>
//     | ReturnType<typeof updateMessageActionCreator> | ReturnType<typeof addPostActionCreator>
//     | ReturnType<typeof updateNewPostTextActionCreator>
//
//
// export const store: StoreType = {
//     _state: {
//         profilePage: {
//             postsData: [
//                 {id: v1(), message: 'Hello my friend!', likesCount: 22},
//                 {id: v1(), message: 'Hello samurai!', likesCount: 12},
//                 {id: v1(), message: 'You are the best!', likesCount: 24},
//                 {id: v1(), message: 'Good night!', likesCount: 15},
//             ],
//             newPostText: 'it-kamasutra.com'
//         },
//         dialogsPage: {
//             dialogsData: [
//                 {id: v1(), name: 'Dimych'},
//                 {id: v1(), name: 'Sveta'},
//                 {id: v1(), name: 'Valera'},
//                 {id: v1(), name: 'Victor'},
//                 {id: v1(), name: 'Sasha'},
//                 {id: v1(), name: 'Andrey'},
//                 {id: v1(), name: 'Igor'},
//             ],
//             messagesData: [
//                 {id: v1(), message: 'Hello', likesCount: 22},
//                 {id: v1(), message: 'How is your learning?', likesCount: 36},
//                 {id: v1(), message: 'Yo', likesCount: 23},
//                 {id: v1(), message: 'You good!', likesCount: 55},
//                 {id: v1(), message: 'My name is Mike', likesCount: 12},
//             ], newMessageText: ''
//         }
//
//     },
//
//     callSubscriber() {
//         console.log('State chenged')
//     },
//     subscribe(abserver) {
//         this.callSubscriber = abserver
//     },
//     getState() {
//         return this._state
//     },
//
//      dispatch(action) {
//
//          this._state.profilePage = dialogsReducer(this._state.profilePage, action)
//          this._state.dialogsPage = messageReducer(this._state.dialogsPage, action)
//          this.callSubscriber()
//
//
//      }
// }
//




