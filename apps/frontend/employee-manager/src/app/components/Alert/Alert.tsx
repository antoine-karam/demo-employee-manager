import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Alert as RBAlert } from 'react-bootstrap';

import classes from './Alert.module.less';

type AlertProps = {
  header: string;
  body: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  timer?: number;
  autoHide?: boolean;
  onClose: () => void;
};

const Alert: React.FC<AlertProps> = ({
  header,
  body,
  className,
  headerClassName,
  bodyClassName,
  variant,
  timer,
  autoHide = true,
  onClose,
}) => {
  const closeTimeOut = useRef<any>(null);
  const [status, setStatus] = useState<string>(classes.fadeIn);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (autoHide && status === classes.fadeOut) {
      closeTimeOut.current = setTimeout(() => {
        onClose();
      }, timer || 1000);
    }
    return () => {
      clearTimeout(closeTimeOut.current);
    };
  }, [status]);

  useEffect(() => {
    if (autoHide) {
      const myTimeout = setTimeout(() => {
        setStatus(classes.fadeOut);
      }, timer || 1000);
      return () => {
        clearTimeout(myTimeout);
        clearTimeout(closeTimeOut.current);
      };
    }
  }, []);

  return (
    <RBAlert
      dismissible
      onClose={handleClose}
      variant={variant || 'info'}
      className={`${classes.container} ${className} ${status}`}
    >
      <RBAlert.Heading className={headerClassName}>{header}</RBAlert.Heading>
      <div className={`mt-2 ${bodyClassName}`}>{body}</div>
    </RBAlert>
  );
};

export default Alert;
