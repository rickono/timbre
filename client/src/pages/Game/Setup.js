import React, { useState } from 'react';
import './game.scss';

import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContinueButton = ({ handleContinue, stage }) => {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className='continue'
      onClick={handleContinue}
      variants={fadeInVariants}
      initial='hidden'
      animate='visible'
      key={`${stage}button`}
    >
      continue
    </motion.button>
  );
};

const InfoText = ({ text, stage }) => {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <motion.h2
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={fadeInVariants}
      transition={{ duration: 1 }}
      className='welcome'
      key={`${stage}text`}
    >
      {text}
    </motion.h2>
  );
};

const Setup = ({ setup }) => {
  const name = Cookies.get('username');
  const [stage, setStage] = useState(0);
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const config = {
    headers: {
      'access-token': Cookies.get('access-token'),
      'refresh-token': Cookies.get('refresh-token'),
    },
  };

  const handleContinue = async () => {
    setStage(stage + 1);
    if (stage === 2) {
      setTimeout(() => {
        setStage(stage + 1);
      }, 1000);
      setTimeout(() => {
        setup();
      }, 3000);
      const playlistIdRes = await axios.get(
        `http://localhost:8888/api/v1/createplaylist?name=${playlistName}`,
        config
      );
      Cookies.set('playlist-id', playlistIdRes.data.id);
    }
  };

  const handleTyping = (e) => {
    setPlaylistName(e.target.value);
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <div className='absolute-container' variants={staggerChildren}>
        {stage === 0 ? (
          <>
            <InfoText text={`Welcome to Timbre, ${name}`} stage={stage} />
            <ContinueButton handleContinue={handleContinue} stage={stage} />
          </>
        ) : stage === 1 ? (
          <>
            <InfoText
              text='With Timbre, you can explore songs and create your
              perfect playlist.'
              stage={stage}
            />
            <ContinueButton handleContinue={handleContinue} stage={stage} />
          </>
        ) : stage === 2 ? (
          <>
            <InfoText text='What will your playlist be called?' stage={stage} />
            <input
              type='text'
              className='playlist-input'
              value={playlistName}
              onChange={handleTyping}
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={fadeInVariants}
              transition={{ duration: 1 }}
              key={'input'}
            />
            <ContinueButton handleContinue={handleContinue} stage={stage} />
          </>
        ) : stage === 3 ? (
          <>
            <InfoText
              text="You're about to be transported into a world of music. Look around for further instructions."
              stage={stage}
            />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Setup;
