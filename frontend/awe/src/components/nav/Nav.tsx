'use client'

import './Nav.scss';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


function Nav() {
  var counter = 0;
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  const toogleVisibility = () => {
    setRotation(isVisible ? 0 : 90);
    setIsVisible(!isVisible);
  };

  const menuDiv = (url: string, asset: string, isExt: boolean=false) => {
    counter += 1;
    return (
      <Link 
        href={url}
        data-testid={ "link" + url}
        target={isExt ? '_blank' : '_self'}
        rel={isExt ? 'noopener noreferrer' : ''}
      >
        <div className={`menu${counter} ${isVisible ? 'visible' : 'hidden'}`}
          data-testid={ 'div' + url }
        >
          <Image src={`/7e7e7e/${asset}.svg`} alt={ "img " + url } 
            width="40" height="40" 
            onClick={() => toogleVisibility()} 
          />
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="Nav">
        <Image src='/7e7e7e/bars-solid.svg' alt='≡' width="40" height="40" 
          style={{ transform: `rotate(${rotation}deg)`}}
          onClick={() => toogleVisibility()}
        />
      </div>
      <div data-testid="menu-items">
        {menuDiv('/', 'house-solid')}
        {menuDiv('/groups', 'bars-progress-solid')}
        {menuDiv('/map', 'map-solid')}
        {menuDiv('/info', 'info-solid')}
        {menuDiv('https://github.com/SzybkiRabarbar/AlgorithmsWithEase', 'mug-hot-solid', true)}
      </div>
    </>
  );
}

export default Nav;