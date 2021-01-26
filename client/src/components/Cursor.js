import React, { useRef, useEffect } from 'react';
import './cursor.scss';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientHeight / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
    document.addEventListener('mouseup', (e) => {
      cursorRef.current.style.transition = 'box-shadow 0.2s ease-in-out';
      cursorRef.current.style.boxShadow = ' 0px 0px 30px 10px white';
    });
    document.addEventListener('mousedown', (e) => {
      // cursorRef.current.style.width = '1.4rem';
      // cursorRef.current.style.height = '1.4rem';
      cursorRef.current.style.transition = 'box-shadow 0s ease-in-out';
      cursorRef.current.style.boxShadow = ' 0px 0px 30px 10px #acebc2';
    });
    document.addEventListener('pointerlockchange', (e) => {
      const toggle = () => {
        if (cursorRef.current.style.display === 'none') {
          cursorRef.current.style.display = 'block';
        } else {
          cursorRef.current.style.display = 'none';
        }
      };
      toggle();
    });
  }, []);

  return <div className='app-cursor' ref={cursorRef}></div>;
};

export default Cursor;
