import {DialogsPageType, ProfilePageType} from "./state";
import {v1} from "uuid";
import {
    ActionDialogsReducerType,
    addPostActionCreator,
    profileReducer,
    updateNewPostTextActionCreator
} from "./profileReducer";

test("shuold be add new post in state", () => {


    const state: ProfilePageType = {
        postsData: [
            {id: v1(), message: 'Hello my friend!', likesCount: 22},
            {id: v1(), message: 'Hello samurai!', likesCount: 12},
            {id: v1(), message: 'You are the best!', likesCount: 24},
            {id: v1(), message: 'Good night!', likesCount: 15},
        ],
        newPostText: 'it-kamasutra.com'
    }

    const action: ActionDialogsReducerType = addPostActionCreator()

    const result = profileReducer(state, action)


    expect(result.postsData.length).toBe(5)
})


test("shuold be add new post in state", () => {


    const state: ProfilePageType = {
        postsData: [
            {id: v1(), message: 'Hello my friend!', likesCount: 22},
            {id: v1(), message: 'Hello samurai!', likesCount: 12},
            {id: v1(), message: 'You are the best!', likesCount: 24},
            {id: v1(), message: 'Good night!', likesCount: 15},
        ],
        newPostText: 'it-kamasutra.com'
    }

    const action: ActionDialogsReducerType = updateNewPostTextActionCreator('my name')

    const result = profileReducer(state, action)


    expect(result.newPostText).toBe('my name')
})
