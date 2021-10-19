import React from "react";
import { ProfileType } from "../../../redux/messageReducer";
import style from "./ProfileInfo.module.css"
import avatarDefault from '../../../assets/images/avatarDefault.png'



type ProfileInfoPropsType ={
    profile: ProfileType
}


export const ProfileInfo = (props:ProfileInfoPropsType) => {
        return (
            <div>
                {/*<div>*/}
                {/*    <img src="https://hbr.org/resources/images/article_assets/2021/04/Apr21_16_1249623281.jpg" alt=""/>*/}
                {/*</div>*/}
                <div className={style.descriptionBlock}>
                    <img src={props.profile.photos.large? props.profile.photos.large : avatarDefault } alt=""/>

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