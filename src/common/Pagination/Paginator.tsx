import styles from "./Pagination.module.css"
import React from "react";
import Pagination from '@mui/material/Pagination';

type PaginationPropsType = {
    itemsOnPage: number
    totalItems: number
    currentPage: number
    onSetPage: (pageNumber: number) => void
    portionSize: number
}

export const Paginator = (props: PaginationPropsType) => {
    let pagesWithItems = Math.ceil(props.totalItems / props.itemsOnPage)
    let pages = []
    for (let i = 1; i <= pagesWithItems; i++) {
        pages.push(i)
    }
    const setPageHandler = (event: React.ChangeEvent<unknown>, value: number)=> {
        props.onSetPage(value)
    }



    return (
        <div className={styles.paginationBlock}>
            <div className={styles.pagination}>
                <Pagination onChange={setPageHandler} count={pages.length} page={props.currentPage} color="primary" />
            </div>
        </div>
    )
}
