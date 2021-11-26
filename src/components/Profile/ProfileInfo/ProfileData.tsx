import {ProfileInfoType} from "../../../redux/profileReducer";
import React from "react";
import {Contact} from "./Contact";

type ProfileDataType = {
    profile: ProfileInfoType
    isOwnPhoto: boolean
    onEdit: () => void
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

export const ProfileData = (props: ProfileDataType) => {
    return (
        <div>
            {props.isOwnPhoto && <div>
                <button onClick={props.onEdit}>Edit</button>
            </div>}
            <span><b>FullName: </b></span>
            <span>{props.profile.fullName} </span>
            <hr></hr>
            <span>
                <b>Contacts: </b> {Object.keys(props.profile.contacts).map((key) => {
                return <Contact key={key}
                                contactTitle={key}
                                contactValue={props.profile.contacts[key as ObjPropNameType]}/>
            })}
            </span>
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
