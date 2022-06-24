import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styles from '../../../styles/dashboard/blog.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { blogSub, blogQuery, blogDeleteQuery } from '../../../components/graphql/postSchema'


interface Post {
    postID: string
    title: string
    createdAt: string
}


export default function Blog() {
    const router = useRouter()


    const [ page, setPage ] = useState(0)
    const PAGE_SIZE = 5;

    const { loading, data, error, subscribeToMore } = useQuery(blogQuery, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE
        }
    })


    useEffect(() => {
        subscribeToMore({
            document: blogSub,
            updateQuery(prev, { subscriptionData }) {
                if (!subscriptionData) return prev
                const newPost = subscriptionData.data.postSubscription
                return Object.assign({}, {
                    postQuery: [ ...prev.postQuery, newPost ]
                })
            }
        })
    }, [ subscribeToMore ])

    const [ deleteBlogQuery ] = useMutation(blogDeleteQuery)
    const handleViewClick = (postID: any) => {

        deleteBlogQuery({
            variables: {
                postId: postID
            },
            errorPolicy: "all",
            update(cache) {
                return cache.modify({
                    fields: {
                        postQuery(existingPost, { readField }) {
                            return existingPost.filter(
                                (postref: any) => postID !== readField('postID', postref)
                            )
                        }
                    }
                })
            }
        })
    }


    if (loading) return <p>HELLO WORLD</p>
    if (error) return <p>HELLO ERROR OCCURED</p>
    return (
        <div className={styles.container}>
            <title>Blog</title>
            <div className={styles.opt}>
                <div className={styles.connn}>
                    <h2>Blog</h2>
                    <button onClick={() => router.push("/dashboard/blog/create_blog")}>
                        <Image src="/icon/plus-circle.svg" height={30} width={30} alt="trash" />
                    </button>
                </div>
                <div className={styles.buttons}>
                    <button disabled={!page} onClick={() => setPage(prev => prev - 1)}>
                        <Image src="/icon/chevron-left.svg" alt="chevron" height={30} width={30} />
                    </button>
                    <button disabled={data.postQuery.length < 5} onClick={() => setPage(prev => prev + 1)}>
                        <Image src="/icon/chevron-right.svg" alt="chevron" height={30} width={30} />
                    </button>
                </div>
                <div className={styles.con}>
                    {data.postQuery.map(({ postID, title, createdAt }: Post) => (
                        <div className={styles.box} key={postID}>
                            <h2 onClick={() => router.push(`/dashboard/blog/${postID}/`)}>{title}</h2>
                            <span>{Intl.DateTimeFormat("ph", {
                                dateStyle: "long"
                            }).format(new Date(createdAt))}</span>
                            <div className={styles.buttons}>
                                <button onClick={() => router.push(`/dashboard/blog/${postID}`)}>
                                    <Image src="/icon/external-link.svg" height={30} width={30} alt="trash" />
                                </button>
                                <button onClick={() => handleViewClick(postID)}>
                                    <Image src="/icon/trash.svg" height={30} width={30} alt="trash" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}
