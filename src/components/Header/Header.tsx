import React from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    profilePhoto: string | null | undefined
    logOut: () => void

}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={style.header}>
            <NavLink to={"/"}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4MuXyd8KEmHlFuKFbMftU-rcm3zcORkaQCw&usqp=CAU"
                    alt="logo"/>
            </NavLink>
            <div className={style.loginBlock}>
                {props.isAuth
                    ?
                    <div>
                        {props.login}
                        <button onClick={props.logOut}>Log out</button>
                    </div>

                    :
                    <div>
                        {/*<img src={props.profilePhoto ? props.profilePhoto : avatarDefault} alt=""/>*/}
                        <NavLink to="/login">Login</NavLink>
                    </div>
                }
            </div>
        </header>
    )
}