import React, { useState } from 'react';
import Cursor from '../../components/Cursor';
import './about.scss';
import { FaReact, FaNodeJs, FaSpotify } from 'react-icons/fa';
import {
  SiReactrouter,
  SiFramer,
  SiNodemon,
  SiNetlify,
  SiPostman,
} from 'react-icons/si';
import { DiSass, DiMongodb, DiGit, DiHeroku } from 'react-icons/di';
import { BiCookie } from 'react-icons/bi';
import { AiFillGithub } from 'react-icons/ai';

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThreeJS = () => {
  return (
    <svg
      className='threeicon'
      fill='none'
      strokeLinecap='square'
      strokeMiterlimit='10'
      version='1.1'
      viewBox='0 0 226.77 226.77'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        transform='translate(8.964 4.2527)'
        fillRule='evenodd'
        stroke='#aaa'
        strokeLinecap='butt'
        strokeLinejoin='round'
        strokeWidth='4'
      >
        <path d='m63.02 200.61-43.213-174.94 173.23 49.874z' />
        <path d='m106.39 50.612 21.591 87.496-86.567-24.945z' />
        <path d='m84.91 125.03-10.724-43.465 43.008 12.346z' />
        <path d='m63.458 38.153 10.724 43.465-43.008-12.346z' />
        <path d='m149.47 62.93 10.724 43.465-43.008-12.346z' />
        <path d='m84.915 125.06 10.724 43.465-43.008-12.346z' />
      </g>
    </svg>
  );
};

const technologies = {
  react: {
    name: 'react',
    color: '#61DBFB',
    description:
      'React was the backbone of the client-side, allowing us to build a complex single-page application in a systematic and organized way. ',
    icon: <FaReact />,
  },
  router: {
    name: 'router',
    color: '#cf4836',
    description:
      'React Router was used to manage various endpoints on the single-page application.',
    icon: <SiReactrouter />,
  },
  cookie: {
    name: 'cookie',
    color: '#e8ce92',
    description:
      'Cookies were implemented using JS-Cookie and are used to keep track of the user while they are logged in.',
    icon: <BiCookie />,
  },
  mongo: {
    name: 'mongo',
    color: '#4DB33D',
    description:
      'MongoDB, along with Mongoose, was used to store users data on our servers, including their email, name, and access token.',
    icon: <DiMongodb />,
  },
  sass: {
    name: 'sass',
    color: '#cd6799',
    description: 'Sass stylesheets were used to add style to our HTML/JSX.',
    icon: <DiSass />,
  },
  framer: {
    name: 'framer',
    color: '#8b3eb8',
    description:
      'Framer Motion was used to craft seamless animations between pages, and components, including the ones on this page.',
    icon: <SiFramer />,
  },
  three: {
    name: 'three',
    color: '#8b3eb8',
    description:
      'Three.js, along with React Three Fiber, a React renderer for Three.js, allowed for the game functionality, and was used for everything three dimensional. ',
    icon: <ThreeJS />,
  },

  spotify: {
    name: 'spotify',
    color: '#1ED761',
    description:
      "The Spotify Web API was used on the back end to get user information, create a music player, play songs, and create playlists on the user's Spotify account.",
    icon: <FaSpotify />,
  },
  node: {
    name: 'node',
    color: '#68a063',
    description:
      'Node.js is a Javascript runtime used to implement all of the backend functionality.',
    icon: <FaNodeJs />,
  },
  express: {
    name: 'express',
    color: '#fff',
    description:
      'Express is a Node.js framework that made development smoother and more organized, with the use of middlewares.',
    icon: <span className='express'>Ex</span>,
  },
  nodemon: {
    name: 'nodemon',
    color: '#4DB33D',
    description:
      'Nodemon continuously refreshed the local server during development.',
    icon: <SiNodemon />,
  },
  netlify: {
    name: 'netlify',
    color: '#3ec7b7',
    description:
      'Netlify serves the client side pages that you are seeing right now.',
    icon: <SiNetlify />,
  },
  git: {
    name: 'git',
    color: '#f05032',
    description:
      'Git was used for version control, and experimenting with various features in a safe environment.',
    icon: <DiGit />,
  },
  github: {
    name: 'github',
    color: '#eee',
    description:
      'Github provided a remote repository, crucial for collaboration among team members.',
    icon: <AiFillGithub />,
  },
  heroku: {
    name: 'heroku',
    color: '#7a54bb',
    description: 'Heroku hosts the backend Node API server.',
    icon: <DiHeroku />,
  },
  postman: {
    name: 'postman',
    color: '#ef6937',
    description:
      'Postman was used in development to test various API endpoints, both on our backend and the Spotify API.',
    icon: <SiPostman />,
  },
};

const Icon = ({ expanded, setExpanded, technology }) => {
  const isOpen = technology.name === expanded;

  return (
    <>
      <motion.div
        initial={false}
        animate={{ color: isOpen ? technology.color : '#aaa' }}
        onClick={() => setExpanded(isOpen ? false : technology.name)}
        className='icondiv'
      >
        {technology.icon}
      </motion.div>
    </>
  );
};

const FrontEndTech = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='technology-container'>
      <h2 className='section-header'>Frontend</h2>
      <div className='icons'>
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.react}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.three}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.framer}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.router}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.cookie}
        />
      </div>
      <AnimatePresence initial={false}>
        {expanded !== false && (
          <motion.section
            className='description'
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {technologies[expanded].description}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const BackendTech = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='technology-container'>
      <h2 className='section-header'>Backend</h2>
      <div className='icons'>
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.node}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.express}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.mongo}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.spotify}
        />
      </div>
      <AnimatePresence initial={false}>
        {expanded !== false && (
          <motion.section
            className='description'
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {technologies[expanded].description}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const OtherTech = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='technology-container'>
      <h2 className='section-header'>Other</h2>
      <div className='icons'>
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.git}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.github}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.postman}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.nodemon}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.heroku}
        />
        <Icon
          expanded={expanded}
          setExpanded={setExpanded}
          technology={technologies.netlify}
        />
      </div>
      <AnimatePresence initial={false}>
        {expanded !== false && (
          <motion.section
            className='description'
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {technologies[expanded].description}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const About = () => {
  return (
    <>
      <Link className='home' to='/'>
        Home
      </Link>
      <Cursor />
      <div className='about-container'>
        <h2 className='header'>About this app</h2>
        <p className='info'>
          This website was created for MIT's web.lab class by Rick Ono, Sam
          Boshar, and Alvin Li. This project was an entry to the competition.
        </p>
        <p className='info'>
          Every user's songs are curated specifically for the user based on
          their Spotify listening history, and no two users will ever see the
          same generated terrains. Every aspect, from the gradient of the terrain,
          to the quanitity, size and variety of the trees, rocks and clouds is disinct. 
        </p>
        <p className='info'>
          Our terrains are generated by computing the weighted sum of layers or 
          "octaves" of simplex noise——each layer being transformed to a different scale——
          thereby capturing the subtleties of the landscapes.
        </p>  
        <p className='info'>
          Timbre utilizes React Three Fiber, a React renderer for Three.js that
          facilitates three-dimensional modeling in the canvas. Timbre also uses
          the Spotify API to create a virtual player in the browser and fetch a
          users information for the personalized experience.
        </p>
        <p className='info'>
          Note: For now, please try not to press 'e' or 'shift' while holding
          any other key in the app, as this can lead to unexpected behavior.
        </p>
        <h3 className='subheader'>Technologies</h3>
        <p className='smallinfo'>
          Click on any of the logos below to read a little more.
        </p>
        <div className='technologies-container'>
          <FrontEndTech />
          <BackendTech />
          <OtherTech />
        </div>
      </div>
    </>
  );
};

export default About;
