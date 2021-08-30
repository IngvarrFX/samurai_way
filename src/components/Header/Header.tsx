import React from "react";
import style from "./Header.module.css"

export const Header = () => {
    return (
            <header className={style.header}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4MuXyd8KEmHlFuKFbMftU-rcm3zcORkaQCw&usqp=CAU"
                    alt="logo"/>
            </header>
    )
}