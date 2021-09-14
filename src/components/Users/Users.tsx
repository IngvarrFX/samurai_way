import React from 'react'
import {UserType} from "../../redux/usersReducer";
import styles from './Users.module.css'
import {v1} from "uuid";

type UsersPropsType = {
    users: UserType[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
}

export const Users = (props: UsersPropsType) => {


    if (props.users.length === 0) {
        props.setUsers([
                {
                    id: v1(),
                    firstName: 'Ingvarr',
                    status: '"I am a boss"',
                    follow: true,
                    location: {country: "Canada", city: "Toronto"},
                    photoUser: 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'
                },
                {
                    id: v1(),
                    firstName: 'Oxi',
                    status: '"I am a boss too"',
                    follow: true,
                    location: {country: "Canada", city: "Toronto"},
                    photoUser: 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'

                },
                {
                    id: v1(),
                    firstName: 'Andrew',
                    status: '"I am a not boss"',
                    follow: false,
                    location: {country: "Russia", city: "Astrahan"},
                    photoUser: 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'

                },
                {
                    id: v1(),
                    firstName: 'Ando',
                    status: '"I am a traner"',
                    follow: false,
                    location: {country: "Russia", city: "Vladimir"},
                    photoUser: 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'

                }
            ]
        )
    }

    const onClickHandler = (userId: string, follow: boolean) => {
        if (follow) {
            props.unfollow(userId)
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
                            <button
                                onClick={() => onClickHandler(u.id, u.follow)}>{u.follow ? 'UNFOLLOW' : 'FOLLOW'}</button>
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