import React from 'react'
import HtmlParser from 'react-html-parser'
import { blogQuery, getBlogID, views } from '../../components/graphql/postSchema'
import { client } from '../_app'
import styles from '../../styles/children/blodid.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
export const getStaticPaths = async () => {
  const { data: { view } } = await client.query({
    query: views
  })


  const paths = view.map(({ postID }: any) => {
    return { params: { id: postID } }
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
    }
  })

  return {
    props: {
      post: postID
    }
  }
}


interface Post {
  postID: string
  title: string
  body: string
  createdAt: string
}
export default function BlogID({ post }: any) {


  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.backBtn}>
        <button onClick={() => router.push("/Blog")}>
          <Image src="/icon/chevron-left.svg" alt="left" height={25} width={25} /> Back
        </button>
      </div>
      {post.map(({ postID, title, body, createdAt }: Post) => (
        <div key={postID} className={styles.con}>
          <Head>
            <title>{title}</title>
          </Head>
          <div className={styles.parser}>
            <h2 className={styles.title}>{title}</h2>
            <div>{HtmlParser(body)}</div>
          </div>
          <div className={styles.author}>
            <div>
              <Image objectFit='cover' src="/profile/jenniscott.jpg" alt="scott" height="30" width="30" />
            </div>
            <span>Jennifer Scott / </span>
            <span className={styles.date}> {Intl.DateTimeFormat("en-US", {
              dateStyle: "medium"
            }).format(new Date(createdAt))}</span>
          </div>
        </div>

      ))}
    </div>
  )
}
