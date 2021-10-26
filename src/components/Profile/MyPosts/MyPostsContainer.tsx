import React from "react";
import {addPostActionCreator, PostDataType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../../redux/reduxStore";


type MapStateToPropsType = {
    data: Array<PostDataType>
}

type MapDispatchToPropsType ={
    addPost: (value: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        data: state.profilePage.postsData,
    }
}



const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        addPost: (value: string) => {
            dispatch(addPostActionCreator(value))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyPosts)