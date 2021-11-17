import {v1} from "uuid";
import {addPostActionCreator, deletePostActionCreator, ProfilePageType, profileReducer} from "./profileReducer";


const state: ProfilePageType = {
    postsData: [
        {id: v1(), message: "Hello my friend!", likesCount: 22},
        {id: v1(), message: "Hello samurai!", likesCount: 12},
        {id: v1(), message: "You are the best!", likesCount: 24},
        {id: v1(), message: "Good night!", likesCount: 15},
    ],
    status: ''
}


test('should be added',()=>{
    // data
    const action = addPostActionCreator("It-incubator")

    // action
    const newState = profileReducer(state, action)

    //expectetion
    expect(newState.postsData.length).toBe(5)

})

test('should be added post correct',()=>{
    // data
    const action = addPostActionCreator("It-incubator")

    // action
    const newState = profileReducer(state, action)

    //expectetion
    expect(newState.postsData[0].message).toBe("It-incubator")

})



test('should be deleted',()=>{
    // data
    let postId = state.postsData[0].id
    const action = deletePostActionCreator(postId)

    // action
    const newState = profileReducer(state, action)

    //expectetion
    expect(newState.postsData[0].message).toBe("Hello samurai!")

})