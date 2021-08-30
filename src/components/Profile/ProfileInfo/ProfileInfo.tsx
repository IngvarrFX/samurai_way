
import {MyPosts} from '../MyPosts/MyPosts';
import React from 'react';
import style from './ProfileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://hbr.org/resources/images/article_assets/2021/04/Apr21_16_1249623281.jpg" alt=""/>
            </div>
            <div className={style.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}