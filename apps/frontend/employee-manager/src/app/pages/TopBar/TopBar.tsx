import React, { useCallback, useState } from 'react';

import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';

import { openFullscreen, closeFullscreen } from '../../helper/general';
import classes from './TopBar.module.less';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import noProfile from '../../../assets/no-profile-picture.png';
import IconButton from '../../components/IconButton/IconButton';
const TopBar = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleFullScreen = useCallback(() => {
    if (isFullScreen) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  }, [isFullScreen]);

  return (
    <div className={classes.topBar}>
      <IconButton
        onClick={handleFullScreen}
        className={classes.fullScreenButton}
      >
          {!isFullScreen && <BiFullscreen size="1.5rem" />}
          {isFullScreen && <BiExitFullscreen size="1.5rem" />}
      </IconButton>
      <div className={classes.profile}>
        <Image
          alt="User Profile"
          className={classes.img}
          src={noProfile}
        ></Image>
      </div>
    </div>
  );
};

export default TopBar;
