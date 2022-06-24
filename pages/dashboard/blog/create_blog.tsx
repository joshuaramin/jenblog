import React, {  SyntheticEvent, useState } from 'react'
import styles from '../../../styles/dashboard/components/createBlog.module.scss'
import { gql, useMutation } from '@apollo/client'
import dynamic from 'next/dynamic'
import View from '../../../components/view'



const slowFade = gql`mutation Mutation($title: String!, $body: String!, $userId: ID!) {
    createdPost(title: $title, body: $body, userID: $userId) {
      postID
      title
      body
      createdAt
    }
  }`

const Editors = dynamic(() =>
    import('../../../components/RichEditor'), {
    ssr: false
})
export default function CreateBlog() {


    const [ Hat, setHat ] = useState("")
    const [ body, setBody ] = useState("")
    const [ createdPost, { data } ] = useMutation(slowFade, {
        variables: {
            title: Hat,
            body: body,
            userId: "62abd963e0d791b7b7923d35"
        },
        errorPolicy: "all",
        onCompleted(data) {
            console.log(data)
        },
        onError: (e) => {
            console.log(e.message)
        }
    })
    console.log(data)
    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault()
        createdPost()
    }

    return (
        <div className={styles.container}>
            <div className={styles.con}>
                <form onSubmit={submitForm}>
                    <input type="text" className={styles.title} value={Hat} onChange={(e: any) => setHat(e.target.value)} placeholder="Title Here" />
                    <Editors body={body} changeBody={setBody} />
                    <button className={styles.submit} type='submit'>Submit</button>
                </form>
            </div>
            <View title={Hat} body={body} />
        </div>
    )
}
