import React from 'react'
import styles from '../../styles/dashboard/Home.module.scss'
import Head from 'next/head'
import { client } from '../_app'
import { blogQuery, views } from '../../components/graphql/postSchema'
import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
export const getStaticProps = async () => {
  const { data: { view } } = await client.query({
    query: views
  })

  const { data: { imageViewAll } } = await client.query({
    query: gql`query ImageViewAll {
      imageViewAll {
        imageID
        title
        image
        createdAt
      }
    }`
  })
  const { data: { imageLink } } = await client.query({
    query: gql`query ImageLink($limit: Int!, $offset: Int!) {
      imageLink(limit: $limit, offset: $offset) {
        imageID
        title
        image
        createdAt
      }
    }`,
    variables: {
      limit: 6, offset: 4 * 2
    }
  })
  const { data: { postQuery } } = await client.query({
    query: blogQuery,
    variables: {
      limit: 6,
      offset: 0
    }
  })

  return {
    props: {
      length: view,
      imageLength: imageViewAll,
      post: postQuery,
      image: imageLink
    }
  }
}


interface Dashboard {
  length: [],
  post: []
  imageLength: []
  image: []
}

interface Post {
  postID: string
  createdAt: string
  title: string
}

interface Image {
  imageID: string
  image: string
  title: string
}
export default function Dashboard({ length, post, imageLength, image }: Dashboard) {
  
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={styles.con}>
        <h2>Overview</h2>
        <div className={styles.dashLength}>
          <div>
            <h3>{length.length + imageLength.length}</h3>
            <h2>All</h2>
          </div>
          <div>
            <h3>{length.length}</h3>
            <h2>Blog</h2>
          </div>
          <div>
            <h3>{imageLength.length}</h3>
            <h2>Images</h2>
          </div>
        </div>

        <h2>Latest Blog</h2>
        <div className={styles.latestBlog}>
          {post.map(({ postID, title, createdAt }: Post) => (
            <div className={styles.blogGrid} key={postID}>
              <div className={styles.card}>
                <h2>{title}</h2>
                <div>
                  <span>{Intl.DateTimeFormat("en", {
                    dateStyle: "long"
                  }).format(new Date(createdAt))}</span>
                  <button onClick={() => router.push(`/dashboard/blog/${postID}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2>Latest Image</h2>
        <div className={styles.latestImage}>
          {image.map(({ imageID, image, title }: Image) => (
            <div key={imageID}>
              <div className={styles.imageContainer}>
                <Image src={image}
                  placeholder="blur"
                  blurDataURL={image}
                  priority={true}
                  height="900" width="640"
                  quality={100}
                  layout='responsive'
                  alt={title} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div >
  )
}
