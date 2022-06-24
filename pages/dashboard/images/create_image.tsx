import React, { useState, SyntheticEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
import styles from '../../../styles/dashboard/components/createImage.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'


import dynamic from 'next/dynamic'


const Preview = dynamic(() => import("../../../components/preview"), {
    ssr: false
})

const imageGQL = gql`
    mutation Mutation($title: String!, $userId: ID!, $file: Upload!) {
  createImage(title: $title, userID: $userId, file: $file) {
    imageID
    title
    image
    createdAt
  }
}
`


export default function CreateImage({ userID }: any) {
    const token = Cookie.get("access_token")

    token ? { const: { userID } = jwtDecode(token) } : null
    const [ imagesUpload, { data } ] = useMutation(imageGQL)

    const [ me, setTitle ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState(null)

    const router = useRouter()



    const imageSubmitForm = async (e: SyntheticEvent) => {
        e.preventDefault()
        await imagesUpload({
            variables: {
                userId: userID,
                title: me,
                file: selectedFile
            }, onCompleted(data) {
                console.log(data)

            },
            onError(err) {
                console.log(err.message
                )
            }
        })

    }

    console.log(data)

    const handleInputFile = (e: any) => {
        setSelectedFile(e.target.files[ 0 ])
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Create Image</title>
            </Head>
            <div className={styles.con}>
                <div className={styles.backBtn}>
                    <button onClick={() => router.push("/dashboard/images")}>
                        <Image src="/icon/chevron-left.svg" alt="left" height={25} width={25} /> Back
                    </button>
                </div>
                <form onSubmit={imageSubmitForm}>
                    <input type="text" value={me} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                    <input type="file" onChange={handleInputFile} />

                    <button type="submit">Submit</button>
                </form>
                <Preview selectedFile={selectedFile} />
            </div>
        </div >
    )
}
