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

  const handleChangeClick = (action: number) => {
    changeUserProgressStatus(props.groupId, props.type_, props.fireId, action)
  };

  const handleClickWithoutUserToken = () => {
    // TODO need to login to use this function msg (floating window?)
    console.log('Need to SignIn')
  };

  /**
   * `ButtonTemplate` is a React functional component that renders
   *  a button with an image.
   */
  const ButtonTemplate = (
    props: {
      onClick: () => void,
      src: any,
      alt: string
    }
  ) => {

    return (
      <div className={styles.button} onClick={props.onClick}>
        <Image src={ props.src } alt={ props.alt } />
      </div>
    )
  }

  /**
   * `UserProgressButtons` is a React functional component that renders
   *  two button templates based on the values in `userProgressData`.
   *
   * The first button template renders a checked or unchecked square icon
   *  depending on the value of
   *  `userProgressData[props.groupId][props.type_][props.fireId]`.
   * If the value is `1` or `3`, it renders a checked square icon;
   *  otherwise, it renders an unchecked square icon.
   * When clicked, the button calls the `handleChangeClick` function with
   *  the argument `1`.
   *
   * The second button template renders a checked or unchecked bookmark icon
   *  depending on the value of
   *  `userProgressData[props.groupId][props.type_][props.fireId]`.
   * If the value is `2` or `3`, it renders a checked bookmark icon;
   *  otherwise, it renders an unchecked bookmark icon.
   * When clicked, the button calls the `handleChangeClick` function with
   *  the argument `2`.
   */
  const UserProgressButtons = () => {

    const gi = props.groupId;
    const ty = props.type_;
    const fi = props.fireId;

    if (userProgressData) {
      return (
        <>
          {userProgressData[gi]?.[ty]?.[fi] &&
          [1, 3].includes(userProgressData[gi][ty][fi]) ?
            <ButtonTemplate onClick={() => handleChangeClick(1)}
              src={ checkedSquare } alt={ 'Checked Square' } />
          :
            <ButtonTemplate onClick={() => handleChangeClick(1)}
              src={ square } alt={ 'Square' } />
          }
          {userProgressData[gi]?.[ty]?.[fi] &&
          [2, 3].includes(userProgressData[gi][ty][fi]) ?
            <ButtonTemplate onClick={() => handleChangeClick(2)}
              src={ checkedBookmark } alt={ 'Checked Bookmark' } />
          :
            <ButtonTemplate onClick={() => handleChangeClick(2)}
              src={ bookmark } alt={ 'Bookmark' } />
          }
        </>
      );
    }
  }

  /**
   * `UserTokenIsNotNullButtons` is a React functional component that
   *  conditionally renders different sets of buttons based on various states.
   *
   * If `userToken` is not `null`, the component returns a fragment with
   *  the following conditional elements:
   *
   * - If `fetchedUserProgressIsLoading` or `isPatchingData` is `true`,
   *    it renders two dummy buttons with square and bookmark icons.
   *    These buttons are meant to be covered and do not have any click handlers.
   *
   * - If `fetchedUserProgressError` is `true`, it renders a placeholder for
   *    an error message.
   *
   * - If `isPatchingData` is `false`, it renders
   *    the `UserProgressButtons` component.
   *
   * If `userToken` is `null`, the component does not render anything.
   */
  const UserTokenIsNotNullButtons = () => {

    if (userToken !== null) { 
      return (
        <>
          {(fetchedUserProgressIsLoading || isPatchingData) && (
            // dummy buttons that will be covered
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