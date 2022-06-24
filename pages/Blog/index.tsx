import React, { useState } from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { views } from '../../components/graphql/postSchema'
import { client } from '../_app'
import styles from '../../styles/blog.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import Search from '../../components/search'


const goSearch = gql`
  query Search($search: String!) {
  search(search: $search) {
    postID
    title
    body
  }
}
`

export const getStaticProps: GetStaticProps = async () => {
  const { data: { view } } = await client.query({
    query: views,
  })

  return {
    props: {
      post: view
    }
  }
}
export default function Blog({ post }: any) {
  const router = useRouter()
  const [ search, setSearch ] = useState("")
  const [ searchMe, { data } ] = useLazyQuery(goSearch)



  const goSearchChange = (e: any) => {
    searchMe({
      variables: {
        search
      }
    })
    setSearch(e.target.value)
  }
  console.log(data?.search)
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
      </Head>
      <div className={styles.searchCon}>
        <input type="search" onChange={goSearchChange} placeholder="Search..." />
      </div>
      <div className={styles.con}>
        {search ? <Search data={data} /> : <>
          {post.map(({ postID, title, createdAt }: any) => (
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
          ))}</>}
      </div>
    </div>
  )
}
