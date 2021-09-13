import React from 'react';
import style from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {Store} from 'redux';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';


type ProfilePropsType = {
    store: Store
}

export const Profile = () => {

    return (
        <div className={style.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}