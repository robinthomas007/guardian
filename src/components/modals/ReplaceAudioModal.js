import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import './ReplaceAudioModal.css';

class ReplaceAudioModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
    this.props.handleClose();
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange = e => {
    this.props.onChange(e);
  };

  render() {
    const { t } = this.props;
    return (
      <Modal id="ReplaceAudioModal" show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.modalAction === 'Replace' ? t('audio:replace') : t('audio:upload')}{' '}
            {t('audio:Audiofile')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              {t('audio:replaceModalText1')}{' '}
              {this.props.modalAction === 'Replace'
                ? t('audio:replace').toLocaleLowerCase()
                : t('audio:upload').toLocaleLowerCase()}{' '}
              {t('audio:replaceModalText2')}
            </li>
            <li>
              <div className="audio-drop-area d-flex justify-content-center">
                <span className="align-self-center">{t('audio:dragAndDropFiles')}</span>
                <input
                  type="file"
                  id="audioFiles"
                  multiple={false}
                  onChange={this.handleChange}
                  accept=".wav, .mp3, .flac"
                />
              </div>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" id="doneButton" onClick={this.handleClose}>
            {t('audio:done')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withTranslation('audio')(ReplaceAudioModal);
