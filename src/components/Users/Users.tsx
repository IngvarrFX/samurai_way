import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/avatarDefault.png";
import {UserType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import {followedAPI} from "../../api/api";

type UsersPropsType = {
    users: UserType[]
    count: number
    totalUsers: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onSetPage: (pageNumber: number) => void
    toggleIsFollowing: (isFetching: boolean, id: number) => void
    followingInProgress: Array<number>
}


export const Users = (props: UsersPropsType) => {

    let pagesWithUsers = Math.ceil(props.totalUsers / props.count)
    let pages = []
    for (let i = 1; i <= pagesWithUsers; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map((p, index) => {

                    return <span key={index} onClick={() => {
                        props.onSetPage(p)
                    }} className={props.currentPage === p ? styles.selectedPage : ""}> {p} </span>
                })}
            </div>
            <ul>
                {props.users.map(u => {
                    return <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + u.id}>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.photo}
                                 alt="avatar"/>
                                </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ?
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.toggleIsFollowing(true, u.id)
                                    followedAPI.unFollowed(u.id)
                                        .then(data => {
                                            if (data.resultCode == 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.toggleIsFollowing(false, u.id)
                                        })
                                }}>Unfollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.toggleIsFollowing(true, u.id)
                                    followedAPI.followed(u.id)
                                        .then(data => {
                                            if (data.resultCode == 0) {
                                                props.follow(u.id)
                                            }
                                            props.toggleIsFollowing(false, u.id)
                                        })
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
                             <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>

                    </div>
                })
                }
            </ul>
        </div>
    )
}