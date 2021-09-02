import React, {ChangeEvent, RefObject} from 'react';
import {NavLink} from 'react-router-dom';
import style from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Messages} from './Messages/Messages';
import {
    addMessageActionCreator,
    updateMessageActionCreator,
} from '../../redux/messageReducer';
import {ActionsType} from '../../redux/state';


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
    dispatch: (action: ActionsType) => void
}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElement = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map((m) => <Messages key={m.id} message={m.message}/>)

    let newMessageElement: RefObject<HTMLTextAreaElement> = React.createRef()

    let addPostHandler = () => {
        if (newMessageElement.current) {
            props.dispatch(addMessageActionCreator())
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (newMessageElement.current) {
            props.dispatch(updateMessageActionCreator(newMessageElement.current.value))
        }
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={style.messages}>
                {messagesElement}
                <div>
                    <textarea ref={newMessageElement}
                              onChange={onChangeHandler}
                              value={props.newMessage}
                              placeholder={'Enter your message'}
                    ></textarea>
                </div>
                <div>
                    <button onClick={addPostHandler}>Send message</button>
                </div>
            </div>

        </div>
    )
}