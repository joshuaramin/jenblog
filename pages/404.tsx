import React from 'react'
import styles from '../styles/Error/404.module.scss'
import Image from 'next/image'
export default function NotFound() {


  return (
    <div className={styles.container}>
      <div className={styles.con}>
        <Image src="/error/broken.png" alt="404 Error page" objectFit='contain' layout='responsive' height="260" width="640" />
      </div>
    </div>
  )
}
