import React from 'react'
import styles from '../styles/footer.module.scss'
import Navigation from './navigation'
export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.con}>
                <Navigation />
                <div>
                    <span>
                        {Intl.DateTimeFormat("en", {
                            dateStyle: "long"
                        }).format(Date.now())}/ jenniferscott@gmail.com
                    </span>
                </div>
            </div>
        </div>
    )
}
