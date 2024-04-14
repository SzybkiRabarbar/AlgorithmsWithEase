import './HoverEffectWrapper.scss';
import React, {ReactNode, useEffect, useRef} from 'react';


function HoverEffectWrapper({children}: { children: ReactNode }) {

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current !== null) {
      const handleMouseMove = (e: MouseEvent) => {
        if (wrapperRef.current !== null) {
          for(const c of Array.from(wrapperRef.current.children)) {
            const card = c as HTMLElement;
            const rect = card.getBoundingClientRect(),
                  x = e.clientX - rect.left,
                  y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          };
        };
      };

      wrapperRef.current.addEventListener('mousemove', handleMouseMove);

      return () => {
        if (wrapperRef.current !== null) {
          wrapperRef.current.removeEventListener('mousemove', handleMouseMove);
        };
      };
    }
  }, []);

  return (
    <div className='HoverEffectWrapper' ref={ wrapperRef }>
      { children }
    </div>
  )
}

export default HoverEffectWrapper