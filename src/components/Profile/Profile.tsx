import React from "react";
import style from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../redux/profileReducer";
import {ProfileDataType} from "../../api/api";


type ProfilePropsType = {
    profile: ProfileInfoType | null
    status: string
    updateProfileStatus: (status: string) => void
    isOwnPhoto: boolean
    savePhoto: (file: File) => void
    updateProfileData: (data: ProfileDataType) => Promise<any>
}

export const Profile = (props: ProfilePropsType) => {

    return (
        <div className={style.profile}>
            {props.profile
                ? <ProfileInfo
                    savePhoto={props.savePhoto}
                    isOwnPhoto={props.isOwnPhoto}
                    profile={props.profile}
                    status={props.status}
                    updateProfileStatus={props.updateProfileStatus}
                    updateProfileData={props.updateProfileData}
                />
                : false}

            <MyPostsContainer/>
        </div>
    )
}
