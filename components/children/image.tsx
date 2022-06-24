import React from 'react'
import styles from '../../styles/children/images.module.scss'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'

const imageQueryGQL = gql`
query ImageLimit($limit: Int!, $offset: Int!) {
  imageLimit(limit: $limit, offset: $offset) {
    imageID
    title
    image
    createdAt
  }
}
  `


interface Image {
    imageID: string
    title: string
    image: string
    createdAt: string
}


export default function Images() {


    const router = useRouter()

    const { loading, data, error } = useQuery(imageQueryGQL, {
        variables: {
            limit: 6, offset: 0
        }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    return (
        <div className={styles.container}>
            <div className={styles.conTitle}>
                <h2>Latest Images</h2>
            </div>
            <div className={styles.con}>
                {data.imageLimit.map(({ imageID, title, image, createdAt }: Image) => (
                    <div key={imageID}>
                        <div className={styles.imageContainer}>
                            <Image src={image}
                                placeholder="empty"
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
