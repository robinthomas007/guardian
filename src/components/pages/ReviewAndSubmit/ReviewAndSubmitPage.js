import React, { Component } from 'react';
import LoadingImg from 'component_library/LoadingImg';
import PageHeader from '../PageHeader/PageHeader';
import AudioFilesTabsContainer from '../ReviewAndSubmit/pageComponents/AudioFileTabsContainer';
import TerritorialRightsTable from '../ReviewAndSubmit/pageComponents/TerritorialRightsTable';
import BlockingPoliciesDataTable from '../ReviewAndSubmit/pageComponents/BlockingPoliciesDataTable';
import { withRouter } from 'react-router-dom';
import SubmitProjectModal from '../../modals/SubmitProjectModal';
import ShareModal from '../../modals/shareModal';
import IncompleteProjectModal from '../../modals/IncompleteProjectModal';
import { formatDateToYYYYMMDD, convertToLocaleTime, isPreReleaseDate } from '../../Utils';
import { showNotyInfo } from 'components/Utils';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

class ReviewAndSubmitPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showloader: false,
      showRequestModal: false,
      showIncompleteProjectModal: false,
      shareModal: false,
    };
    this.handleSubmitProjectClick = this.handleSubmitProjectClick.bind(this);
    this.handleProjectCategoryClick = this.handleProjectCategoryClick.bind(this);
    this.showProjectSubmitModal = this.showProjectSubmitModal.bind(this);
    this.hideProjectSubmitModal = this.hideProjectSubmitModal.bind(this);
    this.showIncompleteProjectModal = this.showIncompleteProjectModal.bind(this);
    this.hideIncompleteProjectModal = this.hideIncompleteProjectModal.bind(this);
    this.getStepNumber = this.getStepNumber.bind(this);
    this.showShareModal = this.showShareModal.bind(this);
    this.hideShareModal = this.hideShareModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      project: this.props.data,
      showloader: false,
    });
    if (this.props.match && this.props.match.params && this.props.match.params.projectID) {
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
      localStorage.setItem('prevStep', 7);
    }
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
        showNotyInfo(this.props.t('review:NotyInfo'), () => {
          return this.props.history.push({ pathname: '/findProject/' });
        });
        localStorage.setItem('prevStep', 7);
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
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
    return stepNumber;
  }

  getPage = () => {
    const { t } = this.props;
    return (
      <div>
        <div className="page-container">
          <LoadingImg show={this.state.showloader} />

          <PageHeader data={this.props.data.Project} />

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
                {parseInt(this.props.data.Project.projectStatusID) === 1 ? (
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
                <img
                  className="album-art"
                  src={
                    this.props.data && this.props.data.Project
                      ? this.props.data.Project.projectCoverArtBase64Data
                      : ''
                  }
                />
              </div>
              <div className="col-10">
                <div className="row no-gutters">
                  <div className="col-6">
                    <label>{t('review:ProjectTitle')}:</label>
                    <span>
                      {' '}
                      {this.props.data.Project ? this.props.data.Project.projectTitle : ''}
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
                            .format('MM-DD-YYYY hh:mm A')} UTC`
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
                  {this.props.data.Project ? this.props.data.Project.projectAdditionalContacts : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container review-section">
          <div className="row no-gutters">
            <div className="col-10 justify-content-start">
              <h2>{t('review:AudioFiles&TrackInformation')}</h2>
            </div>

            <div className="col-2 justify-content-end">
              {parseInt(this.props.data.Project.projectStatusID) === 1 &&
              isPreReleaseDate(this.props.data) ? (
                <button
                  className="btn btn-secondary align-content-end float-right"
                  onClick={() => this.handleProjectCategoryClick('/audioFiles/')}
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
                    <AudioFilesTabsContainer discs={this.props.data.Discs} />
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
                <BlockingPoliciesDataTable data={this.props.data} />
              </div>
            </div>
          </div>
        </div>

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
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div className="col-10">{this.props.data ? this.getPage() : null}</div>;
  }
}

const ReviewAndSubmitPageWithTranslation = withTranslation()(ReviewAndSubmitPage);

export default withRouter(ReviewAndSubmitPageWithTranslation);
