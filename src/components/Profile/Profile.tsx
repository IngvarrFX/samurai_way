import React from 'react';
import style from './Profile.module.css'
import {MessagesPropsType, MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionsType, /*AddPostActionType,*/ PostDataType, /*UpdateNewPostTextActionType*/} from '../../redux/state';

type ProfilePropsType = {
    posts: Array<PostDataType>
    /*addPost: () => void*/
    newPostText: string
    /*updatePostText:(text: string) => void*/
    dispatch: (action: ActionsType) => void
}

export const Profile = (props: ProfilePropsType) => {

    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPosts data={props.posts}
                     dispatch={props.dispatch}
                     newPostText={props.newPostText}
                /*updatePostText={props.updatePostText}*/
            />
        </div>
    )
}