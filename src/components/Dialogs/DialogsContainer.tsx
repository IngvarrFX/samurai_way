import React, {ComponentType} from "react";
import {
    addMessageActionCreator,
    DialogsType,
    MessageType,
    updateMessageActionCreator,
} from "../../redux/messageReducer";
import {Dialogs} from "./Dialogs";
import {compose, Dispatch, Store} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";



type MapStateToPropsType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    newMessage: string
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

// let WithAuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)(Dialogs)