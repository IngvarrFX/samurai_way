import React, {ComponentType} from "react"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/reduxStore";
import {compose} from "redux";


type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

type WithAuthRedirectType = {
    isAuth: boolean
}


export function withAuthRedirect<P>(Component: ComponentType<P>) {
    let ContainerComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={"/login"}/>
        return <Component {...restProps as P}/>
    }


    let WithAuthRedirectContainer = compose(connect(mapStateToProps))(ContainerComponent)
    return WithAuthRedirectContainer
}


//Omit<P,'isAuth'>