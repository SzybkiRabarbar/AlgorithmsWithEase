import './HoverEffectElement.scss';
import React, { ReactNode } from 'react';


function HoverEffectElement({children}: { children: ReactNode }) {
  return (
    <div className='HoverEffectElement'>
      <div className='hoverEffectContent'>
        { children }
      </div>
    </div>
  )
}

export default HoverEffectElement