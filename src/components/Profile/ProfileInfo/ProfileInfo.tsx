import React, {ChangeEvent} from "react";
import style from "./ProfileInfo.module.css"
import avatarDefault from "../../../assets/images/profile-picture.png"
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";
import {ProfileInfoType} from "../../../redux/profileReducer";


type ProfileInfoPropsType = {
    profile: ProfileInfoType
    status: string
    updateProfileStatus: (status: string) => void
    isOwnPhoto: boolean
    savePhoto: (file: File) => void

}


export const ProfileInfo = (props: ProfileInfoPropsType) => {


    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length) {
                props.savePhoto(e.target.files[0])
            }
        }
    }

    return (
        <div className={style.mainBlock}>
            <div className={style.descriptionBlock}>
                <div className={style.profilePhoto}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : avatarDefault} alt=""/>
                    {props.isOwnPhoto && <input type={"file"} onChange={onMainPhotoSelected}/>}
                </div>
                <ProfileStatusWithHooks status={props.status} updateProfileStatus={props.updateProfileStatus}/>
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
                    <div>{props.profile.lookingForAJob ? "Yes" : "NO"}</div>
                    <hr></hr>
                    <span><b>lookingForAJobDescription: </b></span>
                    <div>{props.profile.lookingForAJobDescription}</div>
                </div>
            </div>
        </div>
    )
}