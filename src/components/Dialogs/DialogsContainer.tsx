import React, {ComponentType} from "react";
import {addMessageActionCreator, DialogsType, MessageType,} from "../../redux/messageReducer";
import {Dialogs} from "./Dialogs";
import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStateToPropsType = {
    dialogs: DialogsType[]
    messages: MessageType[]
}


type MapDispatchToPropsType = {
    addPost: (value: string) => void
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messagesData,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (value: string) => {
            dispatch(addMessageActionCreator(value))
        }
    }
}


export default compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)(Dialogs)