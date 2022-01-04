import {v1} from "uuid";
import {
    ProfileActionType,
    addPostActionCreator,
    profileReducer, ProfilePageType, ContactsType
} from "../profileReducer";

test("shuold be add new post in state", () => {


    const state: ProfilePageType = {
        postsData: [
            {id: v1(), message: "Hello my friend!", likesCount: 22},
            {id: v1(), message: "Hello samurai!", likesCount: 12},
            {id: v1(), message: "You are the best!", likesCount: 24},
            {id: v1(), message: "Good night!", likesCount: 15},
        ],
        status: "",
        errorUpdate: null,
        profile: null
    }

    const action: ProfileActionType = addPostActionCreator("")

    const result = profileReducer(state, action)


    expect(result.postsData.length).toBe(5)
})



