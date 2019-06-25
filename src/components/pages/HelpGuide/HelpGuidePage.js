import React, { Component } from 'react';
import {Accordion, Card, Button, Tab, Tabs} from 'react-bootstrap'; 
import './HelpGuide.css';

class faqs extends Component {
render() {
    return (
        <section className="page-container h-100">
        <h1>Help Guide</h1>
        <div className="row no-gutters">
            If you can't locate an answer to your support question below please feel free to email us at <a href="mailto:guardian-support@theguardian.umusic.com">guardian-support@theguardian.umusic.com</a>
         </div>
         <br /><br />
      
                <Tabs>
                    <Tab eventKey="FAQs" title="FAQs">
                    <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          What actions can I perform on the 'Find A Project' screen?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            On the Find A Project screen, or Project Dashboard you'll find all of the projects that your account has access to.<br /><br />

                            On Find A Project you can:<br /><br />

                                    <ul>
                                        <li>View projects that have been submitted by you and those within your label group, or projects that have been shared with you from outside your label group.</li>
                                        <li>Create new projects.</li>
                                        <li>Update existing projects still 'In Process' status (See below for more information on project status classifications.)</li>
                                    </ul>
                                
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            What do the various 'Project Statuses' mean? 
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            The status of your project in the Find A Project defines the point at which your project stands within the submission process.<br /><br />

                            The projects statuses are:<br /><br />

                                    <ul>
                                        <li><label>In Process:</label> The project has not been finalized and may require additional information or assets.</li>
                                        <li><label>Submitted:</label> This project has been finalized and is awaiting upload into the content protection systems. </li>
                                        <li><label>Completed:</label> This project has been successfully added into the content protection systems.</li>
                                    </ul>

                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            How do the 'Project Security' levels offered differ?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            When creating a new project you can choose whether or not all those within your label group can view and update the project being submitted.<br /><br />

                            The project security options are:<br /><br />

                                    <ul>
                                        <li><label>Public (Viewable By All Label Members):</label> All members within your label group may view and update the project.</li>
                                        <li><label>Private (Viewable Only By You and Additional Contacts):</label> Only you and those accounts or contacts specified within the 'Additional Contacts' box can view and update the project.</li>
                                    </ul>

                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                </Accordion>
                    </Tab>
                    <Tab eventKey="Videos" title="Tutorial Videos">Videos Here</Tab>
                </Tabs>



                

        </section>
        )
    }
};

export default faqs;