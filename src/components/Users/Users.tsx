import React, {ChangeEvent} from "react";
import {UserType} from "../../redux/usersReducer";
import {Paginator} from "../../common/Pagination/Paginator";
import {User} from "./User";


type UsersPropsType = {
    users: UserType[]
    usersOnPage: number
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
                <Paginator
                    totalItems={props.totalUsers}
                    itemsOnPage={props.usersOnPage}
                    currentPage={props.currentPage}
                    onSetPage={props.onSetPage}
                    portionSize={5}
                />
                {/*<Pagination onChange={setPageHandler} count={10} page={props.currentPage} color="primary" />*/}
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
