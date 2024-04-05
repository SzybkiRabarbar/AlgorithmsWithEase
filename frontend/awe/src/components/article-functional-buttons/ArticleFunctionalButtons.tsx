'use client'

import styles from './ArticleFunctionalButtons.module.scss'
import angleLeft from '/public/7e7e7e/angle-left-solid.svg';
import square from '/public/7e7e7e/square-regular.svg';
import bookmark from '/public/7e7e7e/bookmark-regular.svg';
import Link from 'next/link'
import Image from 'next/image'
import { useUserToken } from '@/components/user-token-context/UserTokenContext';
import { useUserProgressStatus } from '../user-progress-status-context/UserProgressStatusContext';
import useChangeUserProgressStatus from '@/utils/useChangeUserProgressStatus';


function ButtonTemplate(props: {onClick: () => void, src: any, alt: string}) {

  return (
    <div className={styles.button} onClick={props.onClick}>
      <Image src={ props.src } alt={ props.alt } />
    </div>
  )
}


export default function ButtonsInArticle(
  params: {position: string, groupId: number, fireId: string})
{

  const changeUserProgressStatus = useChangeUserProgressStatus();
  const { userToken } = useUserToken();
  const { userProgressData, fetchedUserProgressError, 
    fetchedUserProgressIsLoading } = useUserProgressStatus();

  const handleChangeClick = (action: number) => {
    changeUserProgressStatus(params.groupId, false, params.fireId, action)
  };

  const handleClickWithoutUserToken = () => {
    // TODO need to login to use this function msg (floating window?)
    console.log('Need to SignIn')
  };

  return (
    <div className={styles.ButtonsInArticle}>
      <div className={`${styles.buttonsCont}  ${styles[params.position]}`}>
        <Link href={'/group/' + params.groupId}>
          <div className={styles.button}>
            <Image src={angleLeft} alt={ "Angle" } />
          </div>
        </Link>
        {userToken === null && (
          <>
            <ButtonTemplate onClick={ handleClickWithoutUserToken }
              src={ square } alt={ 'Square' } />
            <ButtonTemplate onClick={ handleClickWithoutUserToken }
              src={ bookmark } alt={ 'Bookmark' } />
          </>
        )}
        {userToken !== null && (
          <>
            {fetchedUserProgressIsLoading && (
              <>
                {/* Code under this isnt comment :) */}
                // TODO Nice looking Loading
              </>
            )}
            {fetchedUserProgressError && (
              <>
                TODO error
              </>
            )}
            {userProgressData && (
              <>
                <ButtonTemplate onClick={() => handleChangeClick(1)}
                  src={ square } alt={ 'Square' } />
                <ButtonTemplate onClick={() => handleChangeClick(2)}
                  src={ bookmark } alt={ 'Bookmark' } />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}