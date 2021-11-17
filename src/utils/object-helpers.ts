import {UserType} from "../redux/usersReducer";



export const updateObjectInArray = (items: Array<UserType>, itemId:number, objPropName:string, newObjProps:{followed: boolean}) => {
    //@ts-ignore
    return items.map(u => u[objPropName] === itemId ? {...u, ...newObjProps}: u)
}