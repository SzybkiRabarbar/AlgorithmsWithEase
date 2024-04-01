'use client'

import styles from './ArticleFunctionalButtons.module.scss'
import angleLeft from '/public/7e7e7e/angle-left-solid.svg';
import square from '/public/7e7e7e/square-regular.svg';
import bookmark from '/public/7e7e7e/bookmark-regular.svg';
import Link from 'next/link'
import Image from 'next/image'


export default function ButtonsInArticle(
  params: {position: string, groupId: number, fireId: string})
{

  return (
    <div className={styles.ButtonsInArticle}>
      <div className={`${styles.buttonsCont}  ${styles[params.position]}`}>
        <Link href={'/group/' + params.groupId}>
          <div className={styles.button}>
            <Image src={angleLeft} alt={ "Angle" } />
          </div>
        </Link>
        <div className={styles.button}>
          <Image src={square} alt={ "Square" } />
        </div>
        <div className={styles.button}>
          <Image src={bookmark} alt={ "Bookmark" } />
        </div>
      </div>
    </div>
  )
}