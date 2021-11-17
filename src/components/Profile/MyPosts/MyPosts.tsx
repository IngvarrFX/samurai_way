import React from "react";
import {Post} from "./Post/Post";
import style from "./MyPosts.module.css"
import {PostDataType,} from "../../../redux/profileReducer";
import {AddPost} from "../../../form/AddPostForm";


export type MessagesPropsType = {
    id: number
    message: string
    likesCounet: number
}

export type DataType = {
    data: Array<PostDataType>
    addPost: (value: string) => void
}


export const MyPosts = React.memo((props: DataType) => {
    console.log('ren')

    let postsElemets = props.data.map((m) => <Post key={m.id} message={m.message} likeCounts={m.likesCount}/>)


    const addPostFormHandler = (value: string) => {
        props.addPost(value)
    }


    return (
        <div className={style.postsBlock}>
            <div>
                <h3>My Posts</h3>
                <div>
                    <AddPost addPostFormHandler={addPostFormHandler}/>
                </div>
                <div className={style.posts}>
                    {postsElemets}
                </div>
            </div>
        </div>
    )
})