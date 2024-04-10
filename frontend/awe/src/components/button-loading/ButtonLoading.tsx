import React from 'react'
import styles from '@/components/button-loading/ButtonLoading.module.scss'

function ButtonLoading(params: {position: string}) {

  return (
    <div className={`${styles.ButtonLoading} ${styles[params.position]}`}>
      <svg className={styles.spinner} width="33px" height="33px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className={styles.path} fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  )
}

export default ButtonLoading