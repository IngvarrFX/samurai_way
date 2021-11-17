import styles from "./Pagination.module.css"
import React from "react";

type PaginationPropsType = {
    count: number
    totalUsers: number
    currentPage: number
    onSetPage: (pageNumber: number) => void
}

export const Pagination = (props: PaginationPropsType) => {
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
        </div>
    )
}