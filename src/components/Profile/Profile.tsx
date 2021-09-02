import React from 'react';
import style from './Profile.module.css'
import {MessagesPropsType, MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionsType, PostDataType,} from '../../redux/state';


type ProfilePropsType = {
    posts: Array<PostDataType>
    newPostText: string
    dispatch: (action: ActionsType) => void
}

export const Profile = (props: ProfilePropsType) => {

    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPosts data={props.posts}
                     dispatch={props.dispatch}
                     newPostText={props.newPostText}
            />
        </div>
    )
}