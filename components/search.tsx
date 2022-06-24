import styles from '../styles/search.module.scss'
import React from 'react'
import { useRouter } from 'next/router'
import { convert } from 'html-to-text'
import Image from 'next/image'
export default function Search({ data }: any) {

    const router = useRouter()
    return (
        <div className={styles.container}>
            {data?.search.length === 0 ?
                <div style={{ width: "100%", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Image src="/nofound/nf2.png" alt="Not Found" objectFit='contain' layout='fixed' height="300" width="300" />
                    <h2 style={{ color: "#c6c6c6" }}>Not Found</h2>
                </div> :
                <>
                    {data?.search.map(({ title, postID, body }: any) => (
                        <div className={styles.card} key={postID}>
                            <div className={styles.titleHolder}>
                                <h2 onClick={() => router.push(`/Blog/${postID}`)}>{title}</h2>
                            </div>
                            <div className={styles.box}>
                                <p style={{ whiteSpace: "nowrap", width: "100%", textOverflow: "ellipsis", overflow: "hidden", textDecoration: "none" }}>{convert(body, {
                                    wordwrap: 200
                                })}</p>
                            </div>
                        </div>
                    ))}

                </>
            }
        </div>
    )
}
