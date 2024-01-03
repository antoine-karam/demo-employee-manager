import React, { useCallback, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa6';

import IconButton from '../../components/IconButton/IconButton';
import SideBar, { SidebarRef } from '../../components/SideBar/Sidebar';
import { scrollToTop } from '../../helper/general';
import classes from './RootLayout.module.less';
import TopBar from '../TopBar/TopBar';

const RootLayout: React.FC = () => {
  const sideBarRef = useRef<SidebarRef>(null);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);


  const handleScroll = useCallback(() => {
    const myDiv = document.getElementById('my-outlet');
    if (myDiv) {
      const scrollTop = myDiv.scrollTop;
      if (scrollTop >= 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  }, []);

  return (
    <div className={classes.container}>
      <SideBar ref={sideBarRef} />
      <main className={classes.main}>
        <TopBar />
        <div id="my-outlet" onScroll={handleScroll} className={classes.outlet}>
          <Outlet />
          {isScrolled && (
            <IconButton
              className={`${classes.fab} rounded-circle`}
              onClick={scrollToTop()}
            >
              <FaArrowUp size="30" />
            </IconButton>
          )}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
