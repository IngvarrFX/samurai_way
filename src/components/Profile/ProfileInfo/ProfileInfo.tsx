import React from "react";
import style from "./ProfileInfo.module.css"
import {ProfileUserType} from "../../../redux/messageReducer";


type ProfileInfoPropsType ={
    profile: ProfileUserType
}


export const ProfileInfo = (props:ProfileInfoPropsType) => {
    return (
        <div>
            <div>
                <img src="https://hbr.org/resources/images/article_assets/2021/04/Apr21_16_1249623281.jpg" alt=""/>
            </div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>

                <div>
                    <span>FullName: </span>
                    <span>{props.profile.fullName} </span>
                    <hr></hr>
                    <span>Contacts: </span>
                    <div>{props.profile.contacts.vk}</div>
                    <div>{props.profile.contacts.github}</div>
                    <div>{props.profile.contacts.facebook}</div>
                    <div>{props.profile.contacts.twitter}</div>
                    <div>{props.profile.contacts.instagram}</div>
                    <div>{props.profile.contacts.mainLink}</div>
                    <div>{props.profile.contacts.website}</div>
                    <div>{props.profile.contacts.youtube}</div>
                    <hr></hr>
                    <span>lookingForAJob: </span>
                    <div>{props.profile.lookingForAJob? 'Yes' : 'NO'}</div>
                    <hr></hr>
                    <span>lookingForAJobDescription: </span>
                    <div>{props.profile.lookingForAJobDescription}</div>


                </div>
            </div>
        </div>
    )
}