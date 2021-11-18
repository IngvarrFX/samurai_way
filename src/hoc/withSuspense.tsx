import {ComponentType} from "react";
import React from "react";
import {Preloader} from "../common/preloader/Preloader";


export function withSuspense<P>(Component: ComponentType) {
    let ContainerComponent = (props: any) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </React.Suspense>
    }
    return ContainerComponent
}