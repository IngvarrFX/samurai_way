import React from 'react';
import style from './Post.module.css'


type PostPropsType = {
    message: string
    likeCounts: number
}

export const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={style.item}>
            <img
                src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095529-stock-illustration-profile-icon-male-avatar.jpg"
                alt=""/>
            {props.message}
            <div>
                <span>like </span> {props.likeCounts}
            </div>
        </div>
    )
}