import React from 'react'
import styles from '../../styles/children/about.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'

const socialLink = [
    { "link": "/icon/social/github.svg", "href": "https://github.com/" },
    { "link": "/icon/social/twitter.svg", "href": "https://twitter.com/" },
    { "link": "/icon/social/linkedin.svg", "href": "https://linkedin.com/" },
    { "link": "/icon/social/instagram.svg", "href": "https://instagram.com/" }
]
export default function About() {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <div className={styles.con}>
                <div className={styles.grid}>
                    <div className={styles.gridContainer}>
                        <div className={styles.about}>
                            <span className={styles.hello}>Hello, my name is</span>
                            <h2> Jennifer Scott</h2>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, enim minus beatae reprehenderit molestias aspernatur quo facere? Beatae nesciunt provident esse commodi et illo voluptate, minima molestiae fugit minus suscipit impedit exercitationem soluta, voluptas blanditiis accusamus! Magnam perferendis vero soluta, deserunt deleniti molestiae voluptatibus laudantium! Molestias dolor totam perferendis id.</span>
                            <div className={styles.socialMedia}>
                                {socialLink.map(({ link, href }: any) => (
                                    <button onClick={() => router.push(href)} key={link}>
                                        <Image src={link} alt="social" height={20} width={20} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image objectFit='cover' src="/profile/jenniscott.jpg" alt="scott" height="600" width="600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
