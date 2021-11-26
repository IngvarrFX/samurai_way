import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./ProfileStatus.module.css"

type PropsType = {
    status: string
    updateProfileStatus: (status: string) => void
}


export const ProfileStatusWithHooks = (props:PropsType ) => {


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

        useEffect(()=> {
            setStatus(props.status)
        },[props.status])

        return (
            <div className={style.status}>
                {!edit
                    ?
                    <div>
                        <div
                            onDoubleClick={activateEdit}><b>Status</b>: {props.status || "Change your profile status"}</div>
                        {/*<button onClick={requestStat}>request Status</button>*/}
                    </div>
                    :
                    <div>
                        <b>Status</b>:
                        <input autoFocus onChange={changeStatus} onBlur={deActivateEdit}
                               value={status}/>
                    </div>
                }
            </div>
        )

}