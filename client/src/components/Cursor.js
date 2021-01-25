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
    document.addEventListener('mousedown', (e) => {
      cursorRef.current.style.width = '1.4rem';
      cursorRef.current.style.height = '1.4rem';
    });
    document.addEventListener('mouseup', (e) => {
      cursorRef.current.style.width = '1rem';
      cursorRef.current.style.height = '1rem';
    });
  }, []);

  return <div className='app-cursor' ref={cursorRef}></div>;
};

export default Cursor;
