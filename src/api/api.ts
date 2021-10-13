import axios from "axios";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "e5d849e4-d295-4a72-8071-9e5233e43fce",
    },
})

export const userAPI = {
    getUsers(currentPage:number = 1, count:number = 10) {
        return instance.get(`users?page=${currentPage}&count=${count}`)
            .then((response) => response.data)
    },
    getProfile(userId = `19523`) {
        return instance.get(`profile/${userId}`)
            .then((response) => response.data)
    },
    followed(id:number = 19523) {
        return instance.post(`follow/${id}`).then((response) =>response.data)

    },
    unFollowed(id:number = 19523) {
        return instance.delete(`follow/${id}`).then((response) => response.data)

    },
}

export const authAPI = {
    me(){
        return instance.get(`auth/me`)
            .then((response) => response)
    }
}

// export const profileAPI = {
//     getProfile(userId = `2`) {
//         return instance.get(`profile/${userId}`)
//             .then((response) => response.data)
//     }
// }

// export const followedAPI = {
//     followed(id:number = 2) {
//         return instance.post(`follow/${id}`).then((response) =>response.data)
//
//     },
//     unFollowed(id:number = 2) {
//         return instance.delete(`follow/${id}`).then((response) => response.data)
//
//     },
// }

// export const setUserDataAPI = {
//     setUserData(){
//         return instance.get(`auth/me`)
//             .then((response) => response)
//     }
// }


