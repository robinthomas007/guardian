import React, { Component } from 'react';
import LoadingImg from 'component_library/LoadingImg';
import PageHeader from '../PageHeader/PageHeader';
import AudioFilesTabsContainer from '../ReviewAndSubmit/pageComponents/AudioFileTabsContainer';
import TerritorialRightsTable from '../ReviewAndSubmit/pageComponents/TerritorialRightsTable';
import BlockingPoliciesDataTable from '../ReviewAndSubmit/pageComponents/BlockingPoliciesDataTable';
import { withRouter } from 'react-router-dom';
import SubmitProjectModal from '../../modals/SubmitProjectModal';
import UpdateRepertoireModal from '../../modals/UpdateRepertoireModal';
import ShareModal from '../../modals/shareModal';
import IncompleteProjectModal from '../../modals/IncompleteProjectModal';
import {
  formatDateToYYYYMMDD,
  convertToLocaleTime,
  isPreReleaseDate,
  NO_LABEL_ID,
  compareJson,
  formatDiscData,
} from '../../Utils';
import {
  showNotySucess,
  showNotyMaskWarning,
  getProjectReview,
  formatProjectTitleToMasked,
} from 'components/Utils';
import * as releaseAction from './../ReleaseInformation/releaseAction';

import * as reviewActions from '../../../actions/reviewActions';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

class ReviewAndSubmitPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showloader: false,
      showRequestModal: false,
      showIncompleteProjectModal: false,
      shareModal: false,
      updateModal: false,
      updateModalData: [],
      copyText: '',
      imageUrl: '',
      imageIsrc: '',
    };
    this.handleSubmitProjectClick = this.handleSubmitProjectClick.bind(this);
    this.handleProjectCategoryClick = this.handleProjectCategoryClick.bind(this);
    this.showProjectSubmitModal = this.showProjectSubmitModal.bind(this);
    this.hideProjectSubmitModal = this.hideProjectSubmitModal.bind(this);
    this.hideUpdateModal = this.hideUpdateModal.bind(this);
    this.showIncompleteProjectModal = this.showIncompleteProjectModal.bind(this);
    this.hideIncompleteProjectModal = this.hideIncompleteProjectModal.bind(this);
    this.getStepNumber = this.getStepNumber.bind(this);
    this.showShareModal = this.showShareModal.bind(this);
    this.hideShareModal = this.hideShareModal.bind(this);
  }

  getCoverArtImage(projectID) {
    this.props
      .getCisCoverArt(projectID)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ imageUrl: responseJSON.imageUrl, imageIsrc: responseJSON.isrc });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.setState({
      project: this.props.data,
      showloader: false,
    });
    if (this.props.match && this.props.match.params && this.props.match.params.projectID) {
      localStorage.setItem('prevStep', 7);
      this.handlePageDataLoad();
      this.getCoverArtImage(this.props.match.params.projectID);
    }
    if (this.props.prevLocation === 'findProject') {
      this.getUpdateModalData();
    }
  }

  handlePageDataLoad() {
    this.setState({ showloader: true });
    const fetchBody = JSON.stringify({
      PagePath: this.props.match.url ? this.props.match.url : '',
      ProjectID: this.props.match.params.projectID,
      languagecode: localStorage.getItem('languageCode') || 'en',
    });

    getProjectReview(fetchBody)
      .then(responseJSON => {
        this.props.setHeaderProjectData(responseJSON);
        if (this.props.prevLocation !== 'findProject') {
          this.setState({ showloader: false });
        }
        this.props.setStatus(responseJSON.Project.projectStatus);
        localStorage.setItem('mediaType', responseJSON.Project.mediaType);
        this.props.changeMediaType(responseJSON.Project.mediaType);
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  }

  getUpdateModalData() {
    this.setState({ showloader: true });
    const fetchBody = JSON.stringify({
      ProjectId: this.props.match.params.projectID,
      languagecode: localStorage.getItem('languageCode') || 'en',
    });
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    fetch(window.env.api.url + '/project/rssubscription ', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        this.setState({ updateModalData: responseJSON });
        if (
          (responseJSON.Tracks && responseJSON.Tracks.length > 0) ||
          (responseJSON.Rights && responseJSON.Rights.length > 0)
        )
          this.setState({ updateModal: true });
        this.setState({ showloader: false });
      });
  }
  handleProjectCategoryClick(category) {
    this.props.history.push(category + this.props.match.params.projectID);
  }

  showProjectSubmitModal() {
    this.setState({ showRequestModal: true });
  }

  showShareModal() {
    this.setState({ shareModal: true });
  }

  hideShareModal() {
    this.setState({ shareModal: false });
  }

  hideProjectSubmitModal() {
    this.setState({ showRequestModal: false });
  }

  hideUpdateModal() {
    this.handlePageDataLoad();
    this.setState({ updateModal: false, showloader: false });
  }

  showIncompleteProjectModal() {
    this.setState({ showIncompleteProjectModal: true });
  }

  hideIncompleteProjectModal() {
    this.setState({ showIncompleteProjectModal: false });
  }

  handlePreSubmitCheck = () => {
    return this.props.data.Project.isProjectComplete
      ? this.showProjectSubmitModal()
      : this.showIncompleteProjectModal();
  };

  handleSubmitProjectClick = () => {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      ProjectID: this.props.match.params.projectID ? this.props.match.params.projectID : '',
    });

    this.setState({
      showloader: true,
      showRequestModal: false,
    });

    fetch(window.env.api.url + '/project/submit', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        this.setState({ showloader: false });
        if (responseJSON.IsIsrcSuperConfidential) {
          showNotyMaskWarning(this.props.t('review:SuperConfidential'));
        }
        if (this.props.data.Project.upc) this.checkEligibilityForAutoPublish();
        setTimeout(() => {
          showNotySucess(this.props.t('review:NotyInfo'), () => {
            return this.props.history.push({ pathname: '/findProject/' });
          });
          localStorage.setItem('prevStep', 7);
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  };

  checkEligibilityForAutoPublish = () => {
    if (!this.props.data.Project.upc) {
      return false;
    }
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      upc: this.props.data.Project.upc,
      mediaType: this.props.data.Project.mediaType,
    });

    fetch(window.env.api.url + '/project/upc', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        const hasProjectModified = compareJson(
          formatDiscData(responseJSON.ExDiscs),
          formatDiscData(this.props.data.Discs),
        );
        if (hasProjectModified) {
          this.handlePublish();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  handlePublish = () => {
    const languageCode = localStorage.getItem('languageCode') || 'en';
    const initialState = {
      itemsPerPage: '10',
      pageNumber: '1',
      searchTerm: '',
      filter: {},
    };

    const allTrackIDs = this.props.data.Discs.flatMap(disc =>
      disc.Tracks.map(track => track.trackID),
    );

    this.props.handlePublish(
      {
        ProjectIds: [this.props.data.Project.projectID],
        PublishTrackIds: allTrackIDs, //this.props.data.Discs,
        IsAutoPublish: true,
        languageCode: languageCode,
      },
      initialState,
    );
  };

  getStepNumber() {
    let stepNumber = 7;
    if (
      this.props.serverTimeDate &&
      this.props.data &&
      this.props.data.Project &&
      this.props.data.Project.projectReleaseDate
    ) {
      stepNumber =
        formatDateToYYYYMMDD(convertToLocaleTime(this.props.serverTimeDate)) >
        formatDateToYYYYMMDD(this.props.data.Project.projectReleaseDate)
          ? 5
          : 7;
    }
    if (this.props.data && this.props.data.Project.mediaType === 2) {
      stepNumber = 6;
    }
    return stepNumber;
  }

  copyAdditionalContacts = contacts => {
    contacts = contacts.replaceAll(',', ';');
    navigator.clipboard.writeText(contacts);
    this.setState({ copyText: 'Copied' });
    setTimeout(() => {
      this.setState({ copyText: '' });
    }, 300);
  };

  getPage = () => {
    const { t, user } = this.props;
    const isReadOnlyUser = user.DefaultReleasingLabelID === NO_LABEL_ID ? true : false;
    const mediaType = _.get(this.props.data.Project, 'mediaType', 1);
    return (
      <div>
        <div className="page-container">
          <LoadingImg show={this.state.showloader} />

          <PageHeader data={this.props.data.Project} />

          <UpdateRepertoireModal
            handleClose={this.hideUpdateModal}
            show={this.state.updateModal}
            t={t}
            data={this.state.updateModalData}
          />

          <SubmitProjectModal
            showModal={this.showProjectSubmitModal}
            handleClose={this.hideProjectSubmitModal}
            show={this.state.showRequestModal}
            handleSubmitProjectClick={this.handleSubmitProjectClick}
            t={t}
          />

          <ShareModal
            showModal={this.showShareModal}
            handleClose={this.hideShareModal}
            show={this.state.shareModal}
            projectId={this.props.data.Project.projectID}
            t={t}
          />

          <IncompleteProjectModal
            handleClose={this.hideIncompleteProjectModal}
            show={this.state.showIncompleteProjectModal}
            t={t}
          />

          <div className="row no-gutters step-description review">
            <div className="col-9">
              <h2>
                {t('review:step')}&nbsp;<span className="count-circle">{this.getStepNumber()}</span>
                &nbsp;
                {t('review:ReviewandSubmit')}
              </h2>
              <p>
                {t('review:DescriptionMain')}
                <br />
                {t('review:DescriptionSub')}
              </p>
            </div>
            <div className="col-3">
              <div className="float-right">
                <button
                  className="btn btn-secondary align-content-end"
                  onClick={this.showShareModal}
                >
                  <i className="material-icons">share</i> {t('review:Share')}
                </button>
                {parseInt(this.props.data.Project.projectStatusID) === 1 && !isReadOnlyUser ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginLeft: '10px' }}
                    onClick={this.handlePreSubmitCheck}
                  >
                    {t('review:SubmitProject')}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="page-container review-section">
          <div className="row no-gutters">
            <div className="col-10 justify-content-start">
              <h2>{t('review:ReleaseInformation')}</h2>
            </div>
            <div className="col-2 justify-content-end">
              {parseInt(this.props.data.Project.projectStatusID) === 1 ? (
                <button
                  className="btn btn-secondary align-content-end float-right"
                  onClick={() => this.handleProjectCategoryClick('/releaseInformation/')}
                >
                  <i className="material-icons">edit</i> {t('review:Edit')}
                </button>
              ) : null}
            </div>
          </div>
          <br />
          <div className="review-card">
            <div className="row no-gutters">
              <div className="col-2">
                <img alt="img" className="album-art" src={this.state.imageUrl} />
                {this.state.imageIsrc && (
                  <div>
                    <span>{t('releaseInfo:ImageID')} : </span>
                    {this.state.imageIsrc}
                  </div>
                )}
              </div>
              <div className="col-10">
                <div className="row no-gutters">
                  <div className="col-6">
                    <label>{t('review:ProjectTitle')}:</label>
                    <span>
                      {' '}
                      {this.props.data.Project
                        ? formatProjectTitleToMasked(
                            this.props.data.Project.isMasked,
                            this.props.data.Project.projectTitle,
                          )
                        : ''}
                    </span>
                  </div>
                  <div className="col-6">
                    <label>{t('review:Artist')}:</label>
                    <span>
                      {' '}
                      {this.props.data.Project ? this.props.data.Project.projectArtistName : ''}
                    </span>
                  </div>
                  <div className="col-6">
                    <label>{t('review:ProjectType')}:</label>
                    <span>
                      {' '}
                      {this.props.data.Project ? this.props.data.Project.projectType : ''}
                    </span>
                  </div>
                  <div className="col-6">
                    <label>{t('review:Label')}:</label>
                    <span>
                      {' '}
                      {this.props.data.Project ? this.props.data.Project.projectReleasingLabel : ''}
                    </span>
                  </div>
                  <div className="col-12">
                    <label>{t('review:ReleaseDate')}:</label>
                    <span>
                      {' '}
                      {this.props.data.Project && this.props.data.Project.projectReleaseDate
                        ? `${moment
                            .utc(this.props.data.Project.projectReleaseDate)
                            .format('MM-DD-YYYY hh:mm A')} UTC (${
                            this.props.data.Project.isTimedRelease
                              ? t('review:GloballyTimed')
                              : t('review:LocalStoreTurn')
                          })`
                        : 'TBD'}
                    </span>
                  </div>
                  <div className="col-12">
                    <label>{t('review:Notes')}:</label>
                    <span>
                      {' '}
                      {this.props.data.Project ? this.props.data.Project.projectNotes : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container review-section">
          <div className="row no-gutters">
            <div className="col-10 justify-content-start">
              <h2>{t('review:ProjectContacts')}</h2>
            </div>
            <div className="col-2 justify-content-end">
              {parseInt(this.props.data.Project.projectStatusID) === 1 ? (
                <button
                  className="btn btn-secondary align-content-end float-right"
                  onClick={() => this.handleProjectCategoryClick('/projectContacts/')}
                >
                  <i className="material-icons">edit</i> {t('review:Edit')}
                </button>
              ) : null}
            </div>
          </div>
          <br />
          <div className="review-card">
            <div className="row no-gutters">
              <div className="col-6">
                <label>{t('review:PrimaryContact')}:</label>
                <span>
                  {' '}
                  {this.props.data.Project ? this.props.data.Project.projectPrimaryContact : ''}
                </span>
              </div>
              <div className="col-6">
                <label>{t('review:ProjectSecurity')}:</label>
                <span>
                  {' '}
                  {this.props.data.Project ? this.props.data.Project.projectSecurity : ''}
                </span>
              </div>
              <div className="col-12">
                <label>{t('review:PrimaryEmail')}:</label>
                <span>
                  {' '}
                  {this.props.data.Project
                    ? this.props.data.Project.projectPrimaryContactEmail
                    : ''}
                </span>
              </div>
              <div className="col-12">
                <label>{t('review:AdditionalContacts')}:</label>
                <span>
                  {' '}
                  {this.props.data.Project ? (
                    <span className="add-cont-cpy-wrap">
                      {this.props.data.Project.projectAdditionalContacts}
                      <i
                        className="material-icons copy"
                        title="copy contacts"
                        onClick={() => {
                          this.copyAdditionalContacts(
                            this.props.data.Project.projectAdditionalContacts,
                          );
                        }}
                      >
                        content_copy
                      </i>
                      <i>{this.state.copyText}</i>
                    </span>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container review-section">
          <div className="row no-gutters">
            <div className="col-10 justify-content-start">
              <h2>
                {' '}
                {mediaType === 2
                  ? t('review:VideoInformation')
                  : t('review:AudioFiles&TrackInformation')}{' '}
              </h2>
            </div>

            <div className="col-2 justify-content-end">
              {parseInt(this.props.data.Project.projectStatusID) === 1 &&
              isPreReleaseDate(this.props.data) ? (
                <button
                  className="btn btn-secondary align-content-end float-right"
                  onClick={() =>
                    mediaType === 2
                      ? this.handleProjectCategoryClick('/trackInformation/')
                      : this.handleProjectCategoryClick('/audioFiles/')
                  }
                >
                  <i className="material-icons">edit</i> {t('review:Edit')}
                </button>
              ) : null}
            </div>

            <div className="col-12">
              <br />
              <div className="review-card">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <AudioFilesTabsContainer mediaType={mediaType} discs={this.props.data.Discs} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container review-section">
          <div className="row no-gutters">
            <div className="col-10 justify-content-start">
              <h2>{t('review:TerritorialRights')}</h2>
            </div>
            <div className="col-2 justify-content-end">
              {parseInt(this.props.data.Project.projectStatusID) === 1 &&
              isPreReleaseDate(this.props.data) ? (
                <button
                  className="btn btn-secondary align-content-end float-right"
                  onClick={() => this.handleProjectCategoryClick('/territorialRights/')}
                >
                  <i className="material-icons">edit</i> {t('review:Edit')}
                </button>
              ) : null}
            </div>
            <div className="col-12">
              <br />
              <div className="review-card territorial">
                <TerritorialRightsTable data={this.props.data} />
              </div>
            </div>
          </div>
        </div>

        <div className="page-container review-section">
          <div className="row no-gutters">
            <div className="col-10 justify-content-start">
              <h2>{t('review:BlockingPolices')}</h2>
            </div>
            <div className="col-2 justify-content-end">
              {parseInt(this.props.data.Project.projectStatusID) === 1 ? (
                <button
                  className="btn btn-secondary align-content-end float-right"
                  onClick={() => this.handleProjectCategoryClick('/blockingPolicies/')}
                >
                  <i className="material-icons">edit</i> {t('review:Edit')}
                </button>
              ) : null}
            </div>
            <div className="col-12">
              <br />
              <div className="review-card">
                <BlockingPoliciesDataTable mediaType={mediaType} data={this.props.data} />
              </div>
            </div>
          </div>
        </div>

        {!isReadOnlyUser && (
          <div className="row d-flex no-gutters">
            <div className="col-12 align-content-end submit-project">
              {parseInt(this.props.data.Project.projectStatusID) === 1 ? (
                <button
                  type="button"
                  className="btn btn-primary float-right"
                  onClick={this.handlePreSubmitCheck}
                >
                  {t('review:SubmitProject')}
                </button>
              ) : null}
              {/*parseInt(this.props.data.Project.projectStatusID) !== 1 && this.props.user.IsAdmin ? (
              <button
                type="button"
                className="btn btn-primary float-right"
                style={{ marginLeft: '10px' }}
                onClick={this.handlePublish}
              >
                {t('review:publish')}
              </button>
            ) : null*/}
            </div>
          </div>
        )}
      </div>
    );
  };

  render() {
    return <div className="col-10">{this.props.data ? this.getPage() : null}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  getCisCoverArt: id => dispatch(releaseAction.getCisCoverArt(id)),
  handlePublish: (val, searchData) => dispatch(reviewActions.handlePublish(val, searchData)),
});

const mapStateToProps = state => ({});

export default withRouter(
  compose(
    withTranslation('review'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(ReviewAndSubmitPage),
);
