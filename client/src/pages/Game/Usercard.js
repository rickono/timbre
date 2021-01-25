import React from 'react';
import Cookies from 'js-cookie';
import './game.scss';
import { FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Usercard = ({ logout }) => {
  const username = Cookies.get('username');
  return (
    <div className='usercard'>
      <h2 className='username'>Logged in as {username}</h2>
      <motion.h3
        className='logout'
        onClick={logout}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaSignOutAlt />
      </motion.h3>
    </div>
  );
};

export default Usercard;
