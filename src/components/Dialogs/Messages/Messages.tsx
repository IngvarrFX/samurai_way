import style from '../Dialogs.module.css';
import React from 'react';

type MessagesPropsType = {
    message: string
}
export const Messages = (props: MessagesPropsType) => {
    return (
            <div className={style.dialog}>{props.message}</div>
    )
}