import {axiosInstance} from "./config";
import {ResponseCaptchaType} from "./types/types";


export const securityAPI = {
    getCapcha() {
        return axiosInstance.get<ResponseCaptchaType>(`security/get-captcha-url`)
            .then((response) => response)
    },
}
