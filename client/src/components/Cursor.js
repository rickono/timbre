import React, { useRef, useEffect } from 'react';

import './cursor.scss';

const Cursor = () => {
  // Custom cursor component to be used wherever a cursor is necessary.
  const cursorRef = useRef(null);

  useEffect(() => {
    // Event listener so that the custom cursor moves when the mouse moves.
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientHeight / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Event listener to change the color back to white when mouse is lifted, and add a fade transition to this effect.
    document.addEventListener('mouseup', (e) => {
      cursorRef.current.style.transition = 'box-shadow 0.2s ease-in-out';
      cursorRef.current.style.boxShadow = ' 0px 0px 30px 10px white';
    });

    // Event listener to change the color on click
    document.addEventListener('mousedown', (e) => {
      // cursorRef.current.style.width = '1.4rem';
      // cursorRef.current.style.height = '1.4rem';
      cursorRef.current.style.transition = 'box-shadow 0s ease-in-out';
      cursorRef.current.style.boxShadow = ' 0px 0px 30px 10px #acebc2';
    });

    // Event listener to toggle the visibility of the cursor when entering/exiting pointer lock controls.
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
