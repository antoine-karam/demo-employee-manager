import { useCallback, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { BiFullscreen, BiExitFullscreen, BiSearch } from 'react-icons/bi';

import noProfile from '../../../assets/no-profile-picture.png';
import IconButton from '../../components/IconButton/IconButton';
import { openFullscreen, closeFullscreen } from '../../helper/general';

import classes from './TopBar.module.less';

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
      <div className={classes.leftSection}>
        <div className={classes.searchContainer}>
          <BiSearch className={classes.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={classes.searchInput}
          />
        </div>
      </div>

      <div className={classes.rightSection}>
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
    </div>
  );
};

export default TopBar;
