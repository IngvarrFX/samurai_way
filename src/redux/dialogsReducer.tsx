import {ActionsType, PostDataType, ProfilePageType} from './state';
import {v1} from 'uuid';





const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'


export const dialogsReducer = (state: ProfilePageType, action: ActionsType): ProfilePageType => {

    if (action.type === ADD_POST) {
        const newPost: PostDataType = {
            id: v1(),
            message: state.newPostText,
            likesCount: 0
        }
        state.postsData.push(newPost)
        state.newPostText = '';
        return state
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
        if (action.newText != null) {
            state.newPostText = action.newText;
        }
        return state
    }

    return state
}

export const addPostActionCreator = () => ({type: 'ADD-POST'} as const)

export const updateNewPostTextActionCreator = (text: string) => (
    {type: 'UPDATE-NEW-POST-TEXT', newText: text} as const
)