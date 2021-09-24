import React from 'react'
import {UserType} from '../../redux/usersReducer';
import styles from './Users.module.css'
import axios from 'axios'
import userPhoto from '../../../src/assets/images/avatarDefault.png'

type UsersPropsType = {
    users: UserType[]
    pageCount: number
    totalCount: number
    currentPage: number
    count: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number)=> void
}


class UsersC extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.count}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalCount(response.data.totalCount)
        })
    }


    onSetPage = (pageNumber: number) => {
        alert(pageNumber)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.count}`).then(response => {
            this.props.setCurrentPage(response.data.items)
        })
    }


    render() {


        let pagesC = Math.ceil(this.props.totalCount / this.props.pageCount)
        console.log(this.props.totalCount)
        console.log(this.props.pageCount)
        let pages = []
        for (let i = 1; i <= pagesC; i++) {
            pages.push(i)
        }
        return (
            <div>
            <div>
                {pages.map((p, index) => {

                    return <span key={index} onClick={() => {this.onSetPage(p)}} className={this.props.currentPage ? styles.selectedPage: ''}>[{p}]</span>
                })}
            </div>
            <ul>
                {this.props.users.map(u => {
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
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                :
                                <button onClick={() => {
                                    this.props.follow(u.id)
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
}

export default UsersC