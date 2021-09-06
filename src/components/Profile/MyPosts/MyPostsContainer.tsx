import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/dialogsReducer';
import {MyPosts} from './MyPosts';
import {StateType} from '../../../redux/state';
import {StoreContext} from "../../../StoreContext";
import {addMessageActionCreator} from "../../../redux/messageReducer";


// type MyPostsContainerPropsType = {
//     store: Store
// }


export const MyPostsContainer = () => {


    return (
        <StoreContext.Consumer>
            {(store) => {
                let state: StateType = store.getState()

                const addPostHandler = () => {
                    store.dispatch(addPostActionCreator())
                }

                const onChangeHandler = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }
                return (
                    <MyPosts data={state.profilePage.postsData} newPostText={state.profilePage.newPostText}
                              addPost={addPostHandler} updatePost={onChangeHandler}/>
                )
            }}

        </StoreContext.Consumer>
    )
}