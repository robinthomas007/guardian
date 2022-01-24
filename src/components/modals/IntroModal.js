import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './IntroModal.css';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import VideoPlayer from 'components/template/VideoPlayer';

class IntroModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      doNotShow: false,
    };

    this.doNotShowAgain = this.doNotShowAgain.bind(this);
  }

  doNotShowAgain(event) {
    this.setState({ doNotShow: true });
  }

  handleClose(event) {
    if (this.state.doNotShow) {
      const cookies = new Cookies();
      const todaysDate = new Date();
      const futureDate = new Date(
        todaysDate.getFullYear() + 100,
        todaysDate.getMonth(),
        todaysDate.getDate(),
      );
      cookies.set('guardianShowLoginModal', false, { path: '/', expires: futureDate });
    }
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    this.handleShow();
  }

  getModal(t) {
    const cookies = new Cookies();
    if (!cookies.get('guardianShowLoginModal')) {
      return (
        <>
          <Modal id="IntroModal" size="lg" show={this.state.show} onHide={this.handleClose}>
            <div className="red-diag">
              <div className="purp-diag">
                <Modal.Header closeButton>
                  <Modal.Title>{t('Guardian')}</Modal.Title>
                  <span style={{ margin: '10px 0 0 auto' }}>
                    <VideoPlayer
                      text={t('Intro')}
                      title="Introduction Video"
                      link="https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+1+Introduction.mp4"
                    />
                  </span>
                </Modal.Header>

                <Modal.Body>
                  {t('GuardianDesc')}
                  <br />
                  {t('GuardianDescSub')}
                  <ul>
                    <li>
                      <div className="leak-detection"></div>
                      <div>{t('ContentProtection')}</div>
                    </li>
                    <li>
                      <div className="web-crawling"></div>
                      <div>{t('WebCrawling')}</div>
                    </li>
                    <li>
                      <div className="territorial-rights"></div>
                      <div>{t('TerritorialRights')}</div>
                    </li>
                  </ul>
                  {t('ContactUs')}
                  <br />
                  <br />
                  {t('Help')}
                  &nbsp;
                  <NavLink to={{ pathname: '/helpGuide' }}>{t('ClickHere')}</NavLink>
                  {t('Msg')}
                  <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                  <br />
                  <br />
                </Modal.Body>

                <Modal.Footer>
                  <div className="show-check">
                    <label className="custom-checkbox">
                      <input id="doNotShowIntro" type="checkbox" onChange={this.doNotShowAgain} />
                      <span className="checkmark "></span>
                    </label>
                    <label htmlFor={'doNotShowIntro'} className="noshow-label">
                      {t('DoNotShow')}
                    </label>
                  </div>

                  <Button variant="primary" onClick={this.handleClose} id="introModalContinue">
                    {t('Continue')}
                  </Button>
                </Modal.Footer>
              </div>
            </div>
          </Modal>
        </>
      );
    } else {
      return null;
    }
  }

  render() {
    return <>{this.getModal(this.props.t)}</>;
  }
}

export default withTranslation('intro')(IntroModal);
