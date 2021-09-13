import React from 'react';
import {addPostActionCreator, PostDataType, updateNewPostTextActionCreator} from '../../../redux/dialogsReducer';
import {MyPosts} from './MyPosts';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../../redux/reduxStore";


// export const MyPostsContainer = () => {
//
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state: StateType = store.getState()
//
//                 const addPostHandler = () => {
//                     store.dispatch(addPostActionCreator())
//                 }
//
//                 const onChangeHandler = (text: string) => {
//                     store.dispatch(updateNewPostTextActionCreator(text))
//                 }
//                 return (
//                     <MyPosts data={state.profilePage.postsData} newPostText={state.profilePage.newPostText}
//                              addPost={addPostHandler} updatePost={onChangeHandler}/>
//                 )
//             }}
//
//         </StoreContext.Consumer>
//     )
// }

type MapStateToPropsType = {
    data: Array<PostDataType>
    newPostText: string
}

type MapDispatchToPropsType ={
    addPost: () => void
    updatePost: (text: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        data: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}



const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updatePost: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)