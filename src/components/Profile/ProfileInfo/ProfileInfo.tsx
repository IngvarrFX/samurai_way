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
                <span className={style.profilePhoto}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : avatarDefault} alt=""/>
                    {props.isOwnPhoto && <input type={"file"} onChange={onMainPhotoSelected}/>}
                </span>
                <ProfileStatusWithHooks status={props.status} updateProfileStatus={props.updateProfileStatus}/>
                <ProfileData profile={props.profile}/>
            </div>
        </div>
    )
}



type ProfileDataType = {
    profile: ProfileInfoType
}

enum ObjPropNameType {
    vk = "vk",
    github = "github",
    facebook = "facebook",
    twitter = "twitter",
    instagram = "instagram",
    mainLink = "mainLink",
    website = "website",
    youtube = "youtube"
}
const ProfileData = (props:ProfileDataType)=> {
    return (
        <div>
            <span><b>FullName: </b></span>
            <span>{props.profile.fullName} </span>
            <hr></hr>
            <span><b>Contacts: </b> {Object.keys(props.profile.contacts).map((key) => {
                debugger
                return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as ObjPropNameType]}/>
            })}</span>
            <hr></hr>
            <span><b>Looking for a job: </b></span>
            <span>{props.profile.lookingForAJob ? "Yes" : "No"}</span>
            <hr></hr>
            <span><b>My professional skills: </b></span>
            <div>{props.profile.lookingForAJobDescription}</div>
            <hr></hr>
            <span><b>About me: </b></span>
            <div>{props.profile.aboutMe}</div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}


const Contact = (props: ContactPropsType)=> {
    return (
        <div>
            <b className={style.contacts}>{props.contactTitle}</b>:{props.contactValue}
        </div>
    )
}