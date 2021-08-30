import style from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import React from 'react';

type DialogItemPropsType = {
    name:string
    id: string
}

export const DialogItem = (props:DialogItemPropsType) => {
    return(
        <div className={style.dialogName + ' ' + style.active}>
            <NavLink to={`/dialogs/${props.id}`} activeClassName={style.activeLink}>{props.name}</NavLink>
        </div>
    )
}