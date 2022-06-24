import React from 'react'
import styles from '../../styles/children/blog.module.scss'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
const limitss = gql`
    query PostQueryLimit($limit: Int!, $offset: Int!) {
    postQueryLimit(limit: $limit, offset: $offset) {
        postID
        title
        body
        createdAt
        }
    }
`

export default function Blog() {

    const router = useRouter()
    const { loading, data: me, error } = useQuery(limitss, {
        variables: {
            limit: 6, offset: 0
        }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error...</p>
    return (
        <div className={styles.container}>
            <div className={styles.conTitle}>
                <h2>Latest Blogs</h2>
            </div>
            <div className={styles.con}>
                {me.postQueryLimit.map(({ title, postID, createdAt }: any) => (
                    <div className={styles.card} key={postID}>
                        <div className={styles.titleHolder}>
                            <h2>{title}</h2>
                        </div>
                        <div className={styles.author}>
                            <div className={styles.authorCon}>
                                <span>Created at: {Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(createdAt))}</span>
                            </div>
                            <button onClick={() => router.push(`/Blog/${postID}`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
