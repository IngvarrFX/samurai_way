import React from 'react';
import {StoreType} from "./redux/state";
import {Store} from "redux";


export const StoreContext = React.createContext({} as Store)

export type ProviderPropsType = {
    store:Store
    children:React.ReactNode

}

export const Provider = (props:ProviderPropsType) => {
    return (
        <div>
            <StoreContext.Provider
                value={props.store}>
            {props.children}
            </StoreContext.Provider>
        </div>
    )
}