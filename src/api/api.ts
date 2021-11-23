import axios from "axios";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "e5d849e4-d295-4a72-8071-9e5233e43fce",
    },
})

export const userAPI = {
    getUsers(currentPage: number = 1, count: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${count}`)
            .then((response) => response.data)
    },
    getProfile(userId = `19523`) {
        /* return instance.get(`profile/${userId}`)
             .then((response) => response.data)*/
        console.warn("Please use profileStatusAPI")
        return profileStatusAPI.getProfile(userId)
    },
    followed(id: number = 19523) {
        return instance.post(`follow/${id}`).then((response) => response.data)

    },
    unFollowed(id: number = 19523) {
        return instance.delete(`follow/${id}`).then((response) => response.data)

    },
}


export const profileStatusAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getProfileStatus(userId: string) {

        return instance.get(`profile/status/${userId}`)

    },
    updateProfileStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multypart/form-data"
            }
        })
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then((response) => response)
    }
}


export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then((response) => response)
    },
    logOut() {
        return instance.delete(`auth/login`)
            .then((response) => response)
    }
}




