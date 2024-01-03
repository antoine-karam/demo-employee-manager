import React from 'react';
import { Params, useMatches } from 'react-router-dom';
import { Breadcrumb as RbBreadcrumb } from 'react-bootstrap';

import classes from './Breadcrumb.module.less';

type Tmatch = {
  id: string;
  pathname: string;
  params: Params<string>;
  data: any;
  handle: any;
};

const Breadcrumb: React.FC = () => {
  const matches = useMatches();

  let crumbs = matches.filter((match: Tmatch) => Boolean(match.handle?.crumb));

  return (
    <RbBreadcrumb>
      {crumbs.map((match: Tmatch, index: number) => {
        let pathName = match.pathname;
        if (pathName !== '/' && match.pathname.endsWith('/')) {
          pathName = pathName.substring(0, pathName.length - 1);
        }
        const isActive = pathName === window.location.pathname;
        return (
          <RbBreadcrumb.Item key={index} active={isActive} linkAs="span">
            <span className={classes.routePlaceHolder}>
              {match.handle.crumb(match.pathname, isActive, match.params)}
            </span>
          </RbBreadcrumb.Item>
        );
      })}
    </RbBreadcrumb>
  );
};

export default Breadcrumb;
