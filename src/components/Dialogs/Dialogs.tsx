import React from "react";
import style from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Messages} from "./Messages/Messages";
import {Dialog} from "../../form/dialogForm";


export type DialogNamesType = {
    id: string
    name: string
}

export type MessagesType = {
    id: string
    message: string
    likesCount: number
}

type DialogsPropsType = {
    dialogs: Array<DialogNamesType>
    messages: Array<MessagesType>
    addPost: (value: string) => void
}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElement = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map((m) => <Messages key={m.id} message={m.message}/>)

    const addNewMessageBody = (value: string) => {
        props.addPost(value)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={style.messages}>
                {messagesElement}
                <Dialog addNewMessageBody={addNewMessageBody}/>
                <div>
                </div>
            </div>

        </div>
    )
}