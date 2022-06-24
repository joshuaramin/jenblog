import React from 'react'
import Head from 'next/head'
import styles from '../../styles/dashboard/components/id.module.scss'
import HtmlParser from 'react-html-parser'

interface Post {
    postID: string
    title: string
    body: string
}
export default function Post({ post }: any) {
    return (
        <div>
            {post.
                map(({ postID, title, body }: Post) => (
                    <div className={styles.con} key={postID}>
                        <Head>
                            <title>{title}</title>
                        </Head>
                        <div>
                            <h2 className={styles.title}>{title}</h2>
                            <div className={styles.parse}>
                                {HtmlParser(body)}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
