'use client'

import Image from 'next/image'
import Link from 'next/link'

import styles from "./ProgressStatusButton.module.scss";
import ButtonLoading from '@/components/progress-status-button/button-loading/ButtonLoading';
import useChangeUserProgressStatus from "@/utils/useChangeUserProgressStatus";
import { useUserToken } from "@/contexts/UserTokenContext";
import { useUserProgressStatus } from "@/contexts/UserProgressStatusContext";
import { useIsPatchingData } from "@/contexts/IsPatchingDataContext";

import angleLeft from '/public/e7e7e7/angle-left-solid.svg';
import square from '/public/e7e7e7/square-regular.svg';
import checkedSquare from '/public/e7e7e7/square-check-solid.svg';
import bookmark from '/public/e7e7e7/bookmark-regular.svg';
import checkedBookmark from '/public/e7e7e7/bookmark-solid.svg';


function ProgressStatusButton(props: {
    isBackButton: boolean,
    groupId: number,
    type_: string,
    fireId: string,
    radiusCorners: string[]
}) {

  const radiusCorners = props.radiusCorners.map(str => styles[str]).join(' ');

  const changeUserProgressStatus = useChangeUserProgressStatus();
  const { userToken } = useUserToken();
  const { userProgressData, fetchedUserProgressError, 
    fetchedUserProgressIsLoading } = useUserProgressStatus();
  const { isPatchingData } = useIsPatchingData();

  const ButtonTemplate = (props: {onClick: () => void, src: any, alt: string}) => {

    return (
      <div className={styles.button} onClick={props.onClick}>
        <Image src={ props.src } alt={ props.alt } />
      </div>
    )
  }

  const handleChangeClick = (action: number) => {
    changeUserProgressStatus(props.groupId, false, props.fireId, action)
  };

  const handleClickWithoutUserToken = () => {
    // TODO need to login to use this function msg (floating window?)
    console.log('Need to SignIn')
  };

  const UserProgressButtons = () => {

    const gi = props.groupId;
    const ty = props.type_;
    const fi = props.fireId;

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
    <div className={styles.ProgressStatusButton}>
      <div className={`${styles.buttonsCont}  ${radiusCorners}`}>
        {(fetchedUserProgressIsLoading || isPatchingData) && (
          <ButtonLoading radiusCorners={ props.radiusCorners }/>
        )}
        <>
          {props.isBackButton &&
            <Link href={'/group/' + props.groupId}>
              <div className={styles.button}>
                <Image src={angleLeft} alt={ "Angle" } />
              </div>
            </Link>
          }
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

export default ProgressStatusButton