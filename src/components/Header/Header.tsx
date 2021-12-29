import React from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

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
                        <Button variant={"text"} onClick={props.logOut}>Log out</Button>
                    </div>

                    :
                    <div>
                        <NavLink to="/login" >
                            <Button variant={"text"}>Login</Button>
                        </NavLink>
                    </div>
                }
            </div>
        </header>
    )
}
