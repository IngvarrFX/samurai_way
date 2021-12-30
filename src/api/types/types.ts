import {ContactsType} from "../../redux/profileReducer";


export type ProfileDataType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
}


export type ResponseType<T> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type ResponseDataType = {
    id: number
    login: string
    email: string
}

export type ResponseCaptchaType = {
    url: string
}

