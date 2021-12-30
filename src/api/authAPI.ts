import {axiosInstance} from "./config";
import {ResponseDataType, ResponseType} from "./types/types";


export const authAPI = {
    me() {
        return axiosInstance.get<ResponseType<ResponseDataType>>(`auth/me`)
            .then((response) => response)
    }
}
