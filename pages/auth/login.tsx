import React, { useState, SyntheticEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import styles from '../../styles/auth/login.module.scss'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Cookie from 'js-cookie'

const loginGQL = gql`
    mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
      }
    }
`
export default function Login() {
    const router = useRouter();

    const [ login, setLogin ] = useState({
        username: "",
        password: "",
    })
    const [ loginM, { error } ] = useMutation(loginGQL, {
        variables: {
            username: login.username,
            password: login.password
        },
        onCompleted(data) {
            if (data) {
                Cookie.set("access_token", data.login.token, {
                    sameSite: "none",
                    secure: true,
                    expires: 60 * 60 * 24 * 7
                })
                router.push("/dashboard")
            }
        },
        onError: (e) => {
            console.log(e.message)
        }
    })


    const submitLogin = (e: SyntheticEvent) => {
        e.preventDefault()
        loginM()
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.con}>
                <form onSubmit={submitLogin}>
                    <h2>Login</h2>
                    {error ? error.message : null}
                    <input type="text" value={login.username}
                        required onChange={(e) => setLogin({ ...login, username: e.target.value })} placeholder="Username" />
                    <input type="password"
                        required value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
