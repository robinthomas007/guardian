import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import './IntroModal.css';
import Cookies from 'universal-cookie';


class IntroModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      doNotShow : false
    };

    this.doNotShowAgain = this.doNotShowAgain.bind(this);
  }

  doNotShowAgain(event) {
    this.setState({ doNotShow: true });
  }

  handleClose(event) {
    if(this.state.doNotShow) {
      const cookies = new Cookies();
      const todaysDate = new Date();
      const futureDate = new Date(todaysDate.getFullYear() + 100, todaysDate.getMonth(), todaysDate.getDate())
      cookies.set('guardianShowLoginModal', false, { path:'/', expires: futureDate });
    }
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    this.handleShow()
  }

  getModal() {
    const cookies = new Cookies();
    if(!cookies.get('guardianShowLoginModal')) {
      return(
        <>
          <Modal id='IntroModal' size="lg" show={this.state.show} onHide={this.handleClose}>
            <div className='red-diag'>
              <div className='purp-diag'>
                <Modal.Header  closeButton>
                  <Modal.Title>Welcome to the Guardian!</Modal.Title>
                </Modal.Header>
          
                <Modal.Body>
                UMG’s Content Protection Guardian is a “one-stop shop” for all your Content Protection and Anti-Piracy needs. <br /> Here, users can set up new releases for anti-piracy services, including:
                  <ul>
                      <li>
                          <div className='leak-detection'></div>
                          <div>Content protection, leak detection and monitoring</div>
                      </li>
                      <li>
                          <div className='web-crawling'></div>
                          <div>Web-crawling and takedowns from unlicensed platforms</div>
                      </li>
                      <li>
                          <div className='territorial-rights'></div>
                          <div>Establish territorial rights and set post-release UGC blocking policies</div>
                      </li>
                  </ul>
                  Feel free to click on any of the helpful info buttons scattered throughout the site but you can always reach out to contact us at the address below.  We’re here to help you achieve success for your artists!
                  
                  <br />
                  <br />

                  Have a question or need help getting started? <a href="#">Click Here</a> or contact us directly at <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>

                  <br />
                  <br />
                </Modal.Body>
          
                <Modal.Footer>
                  <div className="show-check">
                    <label className="custom-checkbox"> 		
                      <input
                        id='doNotShowIntro'  
                        type='checkbox' 
                        onChange={this.doNotShowAgain}
                      />
                      <span className="checkmark "></span>
                    </label>
                    <label htmlFor={'doNotShowIntro'} class="noshow-label">Do not show this anymore.</label>
                  </div>
            
                  <Button 
                    variant="primary" 
                    onClick={this.handleClose}
                    id="introModalContinue"
                  >
                    Continue
                  </Button>
                </Modal.Footer>
              </div>
            </div>
          </Modal>
        </>
      )
    } else {
      return(null)
    }
  }

  render() {
    return(
      <>
        {this.getModal()}
      </>
      
    )    
  }
}

export default (IntroModal);