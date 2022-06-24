import React from 'react'
import styles from '../styles/dashboard/components/view.module.scss';
import HTMLParser from 'react-html-parser'
export default function View({ title, body }: any) {
    return (
        <div className={styles.container}>
            <div>
                <h2>{title}</h2>
            </div>
            <div>{HTMLParser(body)}</div>
        </div>
    )
}
