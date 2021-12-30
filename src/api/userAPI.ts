import {axiosInstance} from "./config";


export const userAPI = {
    getUsers(currentPage: number = 1, count: number = 10) {
        return axiosInstance.get(`users?page=${currentPage}&count=${count}`)
            .then((response) => response.data)
    },

    followed(id: number) {
        return axiosInstance.post(`follow/${id}`).then((response) => response.data)

    },
    unFollowed(id: number) {
        return axiosInstance.delete(`follow/${id}`).then((response) => response.data)

    },
}




