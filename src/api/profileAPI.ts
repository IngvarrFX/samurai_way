import {axiosInstance} from "./config";
import {ProfileDataType, ResponseType} from "./types/types";
import {AxiosResponse} from "axios";


export const profileStatusAPI = {
    getProfile(userId: number) {
        return axiosInstance.get(`profile/${userId}`)
    },
    getProfileStatus(userId: number) {
        return axiosInstance.get(`profile/status/${userId}`)
    },
    updateProfileStatus(status: string) {
        return axiosInstance.put(`profile/status`, {status})
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append("image", photo)
        return axiosInstance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multypart/form-data"
            }
        })
    }
}

export const profileDataAPI = {
    updateProfileData(data: ProfileDataType) {
        return axiosInstance.put<ProfileDataType, AxiosResponse<ResponseType<{}>>>(`profile`, data)
    }
}
