import {UserType} from "../redux/usersReducer";


export enum ObjPropNameType {
    id = "id",
    firstName = "firstName",
    name = "name",
    status = "status",
    followed = "followed",
    location = "location",
    photoUser = "photoUser",
    photos = "photos"
}

export const updateObjectInArray = (items: Array<UserType>, itemId: number, objPropName: ObjPropNameType, newObjProps: { followed: boolean }) => {

    return items.map(u => u[objPropName] === itemId ? {...u, ...newObjProps} : u)
}