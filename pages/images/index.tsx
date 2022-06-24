import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/image.module.scss'
import { gql } from '@apollo/client'
import { client } from '../_app'
const imageQueryGQL = gql`query Query {
    imageViewAll {
      imageID
      title
      image
      createdAt
    }
  }
`

export const getServerSideProps = async () => {
    const { data: { imageViewAll } } = await client.query({
        query: imageQueryGQL,

    })
    return {
        props: {
            blah: imageViewAll
        }
    }
}


interface Image {
    imageID: string
    title: string
    image: string
}

export default function Index({ blah }: any) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Images</title>
            </Head>
            <div className={styles.con}>
                {blah.map(({ imageID, title, image }: Image) => (
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
    )
}
