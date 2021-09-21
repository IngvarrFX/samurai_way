import React from 'react'
import {UserType} from '../../redux/usersReducer';
import styles from './Users.module.css'
import {v1} from 'uuid';
import axios from 'axios'
import userPhoto from '../../../src/assets/images/avatarDefault.png'

type UsersPropsType = {
    users: UserType[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
}

export const Users = (props: UsersPropsType) => {

    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })

        }

        /* props.setUsers([
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
             ]*/

    }

    const onClickHandler = (userId: string, follow: boolean) => {
        if (follow) {
            props.unfollow(userId)
        } else {
            props.follow(userId)
        }
    }


    return (
        <>
            {props.users.length === 0
                ?

                <button onClick={getUsers}>Get users</button>
                :
                <ul>
                    {props.users.map(u => {
                        return <div>
                    <span>
                        <div>
                            {/*<img src={u.photoUser} className={styles.photo} alt="avatar"/>*/}
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.photo}
                                 alt="avatar"/>
                        </div>
                        <div>
                            <button
                                onClick={() => onClickHandler(u.id, u.follow)}>{u.follow ? 'UNFOLLOW' : 'FOLLOW'}</button>
                        </div>
                    </span>
                            <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                         <span>
                             <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>

                        </div>
                    })
                    }
                </ul>
            }
        </>
    )
}