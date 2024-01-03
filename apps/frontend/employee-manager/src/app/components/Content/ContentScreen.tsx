import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

import Breadcrumb from '../Breadcrumb/Breadcumb';

import classes from './ContentScreen.module.less';

const ContentScreen: React.FC<{
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  noBreadCrumb?: boolean;
  containerClassName?: string;
  bodyClassName?: string;
  childrenClassName?: string;
}> = ({
  title,
  description,
  noBreadCrumb,
  containerClassName,
  bodyClassName,
  childrenClassName,
  children,
}) => {
  return (
    <div className={`${classes.container} ${containerClassName}`}>
      {!noBreadCrumb && (
        <div className={classes.breadcrumb}>
          <Breadcrumb />
        </div>
      )}
      <Card className={`${classes.main} ${bodyClassName}`}>
        <Card.Body>
          <Card.Title className={classes.title}>{title}</Card.Title>
          {description && (
            <Card.Subtitle className={classes.subtitle}>
              {description}
            </Card.Subtitle>
          )}
          <div className={`${classes.children} ${childrenClassName}`}>
            {children}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContentScreen;
