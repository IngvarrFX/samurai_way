import React from "react"
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/avatarDefault.png";
import styles from "./Users.module.css";
import {UserType} from "../../redux/usersReducer";


type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleIsFollowing: (isFetching: boolean, id: number) => void
    followingInProgress: Array<number>
}

export const User = (props: UserPropsType) => {
    return (
        <div>
            <span>
                        <div>
                            <NavLink to={"/profile/" + props.user.id}>
                            <img src={props.user.photos.small !== null ? props.user.photos.small : userPhoto}
                                 className={styles.photo}
                                 alt="avatar"/>
                                </NavLink>
                        </div>
                        <div>
                            {props.user.followed
                                ?
                                <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                        onClick={() => {
                                            props.unfollow(props.user.id)
                                        }}>Unfollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                        onClick={() => {
                                            props.follow(props.user.id)
                                        }}>Follow</button>
                            }
                        </div>
                    </span>
            <span>
                        <span>
                            <div>{props.user.name}</div>
                            <div>{props.user.status}</div>
                        </span>
                         <span>
                             <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </span>
        </div>
    )
}