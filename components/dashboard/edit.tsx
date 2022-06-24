import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false
})
import React, { useState } from 'react'
import styles from '../../styles/dashboard/components/edit.module.scss'
import {  useMutation } from '@apollo/client'
import { updatePost } from '../graphql/postCreateSchema'
import { useRouter } from 'next/router'


interface Post {
  postID: string
  title: string
  body: string
}

export default function Edit({ post }: any) {

  const paths = post.map(({ body, postID, title }: any) => {
    return { params: { body, postID, title } }
  })


  const [ title, setTitle ] = useState(paths[ 0 ].params.title)
  const [ bods, setBody ] = useState(paths[ 0 ].params.body)

  const router = useRouter()
  const [ updateME ] = useMutation(updatePost)
  const submitUpdatepost = () => {
    updateME({
      variables: {
        postId: paths[ 0 ].params.postID,
        title: title,
        body: bods
      },
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onCompleted: data => {
        data ? router.push("/dashboard/blog") : null;
      }
    })
    router.reload()

  }


  return (
    <div className={styles.container}>
      <div className={styles.con}>
        {post.map(({ postID, title, body }: Post) => (
          <div key={postID}>
            <form onSubmit={submitUpdatepost}>
              <input type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)}
                placeholder={title} />
              <RichTextEditor
                autoCorrect="true"
                value={body}
                onChange={setBody}
                spellCheck='true'
                radius={'sm'}
                sticky={true}
              />

              <div className={styles.btnGrp}>
                <button type="submit" className={styles.hello}>Submit</button>
                <button className={styles.hello}>Cancel</button>
              </div>
            </form>

          </div>
        ))}
      </div>
    </div>
  )
}
