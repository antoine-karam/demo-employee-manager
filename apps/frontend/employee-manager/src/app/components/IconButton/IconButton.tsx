import React, { ReactNode, MouseEvent } from 'react';
import Button from 'react-bootstrap/Button';

import classes from './IconButton.module.less';

const IconButton: React.FC<{
  className?: string;
  children: ReactNode;
  disabledFocusOnTab?: boolean;
  onClick?: (event: MouseEvent) => void;
}> = ({ children, className, onClick, disabledFocusOnTab }) => {
  return (
    <Button
      as="div"
      tabIndex={disabledFocusOnTab ? -1 : 0}
      className={`${classes.btn} ${className}`}
      onClick={onClick}
      title=""
    >
      {children}
    </Button>
  );
};

export default IconButton;
