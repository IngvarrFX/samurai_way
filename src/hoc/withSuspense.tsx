import {ComponentType} from "react";
import React from "react";
import {Preloader} from "../common/preloader/Preloader";


export function withSuspense<P>(Component: ComponentType) {
    let ContainerComponent = (props:  P) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props as P}/>
        </React.Suspense>
    }
    return ContainerComponent
}