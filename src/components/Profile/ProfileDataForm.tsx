import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormControls/FormControls";
import {maxLength, required} from "../../utils/validators/validators";
import React from "react";
import {ProfileInfoType} from "../../redux/profileReducer";


export type ProfileDataFormType = {
    profile: ProfileInfoType
}

type ProfileTypeKeys = GetStringKeys<ProfileInfoType>

const maxLength30 = maxLength(30)
const maxLength100 = maxLength(100)


export const ProfileForm: React.FC<InjectedFormProps<ProfileInfoType, ProfileDataFormType> & ProfileDataFormType> = (props) => {


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


    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Full Name" component={Input} name="fullName" type="text"
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <Field placeholder="My professional skills " component={Textarea} name="lookingForAJobDescription"
                       type="text"
                       validate={[required, maxLength100]}/>
            </div>
            <div>
                <Field placeholder="About me " component={Textarea} name="aboutMe" type="text"
                       validate={[required, maxLength100]}/>
            </div>
            <div>
                <Field component="input" name="lookingForAJob" type="checkbox"/> Looking for a job
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                return <div key={key}>
                    {/* todo: create some solution for embedded objects */}
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            })}
            </div>
            {props.error &&
            <div>
                <strong>{props.error}</strong>
            </div>
            }
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}


const ProfileDataFormReduxForm = reduxForm<ProfileInfoType, ProfileDataFormType>({form: "profileForm"})(ProfileForm)

export default ProfileDataFormReduxForm;



