import React from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';

import classes from './ActionButton.module.less';

const ActionButton: React.FC<{
  handleCancel: () => void;
  handleSubmit: () => void;
}> = ({ handleCancel, handleSubmit }) => {
  return (
    <div className={classes.infoFooter}>
      <Container className={classes.infoInnerFooter}>
        <Row>
          <Col lg={6} className={'text-center'}>
            <Button
              onClick={handleCancel}
              variant="outline-secondary"
              className={`${classes.btn} ${classes.btnsecondary}`}
            >
              Cancel
            </Button>
          </Col>
          <div className={`d-lg-none ${classes.divider}`}></div>
          <Col lg={6} className={'text-center'}>
            <Button
              onClick={handleSubmit}
              className={`light-btn-success ${classes.btn}`}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ActionButton;
