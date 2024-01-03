import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Image } from 'react-bootstrap';
import classes from './ErrorBoundary.module.less';
import logo from '../../../assets/logo.jpg';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}
//I kept this as a class component just to showcase that I can develop in both architectures although the class component is not recommended
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.container}>
          <div className={classes.titleContainer}>
            <Image alt="logo" src={logo} className={classes.img} />
            <span className={classes.title}>Employee Manager</span>
          </div>
          <div className={classes.innerContainer}>
            <div className={classes.flash}>Oops</div>
            <h2>An unexpected error occurred</h2>
            <h5>Something went wrong</h5>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
