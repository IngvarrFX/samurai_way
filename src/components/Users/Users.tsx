import React from 'react'
import {UserType} from "../../redux/usersReducer";
import styles from './Users.module.css'

type UsersPropsType = {
    users: UserType[]
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: UserType) => void
}

export const Users = (props: UsersPropsType) => {

    const onClickHandler = (userId: string, follow: boolean) => {
        if (follow) {
            props.unFollow(userId)
        } else {
            props.follow(userId)
        }
    }
    return (
        <ul>
            {props.users.map(u => {
                return <div>
                    <span>
                        <div>
                            <img src={u.photoUser} className={styles.photo} alt="avatar"/>
                        </div>
                        <div>
                            <button onClick={() => onClickHandler(u.id, u.follow)}>{u.follow ? 'UNFOLLOW': 'FOLLOW'}</button>
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.firstName}</div>
                            <div>{u.status}</div>
                        </span>
                         <span>
                             <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>

                </div>
            })
            }
        </ul>


    )
}