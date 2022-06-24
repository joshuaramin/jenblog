import React, { useEffect, useState } from 'react'
import styles from '../../../styles/dashboard/images.module.scss'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'

const imageQueryGQL = gql`
query ImageLink($limit: Int!, $offset: Int!) {
  imageLink(limit: $limit, offset: $offset) {
    imageID
    title
    image
    createdAt
  }
}
  `



const ImageSub = gql`subscription Subscription {

    ImageSubscription {
      imageID
      title
      image
      createdAt
    }
  }`
interface Image {
    imageID: string
    title: string
    image: string
    createdAt: string
}


export default function Images() {
    const router = useRouter()

    const [ page, setPage ] = useState(0)
    const PAGE_SIZE = 8;
    const { loading, data, error, subscribeToMore } = useQuery(imageQueryGQL, {
        variables: {
            limit: PAGE_SIZE, offset: page * PAGE_SIZE
        }
    })

    useEffect(() => {
        subscribeToMore({
            document: ImageSub,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) return prev
                const newImage = subscriptionData.data.ImageSubscription
                return Object.assign({}, {
                    imageLink: [ ...prev.imageLink, newImage ]
                })
            }
        })
    }, [ subscribeToMore ])

    if (loading) return <p>Loading</p>
    if (error) return <p>Error...</p>
    return (
        <div className={styles.container}>
            {router.asPath.includes("/dashboard/images") ? <Head>
                <title>Images</title>
            </Head> : null
            }
            <div className={styles.opt}>
                <div>
                    <h2>Images</h2>
                    {router.asPath.includes("/dashboard/images") ? <button onClick={() => router.push("/dashboard/images/create_image")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button> : null
                    }
                </div>
            </div>
            <div className={styles.buttons}>
                <button disabled={!page} onClick={() => setPage(prev => prev - 1)}>
                    <Image src="/icon/chevron-left.svg" alt="chevron" height={30} width={30} />
                </button>
                <button disabled={data.imageLink.length <= 5} onClick={() => setPage(prev => prev + 1)}>
                    <Image src="/icon/chevron-right.svg" alt="chevron" height={30} width={30} />
                </button>
            </div>
            <div className={styles.con}>
                {data.imageLink.map(({ imageID, title, image }: Image) => (
                    <div key={imageID}>
                        <div className={styles.imageContainer}>
                            <Image src={image}
                                placeholder="empty"
                                priority
                                blurDataURL={image}
                                height="900" width="640"
                                quality={100}
                                layout='responsive'
                                alt={title} />
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
