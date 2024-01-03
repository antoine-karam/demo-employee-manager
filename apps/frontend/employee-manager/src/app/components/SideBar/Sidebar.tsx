import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import {
  Sidebar,
  Menu,
  SubMenu,
  menuClasses,
  MenuItemStyles,
  SidebarProps,
  MenuItem,
} from 'react-pro-sidebar';

import { Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.jpg';
import { currentLocation, generateTheme } from '../../helper/general';
import classes from './SideBar.module.less';
import SideBarToggle from '../SideBarToggle/SideBarToggle';
import { FaHouse, FaUserLarge } from 'react-icons/fa6';
type SidebarProp = {};

export type SidebarRef = {
  handleSelectMenuItem: (title: string) => void;
};
const SideBar: ForwardRefRenderFunction<SidebarRef, SidebarProp> = (
  _props,
  ref
) => {
  const query = window.matchMedia('(min-width: 1200px)');

  const theme = useRef<CSSStyleDeclaration>(generateTheme());

  const location = useLocation();

  const [selected, setSelected] = useState<string>(
    currentLocation(location.pathname, 'project')
  );
  const [toggled, setToggled] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    query.matches ? false : true
  );
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '0.87rem',
      [`&.${menuClasses.menuItemRoot}:not(.sidebar-no-hover):not(.sidebar-collapsed)`]:
        {
          padding: '0.1rem 0.55rem'
        },
      [`&.${menuClasses.menuItemRoot}:not(.sidebar-no-hover).sidebar-collapsed`]:
        {
          paddingTop: '0.1rem'
        },
      [`&.${menuClasses.menuItemRoot}:not(.sidebar-no-hover) .${menuClasses.button}:hover`]:
        {
          color: theme.current.getPropertyValue(
            '--color-sidebar-menu-hover-color'
          ),
          backgroundColor: theme.current.getPropertyValue(
            '--color-sidebar-menu-hover-bg'
          )
        },
      [`&.${menuClasses.menuItemRoot}:not(.sidebar-no-hover) .${menuClasses.button}.${menuClasses.active}`]:
        {
          color: theme.current.getPropertyValue(
            '--color-sidebar-menu-active-color'
          ),
          backgroundColor: theme.current.getPropertyValue(
            '--color-sidebar-menu-active-bg'
          )
        },
      [`&.${menuClasses.menuItemRoot}:not(.sidebar-no-hover):not(.sidebar-collapsed) .${menuClasses.button}:hover,
        &.${menuClasses.menuItemRoot}:not(.sidebar-no-hover):not(.sidebar-collapsed) .${menuClasses.button}.${menuClasses.active}`]:
        {
          borderRadius: '0.4rem'
        },
      [`&.${menuClasses.subMenuRoot}:not(.sidebar-collapsed):not(.ps-open):has(.${menuClasses.button}.ps-active) > .${menuClasses.button},
        &.${menuClasses.subMenuRoot}:has(.sidebar-collapsed):has(.${menuClasses.button}.ps-active) > .${menuClasses.button}`]:
        {
          borderRadius: '0.4rem',
          color: theme.current.getPropertyValue(
            '--color-sidebar-menu-active-color'
          ),
          backgroundColor: theme.current.getPropertyValue(
            '--color-sidebar-menu-active-bg'
          )
        },
      [`&.${menuClasses.subMenuRoot}.sidebar-collapsed:has(.${menuClasses.button}) .${menuClasses.button}:hover, 
          &.${menuClasses.subMenuRoot}.sidebar-collapsed:has(.${menuClasses.button}.ps-active) .${menuClasses.button}.${menuClasses.active}`]:
        {
          borderRadius: 0
        },
      [`&.${menuClasses.subMenuRoot} .${menuClasses.button}`]: {
        marginBottom: '0.15rem'
      }
    },
    icon: {
      [`&.${menuClasses.disabled}`]: {
        color: theme.current.getPropertyValue(
          '--color-sidebar-menu-disabled-color'
        )
      }
    },
    button: {
      [`&:hover`]: {
        backgroundColor: 'transparent'
      }
    },
    label: ({ open, disabled, active }) => ({
      color: disabled
        ? theme.current.getPropertyValue('--color-sidebar-menu-disabled-color')
        : 'inherit',
      fontWeight: open ? 700 : 500
    })
  };
  const handleBackDropClick = useCallback(() => setToggled(false), []);

  const handleSelectMenuItem = useCallback((title: string) => {
    setSelected(title);
  }, []);

  const handleSideBarToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  useImperativeHandle(ref, () => ({
    handleSelectMenuItem: handleSelectMenuItem,
  }));
  return (
    <Sidebar
      width="17.5rem"
      toggled={toggled}
      collapsed={isCollapsed}
      onBackdropClick={handleBackDropClick}
      backgroundColor={theme.current.getPropertyValue('--color-sidebar-bg')}
      rootStyles={{
        border: 'none',
        height: '100vh',
        paddingRight: '0.05rem',
        color: theme.current.getPropertyValue('--color-sidebar-color'),
        backgroundColor: theme.current.getPropertyValue('--color-sidebar-bg'),
      }}
      className={classes.sideBar}
    >
      <div className={classes.innercontainer}>
        <Menu menuItemStyles={menuItemStyles}>
          <SideBarToggle
            collapsed={isCollapsed}
            toggleHandler={handleSideBarToggle}
          />
          <div
            className={`text-center mt-5 mb-5 ${
              isCollapsed ? classes.imgCollapsed : ''
            }`}
          >
            <Image alt="logo" className={classes.img} src={logo} />
            <div className={classes.imgTitle}>My Company</div>
          </div>
          <div className={classes.elemBounceHover}>
            <MenuItem
              active={selected.toUpperCase() === 'HOME'}
              onClick={() => handleSelectMenuItem('HOME')}
              icon={<FaHouse size={'1.2rem'} className={classes.icon} />}
              component={<Link to="/" />}
              className={`'mb-3' ${isCollapsed ? 'sidebar-collapsed' : ''}`}
            >
              Home
            </MenuItem>
            <MenuItem
              active={selected.toUpperCase() === 'EMPLOYEE'}
              onClick={() => handleSelectMenuItem('EMPLOYEE')}
              icon={<FaUserLarge size={'1.2rem'} className={classes.icon} />}
              component={<Link to="/employee" />}
              className={`'mb-3' ${isCollapsed ? 'sidebar-collapsed' : ''}`}
            >
              Employee
            </MenuItem>
          </div>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default forwardRef<SidebarRef, SidebarProp>(SideBar);
