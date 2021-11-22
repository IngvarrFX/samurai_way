import React from "react";
import {ProfileType} from "../../../redux/messageReducer";
import style from "./ProfileInfo.module.css"
import avatarDefault from "../../../assets/images/profile-picture.png"
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";


type ProfileInfoPropsType ={
    profile: ProfileType
    status: string
    updateProfileStatus:(status: string) => void
}


export const ProfileInfo = (props:ProfileInfoPropsType) => {
        return (
            <div>
                <div className={style.descriptionBlock}>
                    <img src={props.profile.photos.large? props.profile.photos.large : avatarDefault } alt=""/>
                    <ProfileStatusWithHooks status={props.status} updateProfileStatus={props.updateProfileStatus} />
                    <div>
                        <span><b>FullName: </b></span>
                        <span>{props.profile.fullName} </span>
                        <hr></hr>
                        <span><b>Contacts: </b></span>
                        <div>{props.profile.contacts.vk}</div>
                        <div>{props.profile.contacts.github}</div>
                        <div>{props.profile.contacts.facebook}</div>
                        <div>{props.profile.contacts.twitter}</div>
                        <div>{props.profile.contacts.instagram}</div>
                        <div>{props.profile.contacts.mainLink}</div>
                        <div>{props.profile.contacts.website}</div>
                        <div>{props.profile.contacts.youtube}</div>
                        <hr></hr>
                        <span><b>lookingForAJob: </b></span>
                        <div>{props.profile.lookingForAJob ? 'Yes' : 'NO'}</div>
                        <hr></hr>
                        <span><b>lookingForAJobDescription: </b></span>
                        <div>{props.profile.lookingForAJobDescription}</div>
                    </div>
                </div>
            </div>
        )
}