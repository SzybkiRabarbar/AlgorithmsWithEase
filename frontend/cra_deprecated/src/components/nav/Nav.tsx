import './Nav.scss';
import burger from '../../assets/7e7e7e/bars-solid.svg';
import house from '../../assets/7e7e7e/house-solid.svg';
import barsProgress from '../../assets/7e7e7e/bars-progress-solid.svg';
import map from '../../assets/7e7e7e/map-solid.svg';
import info from '../../assets/7e7e7e/info-solid.svg';
import mug from '../../assets/7e7e7e/mug-hot-solid.svg';

import { useState } from 'react';
import { Link } from 'react-router-dom';


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
        <div className={`menu${counter} ${isVisible ? 'visible' : 'hidden'}`}
        data-testid={ 'div' + url }>
          <Link 
            to={url}
            data-testid={ "link" + url}
            target={isExt ? '_blank' : '_self'}
            rel={isExt ? 'noopener noreferrer' : ''}
          >
            <img src={asset} alt={ "img " + url } width="40" height="40" 
              onClick={() => toogleVisibility()}>
            </img>
          </Link>
        </div>
    );
  };

  return (
    <>
      <div className="Nav">
        <img src={burger} alt='≡' width="40" height="40" 
          style={{ transform: `rotate(${rotation}deg)`}}
          onClick={() => toogleVisibility()}>
        </img>
      </div>
      <div data-testid="menu-items">
        {menuDiv('/', house)}
        {menuDiv('/groups', barsProgress)}
        {menuDiv('/map', map)}
        {menuDiv('/info', info)}
        {menuDiv('https://github.com/SzybkiRabarbar/AlgorithmsWithEase', mug, true)}
      </div>
    </>
  );
}

export default Nav;