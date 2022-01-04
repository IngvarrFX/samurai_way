import React, {ChangeEvent, useCallback, useState} from "react";
import style from "./ProfileInfo.module.css"
import avatarDefault from "../../../assets/images/profile-picture.png"
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";
import {ProfileInfoType} from "../../../redux/profileReducer";
import {ProfileData} from "./ProfileData";
import ProfileDataForm from "../ProfileDataForm";
import {ProfileDataType} from "../../../api/types/types";


type ProfileInfoPropsType = {
    profile: ProfileInfoType
    status: string
    updateProfileStatus: (status: string) => void
    isOwnPhoto: boolean
    savePhoto: (file: File) => void
    updateProfileData: (data: ProfileDataType) => Promise<any>
}


export const ProfileInfo = (props: ProfileInfoPropsType) => {
    const [edit, setEdit] = useState(false)
    const onSubmit = async (formData: ProfileInfoType) => {
        await props.updateProfileData(formData)
        setEdit(false)
    }

    const onMainPhotoSelected = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length) {
                props.savePhoto(e.target.files[0])
            }
        }
    }, [props.savePhoto])

    return (
        <div className={style.mainBlock}>
            <div className={style.descriptionBlock}>
                <span className={style.profilePhoto}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : avatarDefault} alt=""/>
                    {props.isOwnPhoto &&
                    <input className={"customFileInput"} type={"file"} onChange={onMainPhotoSelected}/>}
                </span>
                <ProfileStatusWithHooks
                    status={props.status}
                    updateProfileStatus={props.updateProfileStatus}/>
                {edit
                    ? <ProfileDataForm
                        initialValues={props.profile}
                        profile={props.profile}
                        onSubmit={onSubmit}/>
                    : <ProfileData
                        profile={props.profile}
                        isOwnPhoto={props.isOwnPhoto}
                        onEdit={() => {
                            setEdit(true)
                        }}/>}
            </div>
        </div>
    )
}



