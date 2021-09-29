import React, { Component } from 'react';
import { Accordion, Card, Button, Tab, Tabs } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './HelpGuide.css';
import VideoTutorialModal from '../../modals/VideoTutorialModal';

class HelpGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoTutorialModal: false,
      activeVideo: null,
      key: 'FAQs',
      videos: [
        {
          description: 'Guardian Complete Introduction',
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Find-A-Project.mp4',
          modalHeader: 'Guardian Complete Introduction',
        },
        {
          description: 'Release Info',
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Release-Information-Step-1.mp4',
          modalHeader: 'Release Information',
        },
        {
          description: 'Contacts',
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Project-Contact-Information-Step-2.mp4',
          modalHeader: 'Project Contacts',
        },
        {
          description: 'Audio Files',
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Audio-Files-Part-1-Step-3.mp4',
          modalHeader: 'Audio Files',
        },
        {
          description: 'Track Info',
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Track-Information-Step-4.mp4',
          modalHeader: 'Track Information',
        },
        {
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Territorial-Rights-Step-5.mp4',
          modalHeader: 'Territorial Rights',
        },
        {
          description: 'Blocking',
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Project-Blocking-Policies-Step-6.mp4',
          modalHeader: 'Post-Release UGC Blocking',
        },
        {
          description: 'Review',
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Review-(Review-&-Submit)-Step-7.mp4',
          modalHeader: 'Review and Submit',
        },
      ],
    };
  }

  showVideoTutorialModal = val => {
    this.setState({ showVideoTutorialModal: true, activeVideo: val });
  };

  hideVideoTutorialModal = () => {
    this.setState({ showVideoTutorialModal: false });
  };

  setKey = key => {
    this.setState({ key: key });
  };

  componentDidMount() {
    console.log(this.props.match.params.id, 'this.props.match.params.id');
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id === '2'
    )
      this.setState({ key: 'Videos' });
  }

  render() {
    const { videos, activeVideo, showVideoTutorialModal, key } = this.state;
    return (
      <div className="col-10">
        {activeVideo !== null && (
          <VideoTutorialModal
            showModal={showVideoTutorialModal}
            handleClose={this.hideVideoTutorialModal}
            navSteps={videos}
            activeNav={activeVideo}
            MoreVideos={false}
          />
        )}
        <h2>Help / FAQs</h2>
        <div className="row no-gutters">
          If you can't locate an answer to your support question below please feel free to email us
          at <a href="mailto:guardian-support@umusic.com">&nbsp;guardian-support@umusic.com</a>
        </div>
        <br />
        <br />

        <Tabs activeKey={key} onSelect={k => this.setKey(k)}>
          <Tab eventKey="FAQs" title="FAQs">
            <div className="row d-flex w-100">
              <div className="flex-fill col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>General Information</h2>
                        Click on a question below to review the information pertaining to the
                        subject.
                        <br />
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="0">
                        What is the Guardian?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        UMG’s Content Protection Guardian is a “one-stop shop” for all your Content
                        Protection and Anti-Piracy needs. Here, users can set up new releases for
                        anti-piracy protection services, including: content protection, leak
                        detection and monitoring, web-crawling and takedowns from unlicensed
                        platforms, establish territorial rights and set post-release UGC blocking
                        policies.
                        <br />
                        <br />
                        Have a question or need help getting started? Contact us directly at{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        .
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="1">
                        How do I create an account for The Guardian?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        To create an account, you just need to select the “Request Access” option on
                        the welcome page. The Guardian is already set-up to work with your Okta
                        account. So, if you already have an Okta account, you’re all ready to log
                        in!
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="2">
                        How soon should projects be submitted for anti-piracy protection?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        The short answer is “as soon as possible.” The earlier any information is
                        added to The Guardian, the better chance we have of detecting and
                        suppressing a leak. Our greatest successes have occurred when we were well
                        ahead of the game on project setup!
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="3">
                        What’s the difference between pre-release and post-release?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        For our purposes, the pre-release period is considered to be the time period
                        PRIOR to the primary commercial release date of the title in question.
                        Post-release is considered to be the time period following the primary
                        commercial release date of that title.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="4">
                        Someone else has some of the information for my project. How can they add
                        it?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        The Guardian was actually designed to be a collaborative platform, allowing
                        multiple users to work together on projects. So, as long as the other user
                        is a part of your label group OR they are included in the additional
                        contacts for the project in Step 2: Project Contacts, they will be able to
                        add any necessary information to your project.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="5">
                        I work with multiple labels in UMG. How should I set up my account?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        The Guardian allows you to be assigned to as many label groups as you need.
                        Just enter in each label you work with when initially requesting access.
                        Once you’re approved, you’ll be ready to work with each label.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="6">
                        I need to add another label group to my account. What do I do?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="6">
                      <Card.Body>
                        You can send this request to{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>{' '}
                        and a Guardian administrator will have your account updated as soon as
                        possible.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="7">
                        What if I feel totally lost?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="7">
                      <Card.Body>
                        No worries! Please see our instructional videos or for a general overview as
                        well as specific tutorials for each step to get started. You can always come
                        back to the FAQ section for more information. If you’re still unsure of how
                        to proceed or just want some guidance from an actual human being, please
                        reach out to us directly at{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>{' '}
                        and someone on our team will respond as soon as possible!
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="flex-fill col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>Release Info</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="8">
                        How do I find an existing project/release?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="8">
                      <Card.Body>
                        Once you log in, click on “Find a Project” at the top of the screen and
                        either scroll down or search for a project as you would on any other
                        platform.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="9">
                        How do I create a new project/release to submit for anti-piracy protection?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="9">
                      <Card.Body>
                        Once you log in, click on “New Project” at the top of the screen and either
                        scroll down or search for a project as you would on any other platform.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="10">
                        Can I create a project if the name isn’t finalized yet?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="10">
                      <Card.Body>
                        Yes, you can either enter a working title or write “TBD” in the Project
                        Title field. Until the project has been submitted, you’ll still have the
                        ability to go back and update the title at a later date.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="11">
                        What if I don’t know the release date yet?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="11">
                      <Card.Body>
                        Just select “TBD” in the Release TBD checkbox. You can always edit this
                        field at a later date.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>Project Contacts</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="12">
                        Who can view and/or collaborate on a project?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="12">
                      <Card.Body>
                        In essence, Project Security allows you to choose the level of visibility
                        for the project that you’re creating. <br />
                        <br />
                        When a project is set to “Public”, it can be viewed and edited by anyone who
                        is assigned to your label group (e.g. Republic Records). Whereas a project
                        that is set to “Private” will only be viewable and editable by those
                        Guardian users that have been included in the “Additional Contacts” field.
                        So, choose wisely!
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="13">
                        What does “Primary Contact” mean? Who should I put in that field?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="13">
                      <Card.Body>
                        The primary contact is the main point person for a particular project. You
                        can think of them as the lead project manager for that project. Anyone that
                        is included in the “Additional Contacts” field will be included on any
                        correspondence related to that project as well.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="flex-fill col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>Audio Files</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="14">
                        What if I don’t have the final masters yet?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="14">
                      <Card.Body>
                        Setting up a project either with early mixes or even demo versions is
                        perfectly fine. Even after you’ve finalized and submitted a project in
                        Guardian, just send an email to{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>{' '}
                        and we can add in the updated audio versions for your project.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="15">
                        Can I set up a release for anti-piracy WITH audio but WITHOUT release info?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="15">
                      <Card.Body>
                        Unfortunately, no. Our systems will at least require some tentative
                        information including artist name, a working project title and working track
                        titles to begin. <br />
                        <br />
                        You may upload audio files if you have them but they cannot be submitted
                        without a corresponding ISRC. Go to Step 3: Audio Files (video hyperlink
                        here?) of a project to get started and for more info.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="16">
                        How do I replace audio files?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="16">
                      <Card.Body>
                        Under the “Actions” column in Step 3: Audio Files, click the upward pointing
                        arrow (insert icon here?) to replace the existing audio file, then click
                        “Save” or “Save &amp; Continue” to move on to the next step.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="17">
                        Are the audio files I submit watermarked?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="17">
                      <Card.Body>
                        YES! UMG’s Content Protection group has a long-standing policy to NOT accept
                        unwatermarked audio. But, if you have any particular concerns about the
                        security of your music, please feel free to reach out to{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        .
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="flex-fill col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>Track Info</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="18">
                        Can I set up a release for anti-piracy without audio files?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="18">
                      <Card.Body>
                        Yes, that’s no problem! The Guardian will allow you to create a project with
                        as much or as little information as you have available at that time. <br />
                        <br />
                        If you have track information (e.g. artist, title, release date, ISRC) you
                        can submit that to begin web-crawling services which means that our systems
                        can begin searching right away for a potential leak. Go to Step 4: Track
                        Info (video hyperlink here?) of a project to get started and for more info.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="19">
                        Who actually gets to view the release information I’m submitting?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="19">
                      <Card.Body>
                        While the UMG Guardian platform is a highly secure system, a limited number
                        of people may have access to the information you submit. They are all
                        focused on anti-piracy however and have the utmost respect for our music and
                        artists. <br />
                        <br />
                        If you have any particular concerns about the security of your release
                        information, please feel free to reach out to{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        .
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="flex-fill col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>Territorial Rights</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="20">
                        What are “Territorial Rights Sets” and why do I need them?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="20">
                      <Card.Body>
                        Territorial Rights sets (Step 5) allow you specify exactly where in the
                        world UMG owns or distributes the various tracks in your project. It’s
                        especially important to do this if you intend to either block or monetize
                        UGC in those territories. <br />
                        <br />
                        Note that, if UMG does NOT have ownership or distribution rights in a
                        territory, we cannot take either of these actions.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="21">
                        How do I create a “Territorial Rights Set”?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="21">
                      <Card.Body>
                        After creating a new Rights Set, simply click and drag titles to assign them
                        to the appropriate rights set, then select the proper territories where UMG
                        has or does not have rights.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>Review and Submit</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="29">
                        What can I change after submitting a project?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="29">
                      <Card.Body>
                        For any changes you need to make AFTER a project has already been finalized
                        and submitted, please reach out directly to{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        .
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="flex-fill col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>Post-Release UGC Blocking</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="22">
                        What is Post-Release UGC Blocking?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="22">
                      <Card.Body>
                        Post-Release UGC Blocking allows for a Guardian user to establish a specific
                        rule set for when and where UGC (User Generated Content) for a particular
                        title(s) should be blocked after commercial release. <br />
                        <br />
                        Default UMG policy is to block content during the pre-release stage
                        following a leak and later monetize upon commercial release date. However,
                        UGC blocking can be extended beyond release date as needed (subject to
                        approval). In Step 6, if you do NOT create a post-release block policy, UGC
                        will be set to monetize on all licensed platforms once a title is released.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="23">
                        Do I need to set up Post-release Blocking?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="23">
                      <Card.Body>
                        Not at all! While we encourage doing this for high priority releases, at
                        least for a period of time, this is an OPTIONAL step. If you have any
                        questions on post-release UGC blocking, please email us directly at{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        .
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="24">
                        What happens if I don’t create any blocking policies on this page?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="24">
                      <Card.Body>
                        Our default policy is block content pre-release and to monetize content on
                        licensed platforms upon commercial release. So, if you don’t set any
                        blocking policies in Step 6, we will monetize on all platforms once
                        released.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="25">
                        I can’t seem to choose an indefinite date for my blocking policy set, what
                        should I do?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="25">
                      <Card.Body>
                        If you do not input a date in the “Blocked Until” field, UGC blocking will
                        continue indefinitely.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="26">
                        I’m confused about blocking durations (e.g. >30 sec, >1:00, etc.) Can you
                        explain?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="26">
                      <Card.Body>
                        Choosing one of these options means that we will block posts OVER that
                        duration (e.g. posts over 30-seconds, over 1-min, etc.)
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="27">
                        I want to create more than 3 Post-Release Blocking Policies. Can I do this?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="27">
                      <Card.Body>
                        While the number of blocking policies in Guardian is set to a maximum of 3,
                        you can send special requests to{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>{' '}
                        and a Guardian administrator will be able to assist you.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="28">
                        How do I change post-release blocking policies AFTER release?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="28">
                      <Card.Body>
                        If a release was previously finalized and submitted for anti-piracy
                        protection services and you would like to make changes at a later date,
                        please reach out directly to{' '}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>{' '}
                        and an administrator will be in touch.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>

              <div className="flex-fill col-12">
                <br />
                <br />
                <h2>Glossary</h2>
                <br />
                <br />
                <h3>Blocking Policy</h3> A rule set for when and where content should be blocked
                after being made available on licensed platforms (e.g. block posts over 30-seconds
                on Facebook and Instagram until 2-weeks after commercial release). Default UMG
                policy is to block pre-release and monetize upon commercial release.
                <br />
                <br />
                <h3>Filtering</h3> Employs fingerprint technology for the primary purpose of
                blocking content for a period of time as determined by the content owner
                <br />
                <br />
                <h3>Fingerprinting</h3> An audio fingerprint is a unique digital identifier,
                typically used to identify an audio sample or match similar digital content in a
                database. Practical uses include identifying songs for the purpose of
                filtering/blocking or monetizing content (e.g. on YouTube, SoundCloud, etc.) Other
                popular applications include Shazam and Soundhound.
                <br />
                <br />
                <h3>ISRC</h3> The ISRC (International Standard Recording Code) is the international
                identification system for sound recordings and music video recordings. Each ISRC is
                a unique and permanent identifier for a specific recording, independent of the
                format on which it appears (e.g. CD, audio file, etc.) or the rights holders
                involved. Only one ISRC should be issued to a track, and an ISRC can never represent
                more than one unique recording. Format: XXYY12345678 (where XX = 2-letter country
                abbreviation, YY = 2-letter releasing label abbreviation, and 12345678 = unique
                number generated by the releasing label
                <br />
                <br />
                <h3>Metadata</h3> The information associated with and to identify releases (e.g.
                ISRC, artist name, track title, project title, release dates, etc.)
                <br />
                <br />
                <h3>Post-release</h3> The period after any piece of content is commercially released
                to the public
                <br />
                <br />
                <h3>Pre-release</h3> The period before any piece of content is commercially released
                to the public
                <br />
                <br />
                <h3>Territorial Rights</h3> Contractual rules for ownership/distribution of content
                in different countries throughout the globe.
                <br />
                <br />
                <h3>Web-crawling</h3> Automated robots employed to scan both unlicensed and licensed
                web-platforms for the appearance of metadata associated with a release. This type of
                crawling is initiated as soon as metadata is submitted through The Guardian in Step
                4: Track Information, and is highly valuable for detecting pre-release leaks.
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </Tab>
          <Tab eventKey="Videos" title="Tutorial Videos">
            <span className="instructions">Click on a video below to view a tutorial.</span>
            <div className="row d-flex">
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(0);
                    }}
                  ></div>
                  <h3>Guardian Complete Introduction</h3>
                  <p>A complete guide to the Guardian.</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(1);
                    }}
                  ></div>
                  <h3>Release Information</h3>
                  <p>Covers the release information in step 1.</p>
                </div>
              </div>

              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(2);
                    }}
                  ></div>
                  <h3>Contact Information</h3>
                  <p>Reviews the contact information step.</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(3);
                    }}
                  ></div>
                  <h3>Audio Files</h3>
                  <p>Instructions for uploading and saving audio files in the Guardian. </p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(4);
                    }}
                  ></div>
                  <h3>Track Information</h3>
                  <p>This video covers entering track information in the Guardian. </p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(5);
                    }}
                  ></div>
                  <h3>Territorial Rights</h3>
                  <p>A complete guide to establishing rights information in the Guardian.</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(6);
                    }}
                  ></div>
                  <h3>UGC Blocking</h3>
                  <p>How to set up post release UGC blocking in the Guardian.</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(7);
                    }}
                  ></div>
                  <h3>Review and Submit</h3>
                  <p>How to review and submit the project.</p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(HelpGuide);
