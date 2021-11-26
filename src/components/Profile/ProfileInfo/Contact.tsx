import style from "./ProfileInfo.module.css";
import React from "react";

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}


export const Contact = (props: ContactPropsType) => {
    return (
        <div>
            <b className={style.contacts}>{props.contactTitle}</b>:{props.contactValue}
        </div>
    )
}