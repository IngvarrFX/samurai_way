import React from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";
import avatarDefault from "../../assets/images/810.svg";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    profilePhoto: string | null | undefined
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={style.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4MuXyd8KEmHlFuKFbMftU-rcm3zcORkaQCw&usqp=CAU"
                alt="logo"/>
            <div className={style.loginBlock}>
                {props.isAuth
                    ?
                    props.login
                    :
                    <div>
                        <img src={props.profilePhoto? props.profilePhoto : avatarDefault } alt=""/>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                }
            </div>
        </header>
    )
}