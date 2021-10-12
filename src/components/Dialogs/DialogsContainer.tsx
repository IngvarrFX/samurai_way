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


type DialogsContainerPropsType = {
    store: Store
}


// export const DialogsContainer = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state: StateType = store.getState()
//
//
//                     let addPostHandler = () => {
//                         store.dispatch(addMessageActionCreator())
//                     }
//                     const onChangeHandler = (text: string) => {
//                         store.dispatch(updateMessageActionCreator(text))
//                     }
//                     return (
//                         <div>
//                             <Dialogs dialogs={state.dialogsPage.dialogsData}
//                                      messages={state.dialogsPage.messagesData}
//                                      newMessage={state.dialogsPage.newMessageText}
//                                      addPost={addPostHandler}
//                                      updateMessage={onChangeHandler}
//                             />
//                         </div>
//                     )
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }
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
        //dialogsPage: state.dialogsPage
        dialogs: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messagesData,
        newMessage: state.dialogsPage.newMessageText
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