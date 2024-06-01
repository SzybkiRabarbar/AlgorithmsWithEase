import React from 'react'

import styles from './ButtonLoading.module.scss'


function ButtonLoading(props: {radiusCorners: string[]}) {

  const radiusCorners = props.radiusCorners.map(str => styles[str]).join(' ');

  return (
    <div className={`${styles.ButtonLoading} ${radiusCorners}`}>
      <svg className={styles.spinner} width="33px" height="33px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className={styles.path} fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  )
}

export default ButtonLoading