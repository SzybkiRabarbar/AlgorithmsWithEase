import './Nav.scss';
import burger from '../../assets/bars-solid-400.svg';
import house from '../../assets/house-solid.svg';
import barsProgress from '../../assets/bars-progress-solid.svg';
import map from '../../assets/map-solid.svg';
import info from '../../assets/info-solid.svg';
import mug from '../../assets/mug-hot-solid.svg';

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
        <div className={`menu${counter} ${isVisible ? 'visible' : 'hidden'}`}>
          <Link 
            to={url}
            target={isExt ? '_blank' : '_self'}
            rel={isExt ? 'noopener noreferrer' : ''}
          >
            <img src={asset} alt="" width="40" height="40" 
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
      {menuDiv('/', house)}
      {menuDiv('/groups', barsProgress)}
      {menuDiv('/test', map)}
      {menuDiv('https://github.com/SzybkiRabarbar/AlgorithmsWithEase', info, true)}
      {menuDiv('/', mug)}
    </>
  );
}

export default Nav;