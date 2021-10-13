import React from "react";
import {
    addMessageActionCreator,
    DialogsType,
    MessageType,
    updateMessageActionCreator,
} from "../../redux/messageReducer";
import {Dialogs} from "./Dialogs";
import {Dispatch, Store} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";



type MapStateToPropsType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    newMessage: string
    isAuth: boolean
}


type MapDispatchToPropsType = {
    addPost: () => void
    updateMessage: (text: string) => void
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messagesData,
        newMessage: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addMessageActionCreator())
        },
        updateMessage: (text: string) => {
            dispatch(updateMessageActionCreator(text))
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)