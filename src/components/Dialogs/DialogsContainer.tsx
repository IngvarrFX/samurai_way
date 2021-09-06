import React from 'react';
import {
    addMessageActionCreator,
    updateMessageActionCreator,
} from '../../redux/messageReducer';
import {StateType} from '../../redux/state';
import {Dialogs} from './Dialogs';
import {Store} from 'redux';
import {StoreContext} from "../../StoreContext";


type DialogsContainerPropsType = {
    store: Store
}


export const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state: StateType = store.getState()


                    let addPostHandler = () => {
                        store.dispatch(addMessageActionCreator())
                    }
                    const onChangeHandler = (text: string) => {
                        store.dispatch(updateMessageActionCreator(text))
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
            }
        </StoreContext.Consumer>
    )
}