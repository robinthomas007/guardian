import React, { Component } from 'react';
import {Accordion, Card, Button, Tab, Tabs} from 'react-bootstrap';
import { withRouter } from 'react-router-dom'; 
import './HelpGuide.css';

class HelpGuide extends Component {
render() {
    return (
        <div className="col-10">
        <h2>Help / FAQs</h2>
        <div className="row no-gutters">
            If you can't locate an answer to your support question below please feel free to email us at <a href="mailto:guardian-support@theguardian.umusic.com">guardian-support@theguardian.umusic.com</a>
         </div>
         <br /><br />
      
                <Tabs>
                    <Tab eventKey="FAQs" title="FAQs">
                        <span className="instructions">Click on a question below to review the information pertaining to the subject.</span>
                    <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="button" eventKey="0">
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
                        <Accordion.Toggle as={Button} variant="button" eventKey="1">
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
                        <Accordion.Toggle as={Button} variant="button" eventKey="2">
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

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="button" eventKey="3">
                            How do I use the 'Territorial Rights' screen?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                        <Card.Body>
                        On the Territorial Rights screen you can specify UMG’s territorial rights for any or all of the tracks for this project.  Please be certain you’re accurately representing this information.
The Default territorial rights policy is set to “World Wide,” to change this, click on the globe and move the appropriate territories to either the “Included” or “Excluded” box.
                        <br /><br />
                        If you’d like update the territorial rights for the entire project, be sure to select “Yes” when you receive the pop-up message that reads “Apply these territories as project DEFAULT?”
If the territorial rights are specific to only that track, select “No” when you receive the pop-up message that reads “Apply these territories as project DEFAULT?”


                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="button" eventKey="4">
                            How do I use the 'UGC Blocking' screen?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                        <Card.Body>
                        The UGC Blocking section is where you can request for a project (or specific tracks within a project) to continue to be blocked on licenced platforms beyond the release date.
                        <br /><br />
                        If you’d like update the territorial rights for the entire project, be sure to select “Yes” when you receive the pop-up message that reads “Apply these territories as project DEFAULT?”
If the territorial rights are specific to only that track, select “No” when you receive the pop-up message that reads “Apply these territories as project DEFAULT?”
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                </Accordion>
                    </Tab>
                    <Tab eventKey="Videos" title="Tutorial Videos">
                    <span className="instructions">Click on a video below to view a tutorial.</span>
                    </Tab>
                </Tabs>



                

        </div>
        )
    }
};

export default withRouter(HelpGuide); 