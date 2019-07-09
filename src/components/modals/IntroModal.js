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
                  UMG's Content Protection Guardian application is a 'one-stop-shop' for all of your content protection and anti-piracy needs. Here, users can set up new and upcoming releases for protection services, including:
                  <ul>
                      <li>
                          <div className='leak-detection'></div>
                          <div>Content Protection, Leak Detection &amp; Monitoring</div>
                      </li>
                      <li>
                          <div className='web-crawling'></div>
                          <div>Web-Crawling &amp; Take-downs from Unlicensed Platforms</div>
                      </li>
                      <li>
                          <div className='territorial-rights'></div>
                          <div>Establish Territorial Rights &amp; Set Post-Release UGC Blocking Policies</div>
                      </li>
                  </ul>
                  Feel free to click on any of the helpful informational buttons scattered throughout the site but please also contact us at the address below. We are here to help you achieve success for your artists!
                  
                  <br />
                  <br />

                  <a href="#">Have a question or need help getting started? Click Here</a>

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
                    <label class="noshow-label">Do not show this anymore.</label>
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