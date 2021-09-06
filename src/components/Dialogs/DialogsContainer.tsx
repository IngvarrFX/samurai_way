import React, {ChangeEvent, RefObject} from 'react';
import style from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Messages} from './Messages/Messages';
import {
    addMessageActionCreator,
    updateMessageActionCreator,
} from '../../redux/messageReducer';
import {StateType} from '../../redux/state';
import {Dialogs} from './Dialogs';
import {Store} from 'redux';


type DialogsContainerPropsType = {
    store: Store
}


export const DialogsContainer = (props: DialogsContainerPropsType) => {

    let state: StateType = props.store.getState()


    let addPostHandler = () => {
        props.store.dispatch(addMessageActionCreator())
    }
    const onChangeHandler = (text: string) => {
        props.store.dispatch(updateMessageActionCreator(text))
    }

    return (
        <div>
            <Dialogs dialogs={state.dialogsPage.dialogsData}
                     messages={state.dialogsPage.messagesData}
                     newMessage={state.dialogsPage.newMessageText}
                     addPost={addPostHandler}
                     updateMessage={onChangeHandler}
            />

        </div>
    )
}