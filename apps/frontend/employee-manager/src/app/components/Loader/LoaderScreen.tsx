import React, { ReactNode, useEffect, useState } from 'react';
import { Spinner, Image } from 'react-bootstrap';

import logo from '../../../assets/logo.jpg';

import classes from './LoaderScreen.module.less';

const LoaderScreen: React.FC<{ text?: string; children?: ReactNode }> = ({
  text,
  children,
}) => {
  const [isDraw1, setIsDraw1] = useState<boolean>(false);
  const [isDraw2, setIsDraw2] = useState<boolean>(false);
  const [isDraw3, setIsDraw3] = useState<boolean>(false);
  const [isDraw4, setIsDraw4] = useState<boolean>(false);

  let content: ReactNode = (
    <div className={classes.contentContainer}>
      {!text && <Image alt="logo" className={classes.img} src={logo} />}
      {text && <p className={classes.text}>{text}</p>}
      <div
        className={`${classes.spinnerContainer} ${text && classes.spinnerText}`}
      >
        <Spinner animation="grow" size="sm" className={classes.spinner} />
        {isDraw1 && (
          <Spinner animation="grow" size="sm" className={classes.spinner} />
        )}
        {isDraw2 && (
          <Spinner animation="grow" size="sm" className={classes.spinner} />
        )}
        {isDraw3 && (
          <Spinner animation="grow" size="sm" className={classes.spinner} />
        )}
        {isDraw4 && (
          <Spinner animation="grow" size="sm" className={classes.spinner} />
        )}
      </div>
    </div>
  );

  if (children) {
    content = children;
  }

  useEffect(() => {
    const myInterval1 = setInterval(() => setIsDraw1(true), 200);
    const myInterval2 = setInterval(() => setIsDraw2(true), 300);
    const myInterval3 = setInterval(() => setIsDraw3(true), 400);
    const myInterval4 = setInterval(() => setIsDraw4(true), 500);
    return () => {
      clearInterval(myInterval1);
      clearInterval(myInterval2);
      clearInterval(myInterval3);
      clearInterval(myInterval4);
    };
  }, []);

  return (
    <div className={`${classes.container} ${text && classes.textContainer}`}>
      <div className={classes.innerContainer}>{content}</div>
    </div>
  );
};

export default LoaderScreen;
