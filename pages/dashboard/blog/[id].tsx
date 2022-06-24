import React, { useState } from 'react'
import { client } from '../../_app'
import { blogQuery, getBlogID, views } from '../../../components/graphql/postSchema'
import Head from 'next/head'
import HtmlParser from 'react-html-parser'
import styles from '../../../styles/dashboard/components/id.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Edit from '../../../components/dashboard/edit'
import Post from '../../../components/dashboard/post'
export const getStaticPaths = async () => {


    const { data: { view } } = await client.query({
        query: views,
    })
    const paths = view.map(({ postID }: any) => {
        return {
            params: { id: postID }
        }
    })
    return {
        paths,
        fallback: false
    }
}


export const getStaticProps = async (context: any) => {
    const hello = context.params.id


    const { data: { postID } } = await client.query({
        query: getBlogID,
        variables: {
            postId: hello
        },

        notifyOnNetworkStatusChange: true
    })


    return {
        props: {
            post: postID,
        }
    }
}
interface Post {
    postID: string
    title: string
    body: string
}
export default function ID({ post }: any) {


    const router = useRouter()

    const [ edit, setEdited ] = useState(false)

    const handle = () => {
        setEdited(() => !edit)
    }


    const [ editable, setEditatble ] = useState(false)
    const editPage = () => {
        setEditatble(() => !editable)
    }
    return (
        <div className={styles.container}>
            <div className={styles.opt}>
                <button className={styles.optBtn} onClick={handle}>
                    <Image src="/icon/chevron-down.svg" alt="down" height={25} width={25} />
                </button>
                {edit ? <div className={styles.options}>
                    <button
                        className={styles.delBtn}
                        onClick={editPage}>Edit</button>
                </div> : null}
            </div>
            {!editable ?
                <Post post={post} />
                : <Edit post={post} />}
        </div>
    )
}
