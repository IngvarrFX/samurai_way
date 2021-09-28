import React from "react";
import style from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileUserType} from "../../redux/messageReducer";


type ProfilePropsType = {
    //store: Store
    profile: ProfileUserType
}

export const Profile = (props: ProfilePropsType) => {

    return (
        <div className={style.profile}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}