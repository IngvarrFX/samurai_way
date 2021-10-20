import React from "react";
import {addPostActionCreator, PostDataType, updateNewPostTextActionCreator} from "../../../redux/dialogsReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../../redux/reduxStore";


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

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyPosts)