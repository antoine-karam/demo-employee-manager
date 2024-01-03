import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { FaAlignJustify } from 'react-icons/fa6';

import classes from './SideBarToggle.module.less';

const SideBarToggle: React.FC<{
  collapsed: boolean;
  toggleHandler: () => void;
}> = ({ collapsed, toggleHandler }) => {
  return (
    <div className={classes.toggleContainer}>
      <MenuItem
        onClick={toggleHandler}
        icon={
          collapsed ? (
            <FaAlignJustify
              className={`elem-bounce-hover  ${classes.icon} ${classes.iconCollapse}`}
            />
          ) : null
        }
        className={`sidebar-no-hover ${classes.menuitem}`}
      >
        {!collapsed && (
          <div className={classes.innerContainer}>
            <div className={classes.titleContainer}>
              <div className={classes.title}>E.M.S.</div>
            </div>
            <div className={classes.iconContainer}>
              <FaAlignJustify
                className={`sidebar-no-hover elem-bounce-hover  ${classes.icon}`}
              />
            </div>
          </div>
        )}
      </MenuItem>
    </div>
  );
};

export default SideBarToggle;
