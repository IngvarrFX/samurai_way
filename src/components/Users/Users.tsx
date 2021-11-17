import React from "react";
import {UserType} from "../../redux/usersReducer";
import {Pagination} from "../../common/Pagination/Pagination";
import {User} from "./User";

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

    return (
        <div>
            <div>
                <Pagination
                    totalUsers={props.totalUsers}
                    count={props.count}
                    currentPage={props.currentPage}
                    onSetPage={props.onSetPage}
                />
            </div>
            <ul>
                {props.users.map(u => {
                    return <div key={u.id}>
                        <User user={u} follow={props.follow} followingInProgress={props.followingInProgress}
                              toggleIsFollowing={props.toggleIsFollowing} unfollow={props.unfollow}/>
                    </div>
                })
                }
            </ul>
        </div>
    )
}