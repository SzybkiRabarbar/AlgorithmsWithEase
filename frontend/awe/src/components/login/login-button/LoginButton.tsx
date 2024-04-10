'use client'

import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image'

import styles from './LoginButton.module.scss';
import UserLogin from '@/components/login/user-login/UserLogin';

import userSolid from '/public/7e7e7e/user-solid.svg';

function LoginButton(props: {isVisible: boolean}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!props.isVisible) {
      setIsOpen(false);
    }
  }, [props.isVisible])

  const loginWindowProps = useSpring({ 
    config: { duration: 200 }, 
    width: isOpen ? '600px' : '60px', 
    height: isOpen ? '410px' : '60px',
    opacity: isOpen ? 1 : 0, 
    from: { width: '60px', height: '60px', opacity: 0 } 
  });

  return (
    <>
      <div  
          className={`
            ${styles.LoginButton} ${props.isVisible ? styles.visible : 'hidden'}
          `}
          onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={userSolid} alt='user'/>
      </div>
      <animated.div className={styles.LoginWindow}
          style={{...loginWindowProps,
            width: loginWindowProps.width.to(w => `clamp(60px, ${w}, 95vw)`)}}
      >
        <UserLogin />
      </animated.div>
    </>
  );
}


export default LoginButton;