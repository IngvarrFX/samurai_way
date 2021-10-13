import React, {ChangeEvent, RefObject} from "react";
import style from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Messages} from "./Messages/Messages";
import {Redirect} from "react-router-dom";


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
    newMessage: string
    dialogs: Array<DialogNamesType>
    messages: Array<MessagesType>
    isAuth:boolean
    addPost: () => void
    updateMessage: (text: string) => void
}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElement = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map((m) => <Messages key={m.id} message={m.message}/>)

    let newMessageElement: RefObject<HTMLTextAreaElement> = React.createRef()

    let addPostHandler = () => {
        props.addPost()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateMessage(e.currentTarget.value)
    }

    if(!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={style.messages}>
                {messagesElement}
                <div className={style.textArea}>
                    <textarea ref={newMessageElement}
                              onChange={onChangeHandler}
                              value={props.newMessage}
                              placeholder={'Enter your message'}
                    ></textarea>
                </div>
                <div>
                    <button onClick={addPostHandler}>Send message</button>
                </div>
                <div>
                </div>
            </div>

        </div>
    )
}