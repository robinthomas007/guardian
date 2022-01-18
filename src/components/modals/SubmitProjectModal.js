import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';

class SubmitProjectModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const { t } = this.props;
    return (
      <Modal id="SubmitProjectModal" show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Body>
          <div className="alert alert-danger" role="alert">
            {t('review:AreYouSureMain')} <i>{t('review:AreYouSureSub')}</i>
          </div>
          <div className="submit-buttons float-right">
            <Button variant="secondary" onClick={this.props.handleClose}>
              {t('review:Cancel')}
            </Button>
            <Button variant="primary" onClick={this.props.handleSubmitProjectClick}>
              {t('review:SubmitProject')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(SubmitProjectModal);
