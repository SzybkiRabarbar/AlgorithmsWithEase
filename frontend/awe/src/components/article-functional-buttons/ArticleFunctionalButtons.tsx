'use client'

import styles from './ArticleFunctionalButtons.module.scss'
import angleLeft from '/public/e7e7e7/angle-left-solid.svg';
import square from '/public/e7e7e7/square-regular.svg';
import checkedSquare from '/public/e7e7e7/square-check-solid.svg';
import bookmark from '/public/e7e7e7/bookmark-regular.svg';
import checkedBookmark from '/public/e7e7e7/bookmark-solid.svg';
import Link from 'next/link'
import Image from 'next/image'
import { useUserToken } from '@/components/user-token-context/UserTokenContext';
import { useUserProgressStatus } from '../user-progress-status-context/UserProgressStatusContext';
import useChangeUserProgressStatus from '@/utils/useChangeUserProgressStatus';
import { useIsPatchingData } from '../is-patching-data-context/IsPatchingDataContext';
import ButtonLoading from '../button-loading/ButtonLoading';
import { useRef, useState } from 'react';


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

  // States, refs & hooks
  const changeUserProgressStatus = useChangeUserProgressStatus();
  const { userToken } = useUserToken();
  const { userProgressData, fetchedUserProgressError, 
    fetchedUserProgressIsLoading } = useUserProgressStatus();
  const { isPatchingData } = useIsPatchingData();

  // ReactSpring animation


  // On click functions
  const handleChangeClick = (action: number) => {
    changeUserProgressStatus(params.groupId, false, params.fireId, action)
  };

  const handleClickWithoutUserToken = () => {
    // TODO need to login to use this function msg (floating window?)
    console.log('Need to SignIn')
  };

  // React functions
  const UserProgressButtons = () => {

    const gi = params.groupId;
    const ty = 'articles';  // type_
    const fi = params.fireId;

    if (userProgressData) {
      return (
        <>
          {[1, 3].includes(userProgressData[gi][ty][fi]) ?
            <ButtonTemplate onClick={() => handleChangeClick(1)}
              src={ checkedSquare } alt={ 'Square' } />
          :
            <ButtonTemplate onClick={() => handleChangeClick(1)}
              src={ square } alt={ 'Square' } />
          }
          {[2, 3].includes(userProgressData[gi][ty][fi]) ?
            <ButtonTemplate onClick={() => handleChangeClick(2)}
              src={ checkedBookmark } alt={ 'Bookmark' } />
          :
            <ButtonTemplate onClick={() => handleChangeClick(2)}
              src={ bookmark } alt={ 'Bookmark' } />
          }
        </>
      )
    }
  }

  const UserTokenIsNotNullButtons = () => {

    if (userToken !== null) { 
      return (
        <>
          {(fetchedUserProgressIsLoading || isPatchingData) && (
            // dummy buttons that will be cover
            <>
              <ButtonTemplate onClick={ () => {} }
                src={ square } alt={ 'Square' } />
              <ButtonTemplate onClick={ () => {} }
                src={ bookmark } alt={ 'Bookmark' } />
            </>
          )}
          {fetchedUserProgressError && (
            <>
              TODO error
            </>
          )}

          {!isPatchingData && (
            <UserProgressButtons />
          )}

        </>
      )
    }
  }

  return (
    <div className={styles.ButtonsInArticle}>
      <div className={`${styles.buttonsCont}  ${styles[params.position]}`}>
        {(fetchedUserProgressIsLoading || isPatchingData) && (
          <ButtonLoading position={ params.position }/>
        )}
        <>
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

          <UserTokenIsNotNullButtons />
        </>
      </div>
    </div>
  )
}