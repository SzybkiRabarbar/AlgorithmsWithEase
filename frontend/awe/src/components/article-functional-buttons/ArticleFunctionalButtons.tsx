'use client'

import styles from './ArticleFunctionalButtons.module.scss'
import angleLeft from '/public/7e7e7e/angle-left-solid.svg';
import square from '/public/7e7e7e/square-regular.svg';
import bookmark from '/public/7e7e7e/bookmark-regular.svg';
import Link from 'next/link'
import Image from 'next/image'
import patchData from '@/utils/patchData';
import { useUserToken } from '@/components/user-token-context/UserTokenContext';


export default function ButtonsInArticle(
  params: {position: string, groupId: number, fireId: string})
{

  const { userToken } = useUserToken();
  const mutation = patchData();

  const handleClick = () => {
    console.log(userToken);
    if (userToken) {
      mutation.mutate({
        token: userToken,
        fireId: params.fireId,
        groupId: params.groupId,
        actionNumber: 1,
      });
      if (mutation.isError) {
        console.log(mutation.error.message);
      }
      if (mutation.isSuccess) {
        console.log("succ");
      }
    } else {
      console.log("User not logged");  // TODO floating window
    }
  };

  return (
    <div className={styles.ButtonsInArticle}>
      <div className={`${styles.buttonsCont}  ${styles[params.position]}`}>
        <Link href={'/group/' + params.groupId}>
          <div className={styles.button}>
            <Image src={angleLeft} alt={ "Angle" } />
          </div>
        </Link>
        <div className={styles.button} onClick={handleClick}>
          <Image src={square} alt={ "Square" } />
        </div>
        <div className={styles.button}>
          <Image src={bookmark} alt={ "Bookmark" } />
        </div>
      </div>
    </div>
  )
}