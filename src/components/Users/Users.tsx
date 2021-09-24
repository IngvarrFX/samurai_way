import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/avatarDefault.png";
import {UserType} from "../../redux/usersReducer";

type UsersPropsType = {
    users: UserType[]
    count: number
    totalUsers: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onSetPage: (pageNumber: number)=> void
}


export const Users = (props:UsersPropsType) => {

    let pagesWithUsers = Math.ceil(props.totalUsers / props.count)
    let pages = []
    for (let i = 1; i <= pagesWithUsers; i++) {
        pages.push(i)
    }
    return(
        <div>
            <div>
                {pages.map((p, index) => {

                    return <span key={index} onClick={() => {props.onSetPage(p)}} className={props.currentPage === p ? styles.selectedPage: ''}> {p} </span>
                })}
            </div>
            <ul>
                {props.users.map(u => {
                    return <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.photo}
                                 alt="avatar"/>
                        </div>
                        <div>
                            {u.follow
                                ?
                                <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                :
                                <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>
                            }
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
        </div>
    )
}