import React, { Component } from 'react';
import { Accordion, Card, Button, Tab, Tabs } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './HelpGuide.css';
import VideoTutorialModal from '../../modals/VideoTutorialModal';
import { withTranslation } from 'react-i18next';

class HelpGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoTutorialModal: false,
      activeVideo: null,
      key: 'FAQs',
      videos: [
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+1+Introduction.mp4',
          modalHeader: props.t('GuardianCompleteIntroduction'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+4+Release+Information.mp4',
          modalHeader: props.t('ReleaseInformation'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+5+Contact+Information.mp4',
          modalHeader: props.t('ContactInformation'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+3.5+Audio+Files.mp4',
          modalHeader: props.t('AudioFiles'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+9+Track+Information.mp4',
          modalHeader: props.t('TrackInformation'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+10+Territorial+Rights.mp4',
          modalHeader: props.t('TerritorialRights'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+12+Blocking+Policies.mp4',
          modalHeader: props.t('UGCBlocking'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+13+Review+%26+Submit.mp4',
          modalHeader: props.t('ReviewandSubmit'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+17+Finding+a+Project.mp4',
          modalHeader: props.t('ProjectSearch'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+11+Alternate+Workflow+-+UPC.mp4',
          modalHeader: props.t('UpcFlow'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+15+Project+Inbox.mp4',
          modalHeader: props.t('Inbox'),
        },
        {
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+14+Adding+Comments.mp4',
          modalHeader: props.t('Notifications'),
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
    const { t } = this.props;
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
        <h2>{t('HelpFaq')}</h2>
        <div className="row no-gutters">
          {t('Description')}
          <a href="mailto:guardian-support@umusic.com">&nbsp;guardian-support@umusic.com</a>
        </div>
        <br />
        <br />

        <Tabs activeKey={key} onSelect={k => this.setKey(k)}>
          <Tab eventKey="FAQs" title={t('Faqs')}>
            <div className="row d-flex w-100">
              <div className="flex-fill col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>{t('GeneralInformation')}</h2>
                        {t('HowTo')}
                        <br />
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="0">
                        {t('Guardian')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {t('GuardianAns')}
                        <br />
                        <br />
                        {t('GuardianAnsSub')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="1">
                        {t('GuardianAccount')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>{t('GuardianAccountAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="2">
                        {t('AntiPiracy')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>{t('AntiPiracyAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="3">
                        {t('Difference')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>{t('DifferenceAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="4">
                        {t('HowToAdd')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>{t('HowToAddAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="5">
                        {t('AccountSetup')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>{t('AccountSetupAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="6">
                        {t('AddLabel')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="6">
                      <Card.Body>
                        {t('AddLabelAns')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        {t('AddLabelAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="7">
                        {t('TotallyLost')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="7">
                      <Card.Body>
                        {t('TotallyLostAns')}
                        <br />
                        <br />
                        {t('TotallyLostAnsSub')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        {t('TotallyLostAnsSub1')}
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
                        <h2>{t('ReleaseInfo')}</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="8">
                        {t('FindRelease')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="8">
                      <Card.Body>{t('FindReleaseAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="9">
                        {t('CreateProject')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="9">
                      <Card.Body>{t('CreateProjectAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="10">
                        {t('CreateProject1')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="10">
                      <Card.Body>{t('CreateProject1Ans')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="11">
                        {t('UnknownReleaseDate')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="11">
                      <Card.Body>{t('UnknownReleaseDateAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>{t('ProjectContacts')}</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="12">
                        {t('Collaborate')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="12">
                      <Card.Body>
                        {t('CollaborateAns')}
                        <br />
                        <br />
                        {t('CollaborateAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="13">
                        {t('PrimaryContact')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="13">
                      <Card.Body>{t('PrimaryContactAns')}</Card.Body>
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
                        <h2>{t('AudioFiles')}</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="14">
                        {t('Finalmasters')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="14">
                      <Card.Body>
                        {t('FinalmastersAns')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        {t('FinalmastersAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="15">
                        {t('WithoutReleaseInfo')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="15">
                      <Card.Body>
                        {t('WithoutReleaseInfoAns')}
                        <br />
                        <br />
                        {t('WithoutReleaseInfoAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="16">
                        {t('Replaceaudiofiles')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="16">
                      <Card.Body>{t('ReplaceaudiofilesAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="17">
                        {t('Watermark')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="17">
                      <Card.Body>
                        {t('WatermarkAns')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
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
                        <h2>{t('TrackInfo')}</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="18">
                        {t('WithoutAudioFiles')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="18">
                      <Card.Body>
                        {t('WithoutAudioFilesAns')}
                        <br />
                        <br />
                        {t('WithoutAudioFilesAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="19">
                        {t('Submitting')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="19">
                      <Card.Body>
                        {t('SubmittingAns')}
                        <br />
                        <br />
                        {t('SubmittingAnsSub')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
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
                        <h2>{t('TerritorialRights')}</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="20">
                        {t('TerroritorialRightsNeed')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="20">
                      <Card.Body>
                        {t('TerroritorialRightsNeedAns')}
                        <br />
                        <br />
                        {t('TerroritorialRightsNeedAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="21">
                        {t('TerritorialRightsSet')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="21">
                      <Card.Body>{t('TerritorialRightsSetAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <div>
                        <br />
                        <br />
                        <h2>{t('ReviewandSubmit')}</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="29">
                        {t('AfterSubmitChange')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="29">
                      <Card.Body>
                        {t('AfterSubmitChangeAns')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
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
                        <h2>{t('PostReleaseUGCBlocking')}</h2>
                        <br />
                      </div>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="22">
                        {t('PostReleaseUGCBlock')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="22">
                      <Card.Body>
                        {t('PostReleaseUGCBlockAns')}
                        <br />
                        <br />
                        {t('PostReleaseUGCBlockAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="23">
                        {t('PostReleaseBlock')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="23">
                      <Card.Body>
                        {t('PostReleaseBlockAns')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="24">
                        {t('NoBlockingPolicy')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="24">
                      <Card.Body>{t('NoBlockingPolicyAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="25">
                        {t('IndefiniteDate')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="25">
                      <Card.Body>{t('IndefiniteDateAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="26">
                        {t('Blockingdurations')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="26">
                      <Card.Body>{t('BlockingdurationsAns')}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="27">
                        {t('3PostRelease')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="27">
                      <Card.Body>
                        {t('3PostReleaseAns')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        {t('3PostReleaseAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} className="btn btn-secondary" eventKey="28">
                        {t('ChangeAfterRelease')}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="28">
                      <Card.Body>
                        {t('ChangeAfterReleaseAns')}
                        <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>
                        {t('ChangeAfterReleaseAnsSub')}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>

              <div className="flex-fill col-12">
                <br />
                <br />
                <h2>{t('Glossary')}</h2>
                <br />
                <br />
                <h3>{t('BlockingPolicy')}</h3>
                {t('BlockingPolicyDescription')}
                <br />
                <br />
                <h3>{t('Filtering')}</h3>
                {t('FilteringDescription')}
                <br />
                <br />
                <h3>{t('Fingerprinting')}</h3>
                {t('FingerprintingDescription')}
                <br />
                <br />
                <h3>{t('ISRC')}</h3>
                {t('ISRCDescriptionMain')}
                <br />
                <br />
                {t('ISRCDescriptionSub')}
                <br />
                <br />
                <h3>{t('Metadata')}</h3>
                {t('MetadataDescription')}
                <br />
                <br />
                <h3>{t('Post-release')}</h3>
                {t('Post-releaseDescription')}
                <br />
                <br />
                <h3>{t('Pre-release')}</h3>
                {t('Pre-releaseDescription')}
                <br />
                <br />
                <h3>{t('TerritorialRightsGloss')}</h3>
                {t('TerritorialRightsGlossDescription')}
                <br />
                <br />
                <h3>{t('WebCrawling')}</h3>
                {t('WebCrawlingDescription')}
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </Tab>
          <Tab eventKey="Videos" title={t('TutorialVideos')}>
            <span className="instructions">{t('TutorialVideosDescription')}</span>
            <div className="row d-flex">
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(0);
                    }}
                  ></div>
                  <h3>{t('GuardianCompleteIntroduction')}</h3>
                  <p>{t('GuardianCompleteIntroductionDescription')}</p>
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
                  <h3>{t('ReleaseInformation')}</h3>
                  <p>{t('ReleaseInformationDescription')}</p>
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
                  <h3>{t('ContactInformation')}</h3>
                  <p>{t('ContactInformationDescription')}</p>
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
                  <h3>{t('AudioFiles')}</h3>
                  <p>{t('AudioFilesDescription')}</p>
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
                  <h3>{t('TrackInformation')}</h3>
                  <p>{t('TrackInformationDescription')}</p>
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
                  <h3>{t('TerritorialRights')}</h3>
                  <p>{t('TerritorialRightsDescription')}</p>
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
                  <h3>{t('UGCBlocking')}</h3>
                  <p>{t('UGCBlockingDescription')}</p>
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
                  <h3>{t('ReviewandSubmit')}</h3>
                  <p>{t('ReviewandSubmitDescription')}</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(8);
                    }}
                  ></div>
                  <h3>{t('ProjectSearch')}</h3>
                  <p>{t('ProjectSearchDesc')}</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(9);
                    }}
                  ></div>
                  <h3>{t('UpcFlow')}</h3>
                  <p>{t('UpcFlowDesc')}</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(10);
                    }}
                  ></div>
                  <h3>{t('Inbox')}</h3>
                  <p>{t('InboxDesc')}</p>
                </div>
              </div>
              <div className="col-3">
                <div className="video-grid">
                  <div
                    className="vd-thmb-box"
                    onClick={() => {
                      this.showVideoTutorialModal(11);
                    }}
                  ></div>
                  <h3>{t('Notifications')}</h3>
                  <p>{t('NotificationsDesc')}</p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(withTranslation('help')(HelpGuide));
