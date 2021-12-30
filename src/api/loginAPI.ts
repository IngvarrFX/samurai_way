import {axiosInstance} from "./config";


export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return axiosInstance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then((response) => response)
    },
    logOut() {
        return axiosInstance.delete(`auth/login`)
            .then((response) => response)
    },

}
