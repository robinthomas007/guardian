import React, { Component } from 'react';
import {Accordion, Card} from 'react-bootstrap'; 
import './faqs.css';

class faqs extends Component {
render() {
    return (
        <section className="page-container h-100">

        <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>FAQs</h2>
                        <p>If you can't locate an anwer to your support question below please feel free to email us at <a href="mailto:guardian-support@theguardian.umusic.com">guardian-support@theguardian.umusic.com</a></p>
                    </div>
                </div>

                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

        </section>
        )
    }
};

export default faqs;