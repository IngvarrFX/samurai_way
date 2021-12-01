import styles from "./Pagination.module.css"
import React from "react";

type PaginationPropsType = {
    itemsOnPage: number
    totalItems: number
    currentPage: number
    onSetPage: (pageNumber: number) => void
    portionSize: number
}

export const Pagination = (props: PaginationPropsType) => {
    let pagesWithItems = Math.ceil(props.totalItems / props.itemsOnPage)
    let pages = []
    for (let i = 1; i <= pagesWithItems; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesWithItems / props.portionSize)
    let [portionNumber, setPortionNumber] = React.useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize


    return (
        <div className={styles.paginationBlock}>
            <div className={styles.pagination}>
                <div>
                    <button disabled={portionNumber <= 1} onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}>PREV
                    </button>
                </div>
                <div className={styles.pageNumber}>
                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map((p, index) => {

                            return <button key={index} onClick={() => {
                                props.onSetPage(p)
                            }} className={props.currentPage === p ? styles.selectedPage : ""}> {p} </button>
                        })}
                </div>
                <div>
                    <button disabled={portionCount <= portionNumber} onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>NEXT
                    </button>
                </div>
            </div>
        </div>
    )
}
