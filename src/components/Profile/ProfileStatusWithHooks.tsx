import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./ProfileStatus.module.css"
import {useDispatch} from "react-redux";
import {getProfileStatusThunkCr} from "../../redux/profileReducer";

type PropsType = {
    status: string
    updateProfileStatus: (status: string) => void
}


export const ProfileStatusWithHooks = (props:PropsType ) => {

    const dispatch = useDispatch()

        const [edit, setEdit]=useState(false)
        const [status, setStatus]=useState(props.status)

        const activateEdit = () => {
            setEdit(true)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            setStatus(e.currentTarget.value)
        }
        const deActivateEdit = () => {
            setEdit(false)
            props.updateProfileStatus(status)
        }
        const requestStat = () => {
            dispatch(getProfileStatusThunkCr('19523'))
        }

        useEffect(()=> {
            setStatus(props.status)
        },[props.status])

        return (
            <div className={style.status}>
                {!edit
                    ?
                    <div>
                        <span
                            onDoubleClick={activateEdit}>Status: {props.status || "Change your profile status"}</span>
                        {/*<button onClick={requestStat}>request Status</button>*/}
                    </div>
                    :
                    <div>
                        <input autoFocus onChange={changeStatus} onBlur={deActivateEdit}
                               value={status}/>
                    </div>
                }
            </div>
        )

}