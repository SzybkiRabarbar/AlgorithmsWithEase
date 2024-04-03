'use client'

import styles from './ArticleFunctionalButtons.module.scss'
import angleLeft from '/public/7e7e7e/angle-left-solid.svg';
import square from '/public/7e7e7e/square-regular.svg';
import bookmark from '/public/7e7e7e/bookmark-regular.svg';
import Link from 'next/link'
import Image from 'next/image'
import patchUserProgressStatusData from '@/utils/patchData';
import { useUserToken } from '@/components/user-token-context/UserTokenContext';
import { useUserProgressStatus } from '../user-progress-status-context/UserProgressStatusContext';
import Loading from '../loading/Loading';


export default function ButtonsInArticle(
  params: {position: string, groupId: number, fireId: string})
{

  const { userToken } = useUserToken();
  const { userProgressData, setUserProgressData, fetchedUserProgressError,
    fetchedUserProgressIsLoading } = useUserProgressStatus();
  const mutation = patchUserProgressStatusData();

  const handleSquareClick = () => {
    if (userToken) {
      mutation.mutate({
        token: userToken,
        fire_id: params.fireId,
        group_id: params.groupId,
        progress_status: 1,
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

  const handleBookmarkClick = () => {
    console.log(userProgressData);
  };

  return (
    <div className={styles.ButtonsInArticle}>
      <div className={`${styles.buttonsCont}  ${styles[params.position]}`}>
        <Link href={'/group/' + params.groupId}>
          <div className={styles.button}>
            <Image src={angleLeft} alt={ "Angle" } />
          </div>
        </Link>
        {/* {userToken === null}  // TODO when user is not logged */}
        {/* {fetchedUserProgressIsLoading && <Loading />}    */}
        {/* {fetchedUserProgressError}  // TODO */}
        {userProgressData && (<>
          <div className={styles.button} onClick={handleSquareClick}>
            <Image src={square} alt={ "Square" } />
          </div>
          <div className={styles.button} onClick={handleBookmarkClick}>
            <Image src={bookmark} alt={ "Bookmark" } />
          </div>
        </>)}
      </div>
    </div>
  )
}