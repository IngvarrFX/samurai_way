import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {NavBar} from './components/NavBar/NavBar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    ActionsType, /*AddPostActionType,*/
    StateType,
    StoreType, /*UpdateNewPostTextActionType,*/
} from './redux/state';

type AppPropsType = {
    store: StoreType
    /*addPost: () => void
    updatePostText: (text: string) => void*/
    dispatch: (action: ActionsType) => void

}

const App = (props: AppPropsType) => {
    const state = props.store.getState()
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() => <Dialogs dialogs={state.dialogsPage.dialogsData}
                                                                  messages={state.messagePage.messagesData}
                                                                  newMessage={state.messagePage.newMessageText}
                                                                  dispatch={props.store.dispatch.bind(props.store)}
                    />}/>
                    <Route path="/profile" render={() => <Profile posts={state.profilePage.postsData}
                                                                  newPostText={state.profilePage.newPostText}
                                                                  dispatch={props.store.dispatch.bind(props.store)}
                        /*updatePostText={props.store.updateNewPostText.bind(props.store)}*/
                    />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
