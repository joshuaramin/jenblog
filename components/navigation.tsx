import React, { useState } from 'react'
import styles from '../styles/navigation.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
const navLink = [
    { link: "/", title: "Home" },
    { link: "/Blog", title: "Blog" },
    { link: "/images", title: "Image" },
]

const dashLink = [
    { image: "/icon/monitor.svg", link: "/dashboard", title: "Dashboard" },
    { image: "/icon/file.svg", link: "/dashboard/blog", title: "Blog" },
    { image: "/icon/image.svg", link: "/dashboard/images", title: "Images" },
]
export default function Navigation() {


    const router = useRouter()
    const [ open, setOpen ] = useState(false)

    const handleNavigationBtn = () => {
        setOpen(() => !open)
    }
    return (
        <div className={styles.container}>
            <ul>
                {router.asPath.includes("/dashboard") ?
                    <div className={styles.navdash}>
                        {open ?
                            <ul>
                                {dashLink.map(({ image, link, title }) => (
                                    <li key={title}>
                                        <Image src={image} alt={title} height={25} width={25} />
                                        <a onClick={handleNavigationBtn} style={{
                                            color: router.asPath == link ? "black" : "#2b2b2b"
                                        }} href={link}>{title}</a>
                                    </li>
                                ))}
                            </ul> : null}
                        <button onClick={handleNavigationBtn}>
                            <div />
                            <div />
                            <div />
                        </button>
                    </div>
                    :
                    <>
                        {navLink.map(({ link, title }) => (
                            <li key={title}>
                                <a style={{
                                    color: router.asPath == link ? "black" : "#c6c6c6"
                                }} href={link}>{title}</a>
                            </li>
                        ))}
                    </>}
            </ul>
        </div>
    )
}
