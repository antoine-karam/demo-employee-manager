import React from 'react';
import { Image } from 'react-bootstrap';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useRouteError, useLocation, Link } from 'react-router-dom';

import logo from '../../../assets/logo.jpg';


import classes from './ErrorPage.module.less';

const ErrorPage: React.FC = () => {
  const { state } = useLocation();

  const error: any = useRouteError();

  let status = state?.status ?? error?.status;
  let title = state?.title ?? 'An error occurred!';
  let description = state?.description ?? 'Something went wrong!';

  if (status === 500) {
    description = error.data.message;
  }

  if (status === 404) {
    title = 'Not found!';
    description = 'Could not find resource or page.';
  }

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Image alt="logo" className={classes.img} src={logo} />
        <span className={classes.title}>MY PROJECT</span>
      </div>
      <div className={classes.innerContainer}>
        <div className={classes.flash}>Oops</div>
        <h2>{title}</h2>
        <h5>{description}</h5>
        <p
          className={`${classes.goBackContainer} elem-bounce-vertical-2-times`}
        >
          <IoArrowBackOutline />
          <Link to=".." relative="path" className={classes.goBack}>
            &nbsp;Go Back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
