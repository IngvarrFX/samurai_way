import React from "react";
import style from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../redux/messageReducer";



type ProfilePropsType = {
    profile: ProfileType | null
}

export const Profile = (props: ProfilePropsType) => {

    return (
        <div className={style.profile}>
            { props.profile ? <ProfileInfo profile={props.profile}/> : false}

            <MyPostsContainer/>
        </div>
    )
}