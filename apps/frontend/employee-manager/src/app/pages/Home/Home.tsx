import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { delay } from '../../helper/general';
import LoaderScreen from '../../components/Loader/LoaderScreen';
import ContentScreen from '../../components/Content/ContentScreen';
import { Button, Col, Container, Row } from 'react-bootstrap';
import classes from './Home.module.less'
const Home: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const [isError, setIsError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initialized = useRef<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const populate = async () => {
        await delay(500);
        return [];
      };
      populate()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error: unknown) => {
          setIsLoading(false);
          setIsError('loading');
        });
    }
  }, []);

  if (isError === 'loading') {
    navigate('/error', {
      state: {
        status: 600,
        title: 'Loading failed',
        description: 'Failed to load data!',
      },
    });
  }

  if (isLoading) {
    return <LoaderScreen text="Loading" />;
  }

  return (
    <ContentScreen title={title} description={description}>
      <div className={classes.heroSection}>
        <h1>Efficient Employee Management</h1>
        <p>Streamline your HR processes with our comprehensive management system.</p>
        <Button variant="primary">Get Started</Button>
      </div>

      <Container>
        <Row className={`${classes.featuresSection} my-5`}>
          <Col md={4}>
            <h2>Employee Tracking</h2>
            <p>Keep track of employee information, attendance, and more.</p>
          </Col>
          <Col md={4}>
            <h2>Performance Reviews</h2>
            <p>Evaluate and manage employee performance efficiently.</p>
          </Col>
          <Col md={4}>
            <h2>Payroll Management</h2>
            <p>Simplify your payroll process with automated solutions.</p>
          </Col>
        </Row>

        <Row className={`${classes.demoSection} my-5`}>
          <Col>
            <h2>Interactive Demo</h2>
            <p>Take a tour of our system and explore its features.</p>
            <Button variant="secondary">View Demo</Button>
          </Col>
        </Row>

        <Row className={`${classes.testimonialsSection} my-5`}>
          <Col>
            <h2>What Our Users Say</h2>
            <blockquote>"This system has revolutionized how we manage our employees."</blockquote>
          </Col>
        </Row>

        <Row className={`${classes.ctaSection} my-5`}>
          <Col>
            <h2>Ready to Get Started?</h2>
            <Button variant="success">Contact Us</Button>
          </Col>
        </Row>
      </Container>
    </ContentScreen>
  );
};

export default Home;
