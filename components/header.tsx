import React from 'react'
import styles from '../styles/header.module.scss'
import { useRouter } from 'next/router'
import { client } from '../pages/_app'
import Cookie from 'js-cookie'

export default function Header() {

    const router = useRouter()


    const logoutBtn = () => {
        client.clearStore()
        Cookie.remove("access_token")
        router.push("/")
    }
    return (
        <div className={styles.container}>
            <div className={styles.con}>
                <h2>Jennifer Scott</h2>
                {router.asPath.includes("/dashboard") ?
                    <button onClick={logoutBtn}>
                        Logout
                    </button>
                    :
                    <button onClick={() => router.push("/auth/login")}>
                        Login
                    </button>
                }
            </div>
        </div >
    )
}
