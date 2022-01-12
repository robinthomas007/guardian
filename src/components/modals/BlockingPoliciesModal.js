import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import './BlockingPoliciesModal.css';

class BlockingPoliciesModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      projectID: '',
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleNoAudioClick = event => {
    event.preventDefault();

    const fetchHeaders = new Headers({
      Authorization: sessionStorage.getItem('accessToken'),
      'Project-Id': this.state.projectID,
    });

    const paramData = { ProjectID: this.state.projectID, PagePath: 'blockingPolicies' };

    fetch(window.env.api.url + '/project/pageskipped', {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify(paramData),
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        if (this.state.projectID) {
          this.props.history.push({
            pathname: '/reviewSubmit/' + this.state.projectID,
          });
        } else {
          this.props.history.push({
            pathname: '/reviewSubmit',
          });
        }
      })
      .catch(error => console.error(error));
  };

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.state.projectID !== this.props.match.params.projectID
    ) {
      this.setState({ projectID: this.props.match.params.projectID });
    }
    this.handleShow();
  }

  render() {
    const { t } = this.props;
    return (
      <Modal id="BlockingPolicies" show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('blocking:popupmessage')}
          <span>
            <br />
            <Button variant="primary" id="yesButton" onClick={this.handleClose}>
              {t('blocking:Yes')}
            </Button>
            <Button variant="primary" id="noButton" onClick={this.handleNoAudioClick}>
              {t('blocking:Skip')}
            </Button>
          </span>
          <div className="alert alert-primary clearfix" role="alert">
            {t('blocking:PopupMessageDescriptionMain')}
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(BlockingPoliciesModal);
