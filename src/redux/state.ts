import {v1} from 'uuid';


export type MessageType = {
    id: string
    message: string
    likesCount: number
}

export type DialogsType = {
    id: string
    name: string
}

export type PostDataType = {
    id: string
    message: string
    likesCount: number
}

export type MessagePageType = {
    messagesData: Array<MessageType>
    newMessageText: string
}

export type DialogsPageType = {
    dialogsData: Array<DialogsType>
}

export type ProfilePageType = {
    postsData: Array<PostDataType>
    newPostText: string
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    messagePage: MessagePageType
}

/*export type AddPostActionType = {
    type: 'ADD-POST'
}*/

/*export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}*/

//export type ActionsType = AddPostActionType | UpdateNewPostTextActionType
export type ActionsType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof addMessageActionCreator>
    | ReturnType<typeof updateMessageActionCreator>


export type StoreType = {
    _state: StateType
    /*updateNewPostText: (newText: string) => void
    addPost: () => void*/
    callSubscriber: () => void
    subscribe: (abserver: () => void) => void
    getState: () => StateType
    dispatch: (action: ActionsType) => void
}

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT ='UPDATE-NEW-POST-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: v1(), message: 'Hello my friend!', likesCount: 22},
                {id: v1(), message: 'Hello samurai!', likesCount: 12},
                {id: v1(), message: 'You are the best!', likesCount: 24},
                {id: v1(), message: 'Good night!', likesCount: 15},
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogsData: [
                {id: v1(), name: 'Dimych'},
                {id: v1(), name: 'Sveta'},
                {id: v1(), name: 'Valera'},
                {id: v1(), name: 'Victor'},
                {id: v1(), name: 'Sasha'},
                {id: v1(), name: 'Andrey'},
                {id: v1(), name: 'Igor'},
            ]
        },
        messagePage: {
            messagesData: [
                {id: v1(), message: 'Hello', likesCount: 22},
                {id: v1(), message: 'How is your learning?', likesCount: 36},
                {id: v1(), message: 'Yo', likesCount: 23},
                {id: v1(), message: 'You good!', likesCount: 55},
                {id: v1(), message: 'My name is Mike', likesCount: 12},
            ], newMessageText: ''
        }

    },
    /*updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this.callSubscriber()
    },
    addPost() {
        let newPost: PostDataType = {
            id: v1(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.postsData.push(newPost)
        this._state.profilePage.newPostText = ''
        this.callSubscriber()
    },*/
    callSubscriber() {
        console.log('State chenged')
    },
    subscribe(abserver) {
        this.callSubscriber = abserver
    },
    getState() {
        return this._state
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost: PostDataType = {
                id: v1(),
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.postsData.push(newPost)
            this._state.profilePage.newPostText = '';
            this.callSubscriber();
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            if (action.newText != null) {
                this._state.profilePage.newPostText = action.newText;
            }
            this.callSubscriber()
        } else if (action.type === ADD_MESSAGE) {
            const newMessage: MessageType = {
                id: v1(),
                message: this._state.messagePage.newMessageText,
                likesCount: 0
            }
            this._state.messagePage.messagesData.push(newMessage)
            this._state.messagePage.newMessageText = '';
            this.callSubscriber();
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            if (action.newMessageBody != null) {
                this._state.messagePage.newMessageText = action.newMessageBody;
            }
            this.callSubscriber()
        }

    }
}

/*export const addPostActionCreator = ():AddPostActionType => ({type: 'ADD-POST'})

export const updateNewPostTextActionCreator = (text: string):UpdateNewPostTextActionType => (
    {type: 'UPDATE-NEW-POST-TEXT', newText: text}
)*/

export const addPostActionCreator = () => ({type: 'ADD-POST'} as const)

export const updateNewPostTextActionCreator = (text: string) => (
    {type: 'UPDATE-NEW-POST-TEXT', newText: text} as const
)

export const addMessageActionCreator = () => ({type: 'ADD-MESSAGE'} as const)

export const updateMessageActionCreator = (text: string) => (
    {type: 'UPDATE-NEW-MESSAGE-TEXT', newMessageBody: text} as const
)