import React from "react";
import preloader from '../../assets/images/810.svg'
import styles from './Preloader.module.css'


type PropsType = {
}


export const Preloader = (props: PropsType) => {
    return(
        <div>
            <img className={styles.preloader} src={preloader} alt="preloader"/>
        </div>
    )
}