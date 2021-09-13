import {v1} from 'uuid';


const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'


export type ActionDialogsReducerType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>


export type PostDataType = {
    id: string
    message: string
    likesCount: number
}


export type ProfilePageType = {
    postsData: Array<PostDataType>
    newPostText: string
}

const initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: 'Hello my friend!', likesCount: 22},
        {id: v1(), message: 'Hello samurai!', likesCount: 12},
        {id: v1(), message: 'You are the best!', likesCount: 24},
        {id: v1(), message: 'Good night!', likesCount: 15},
    ],
    newPostText: 'it-kamasutra.com'
}


export const dialogsReducer = (state: ProfilePageType = initialState, action: ActionDialogsReducerType): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            return {
                ...state, newPostText: '', postsData: [{
                    id: v1(),
                    message: state.newPostText,
                    likesCount: 0
                }, ...state.postsData,

                ]
            }
        }
        case "UPDATE-NEW-POST-TEXT": {
            if (action.newText != null) {
                return {...state, newPostText: action.newText};
            }

        }
    }

    return state
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
}
export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST})


type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionCreatorType => (
    {type: UPDATE_NEW_POST_TEXT, newText: text}
)