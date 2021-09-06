import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/dialogsReducer';
import {MyPosts} from './MyPosts';
import {Store} from 'redux';
import {StateType} from '../../../redux/state';


type MyPostsContainerPropsType = {
    store: Store
}


export const MyPostsContainer = (props: MyPostsContainerPropsType) => {
    let state: StateType = props.store.getState()

    const addPostHandler = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const onChangeHandler = (text: string) => {
        props.store.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <MyPosts data={state.profilePage.postsData} newPostText={state.profilePage.newPostText}
                 dispatch={props.store.dispatch} addPost={addPostHandler} updatePost={onChangeHandler}/>
    )
}