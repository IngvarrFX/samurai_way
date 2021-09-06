import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {Post} from './Post/Post';
import style from './MyPosts.module.css'
import {

    addPostActionCreator,
    updateNewPostTextActionCreator,
} from '../../../redux/dialogsReducer';
import {PostDataType} from '../../../redux/state';


export type MessagesPropsType = {
    id: number
    message: string
    likesCounet: number
}

export type DataType = {
    data: Array<PostDataType>
    newPostText: string
    addPost: () => void
    updatePost:(text: string) => void
}


export const MyPosts = (props: DataType) => {


    let postsElemets = props.data.map((m) => <Post key={m.id} message={m.message} likeCounts={m.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPostHandler = () => {
        props.addPost()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePost(e.currentTarget.value)
    }

    return (
        <div className={style.postsBlock}>
            <div>
                <h3>My Posts</h3>
                <div>
                    <div>
                        <textarea
                            value={props.newPostText}
                            ref={newPostElement}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <button onClick={addPostHandler}>Add post</button>
                    </div>
                </div>
                <div className={style.posts}>
                    {postsElemets}
                </div>
            </div>
        </div>
    )
}