import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import ToolTip from 'component_library/Tooltip';
import './ReleaseInformation.css';
import { withRouter } from 'react-router-dom';
import LoadingImg from 'component_library/LoadingImg';
import { resetDatePicker, isFormValid, CustomInput } from '../../Utils.js';
import moment from 'moment';
import ReleasingLabelsInput from '../ReleaseInformation/pageComponents/ReleasingLabelsInput';
import ProjectTypesInput from '../ReleaseInformation/pageComponents/ProjectTypesInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showNotyError } from 'components/Utils';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as releaseAction from './releaseAction';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import VideoPlayer from 'components/template/VideoPlayer';

class ReleaseinformationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formInputs: {
        projectID: '',
        projectTitle: '',
        projectCoverArt: '',
        projectArtistName: '',
        projectTypeID: '1',
        projectReleasingLabelID: '',
        projectReleaseDate: null,
        projectReleaseDateTBD: false,
        projectNotes: '',
        projectCoverArtFileName: '',
        projectCoverArtBase64Data: '',
        upc: '',
      },
      project: {
        Project: {
          projectID: '',
          projectTitle: '',
          projectTypeID: '',
          projectType: '',
          projectArtistName: '',
          projectReleasingLabelID: '',
          projectReleasingLabel: '',
          projectReleaseDate: null,
          projectReleaseDateTBD: false,
          projectPrimaryContact: '',
          projectPrimaryContactEmail: '',
          projectAdditionalContacts: '',
          projectNotes: '',
          projectSecurityID: '',
          projectSecurity: '',
          projectStatusID: '',
          projectStatus: '',
          projectCoverArtFileName: '',
          projectCoverArtBase64Data: '',
        },
      },
      releaseDateRequired: true,
      showloader: false,
      projectReleaseDateDisabled: false,
      projectReleaseDateReset: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReleaseTBDChange = this.handleReleaseTBDChange.bind(this);
    this.setParentState = this.setParentState.bind(this);
    this.albumArt = this.albumArt.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.clearCoverArt = this.clearCoverArt.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleReleaseTBDChange = e => {
    let { formInputs } = this.state;
    formInputs.projectReleaseDate = null;
    this.setState({ formInputs: formInputs });

    if (e.target.checked) {
      this.setState({
        projectReleaseDateDisabled: true,
        releaseDateRequired: false,
      });
      resetDatePicker('projectReleaseDate');
    } else {
      this.setState({
        projectReleaseDateDisabled: false,
        releaseDateRequired: true,
      });
    }
    this.handleChange(e);
  };

  findUpc = () => {
    const { upc } = this.state.formInputs;
    if (upc) {
      this.props.findUpc(upc);
      localStorage.setItem('upc', upc);
    }
  };

  handleChange(e) {
    let inputValue = '';
    if (e.target.type === 'checkbox') {
      inputValue = e.target.checked ? true : false;
    } else {
      inputValue = e.target.value;
    }

    //this gets the inputs into the state.formInputs obj on change
    this.setState({ formInputs: { ...this.state.formInputs, [e.target.id]: inputValue } });
  }

  handleDateChange(date) {
    let formattedDate = null;
    if (date !== null) {
      formattedDate = moment(date).format('MM/DD/YYYY HH:mm');
    }
    this.setState({ formInputs: { ...this.state.formInputs, projectReleaseDate: formattedDate } });
  }

  handleCoverChange(file) {
    const { formInputs } = this.state;
    const updatedFormInputs = formInputs;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      updatedFormInputs['projectCoverArtBase64Data'] = reader.result;
      updatedFormInputs['projectCoverArtFileName'] = file.name;
    };
    reader.onerror = function() {
      updatedFormInputs['projectCoverArtBase64Data'] = '';
      updatedFormInputs['projectCoverArtFileName'] = '';
    };

    this.setState({ formInputs: updatedFormInputs });
  }

  setCoverArt() {
    const coverImg = document.getElementById('projectCoverArtIMG');

    if (coverImg) {
      coverImg.src = this.state.formInputs.projectCoverArtBase64Data;
    } else {
      const img = document.createElement('img');
      img.src = this.state.formInputs.projectCoverArtBase64Data;
      img.height = 188;
      img.width = 188;
      img.classList.add('obj');
      img.id = 'projectCoverArtIMG';
      //img.file = file;

      const preview = document.getElementById('preview');
      preview.appendChild(img);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (isFormValid()) {
      this.setState({ showloader: true });
      if (this.state.formInputs.projectID !== '') {
        this.props
          .submitProjectDetails({
            Project: this.state.formInputs,
            languagecode: localStorage.getItem('languageCode') || 'en',
          })
          .then(response => response.json())
          .then(responseJSON => {
            this.setState({ showloader: false });
            if (responseJSON.errorMessage) {
            } else {
              localStorage.setItem('prevStep', 1);
              this.props.setHeaderProjectData(responseJSON);
              localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
              this.props.history.push('/projectContacts/' + responseJSON.Project.projectID);
              if (!responseJSON.Project.upc || responseJSON.Project.upc === '') {
                this.props.initializeUpcData();
              }
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ showloader: false });
          });
      } else {
        this.props
          .validateProjectDetails({
            Project: this.state.formInputs,
          })
          .then(response => response.json())
          .then(responseJSON => {
            if (responseJSON.IsValid) {
              localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
              localStorage.setItem('prevStep', 1);
              this.props.history.push('/projectContacts');
            } else {
              this.setState({ showloader: false });
              showNotyError(
                'The project title ' +
                  responseJSON.projectTitle +
                  ' by ' +
                  responseJSON.projectArtist +
                  ' already exists. Please enter a new title. Click to close.',
              );
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ showloader: false });
          });
      }
    }
  }

  albumArt(e) {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) {
        continue;
      }
      const img = document.createElement('img');
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 190;
      img.width = 190;
      img.classList.add('obj');
      img.file = file;
      img.id = 'projectCoverArtIMG';

      const preview = document.getElementById('preview');
      preview.appendChild(img);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result;
        };
      })(img);

      this.handleCoverChange(file);
    }
  }

  clearCoverArt(e) {
    const { formInputs } = this.state;
    let modifiedFormInputs = formInputs;
    modifiedFormInputs['projectCoverArtFileName'] = '';
    modifiedFormInputs['projectCoverArtBase64Data'] = '';

    this.setState({ formInputs: modifiedFormInputs });

    const projectCoverArtImg = document.getElementById('projectCoverArtIMG');
    if (projectCoverArtImg) {
      projectCoverArtImg.remove();
    }
  }

  setParentState(e) {
    this.handleChange(e);
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('projectData'));

    if (this.state.formInputs.projectCoverArtBase64Data !== '') {
      this.setCoverArt();
    }

    if (this.props.match.params && this.props.match.params.projectID) {
      this.handleDataLoad();
    }

    if (localData && this.state.formInputs !== localData) {
      this.setState({ formInputs: localData });
    }
    this.props.setProjectID(
      this.props.match.params.projectID ? this.props.match.params.projectID : '',
      this.props.match.url,
    );
  }

  getBlankFormInputs = () => {
    return {
      projectID: '',
      projectTitle: '',
      projectCoverArt: '',
      projectArtistName: '',
      projectTypeID: '1',
      projectReleasingLabelID: this.props.user.ReleasingLabels[0].id,
      projectReleaseDate: null,
      projectReleaseDateTBD: false,
      projectNotes: '',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      upc: '',
    };
  };

  componentDidUpdate() {
    if (this.props.clearProject) {
      const blankInputs = this.getBlankFormInputs();
      this.setState({
        releaseDateRequired: true,
        showloader: false,
        projectReleaseDateDisabled: false,
        projectReleaseDateReset: false,
      });
      if (this.state.formInputs !== blankInputs) {
        this.setState({ formInputs: blankInputs }, () => this.setCoverArt());
      }
    } else {
      if (this.props.user.ReleasingLabels && this.state.formInputs.projectReleasingLabelID === '') {
        this.setState({
          formInputs: {
            ...this.state.formInputs,
            projectReleasingLabelID: this.props.user.ReleasingLabels[0].id,
          },
        });
      }

      if (this.state.formInputs.projectCoverArtBase64Data !== '') {
        this.setCoverArt();
      }

      if (this.props.match.params.projectID) {
        this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.upcData !== nextProps.upcData) {
      if (nextProps.upcData.Title) {
        const { formInputs } = this.state;
        formInputs['projectTitle'] = nextProps.upcData.Title;
        formInputs['projectArtistName'] = nextProps.upcData.Artist;
        this.setState({ formInputs });
      }
    }
  }

  handleDataLoad() {
    this.setState({ showloader: true });
    this.props
      .getProjectDetails({
        PagePath: this.props.match.url ? this.props.match.url : '',
        ProjectID: this.props.match.params.projectID,
        languagecode: localStorage.getItem('languageCode') || 'en',
      })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.Project.projectReleaseDateTBD === true) {
          this.setState({ projectReleaseDateDisabled: true, releaseDateRequired: false });
        }
        this.setState({
          project: responseJSON,
          formInputs: responseJSON.Project,
          showloader: false,
        });
        this.props.setHeaderProjectData(this.state.project);
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="col-10">
        <LoadingImg show={this.state.showloader || this.props.loading} />

        <div className="row d-flex no-gutters step-description">
          <div className="col-12">
            <h2>
              {t('releaseInfo:step')} <span className="count-circle notranslate">1</span>{' '}
              {t('releaseInfo:ReleaseInformation')}
            </h2>
            <p>
              {t('releaseInfo:DescriptionMain')} <span className="required-ind">*</span>.{' '}
              {t('releaseInfo:DescriptionSub')}
            </p>
          </div>
        </div>

        <Form>
          <div className="row d-flex">
            <div className="col-9">
              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:UPC')} <i> ({t('releaseInfo:Optional')})</i>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('releaseInfo:UPC')} />
                </div>
                <div className="col-3">
                  <Form.Control
                    tabIndex="1+"
                    id="upc"
                    className="form-control"
                    type="text"
                    placeholder={t('releaseInfo:UPC')}
                    value={this.state.formInputs.upc}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-3">
                  <button
                    style={{ marginLeft: '10px', padding: '7px 10px' }}
                    className="btn btn-sm btn-primary"
                    onClick={this.findUpc}
                    title="Comment"
                    type="button"
                  >
                    <i className={'material-icons notranslate'}>search</i>
                    {t('releaseInfo:FindUPC')}
                  </button>
                  <VideoPlayer
                    title="UPC Flow"
                    link="https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+11+Alternate+Workflow+-+UPC.mp4"
                  />
                </div>
              </Form.Group>
              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Control
                    type="hidden"
                    id="projectID"
                    value={this.state.formInputs.projectID}
                  />

                  <Form.Label className="col-form-label">
                    {t('releaseInfo:ProjectTitle')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip
                    tabIndex="-1"
                    message="Enter a title for your project here. It may consist of any letter, number or symbol from 0-255 characters in length."
                  />
                </div>
                <div className="col-9">
                  <Form.Control
                    tabIndex="1+"
                    id="projectTitle"
                    className="form-control requiredInput"
                    type="text"
                    placeholder={t('releaseInfo:EnterAProjectTitle')}
                    value={this.state.formInputs.projectTitle}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-tooltip">Project Title is Required</div>
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:Artist')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip
                    tabIndex="-1"
                    message="Enter the artist for your project here. It may consist of any letter, number or symbol from 0-255 characters in length."
                  />
                </div>
                <div className="col-9">
                  <Form.Control
                    tabIndex="2+"
                    id="projectArtistName"
                    className="form-control requiredInput"
                    type="text"
                    placeholder={t('releaseInfo:EnterAnArtistName')}
                    value={this.state.formInputs.projectArtistName}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-tooltip">Artist Name is Required</div>
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:ProjectType')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip
                    tabIndex="-1"
                    message="Select a project type for your project. This can help you differentiate and identify projects with similar titles."
                  />
                </div>
                <div className="col-9">
                  <ProjectTypesInput
                    tabIndex="3+"
                    id="projectType"
                    user={this.props.user}
                    value={this.state.formInputs.projectTypeID}
                    onChange={this.handleChange}
                  />
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:ReleasingLabel')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip
                    tabIndex="-1"
                    message="Please select the releasing label for your project. If you only have access to a single label, your label will be pre-loaded and not require a selection."
                  />
                </div>
                <div className="col-9">
                  <ReleasingLabelsInput
                    tabIndex="4+"
                    id="projectReleasingLabelID"
                    user={this.props.user}
                    value={this.state.formInputs.projectReleasingLabelID}
                    onChange={this.setParentState}
                  />
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:ReleaseDate')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip
                    tabIndex="-1"
                    message="Projects with a release date prior to today&#39;s date will be considered post-release. If the project&#39;s release date is to be determined, select TBD."
                  />
                </div>
                <div className="col-6 release-date">
                  <DatePicker
                    showTimeSelect
                    id="projectReleaseDate"
                    selected={
                      this.state.formInputs.projectReleaseDate !== null &&
                      this.state.formInputs.projectReleaseDate !== ''
                        ? new Date(this.state.formInputs.projectReleaseDate)
                        : null
                    }
                    disabled={this.state.projectReleaseDateDisabled}
                    dateFormat="Pp"
                    placeholderText="Select release date"
                    onChange={this.handleDateChange}
                    customInput={
                      <CustomInput
                        isreadOnly={this.state.projectReleaseDateDisabled}
                        adClass={
                          this.state.releaseDateRequired
                            ? 'form-control requiredInput'
                            : 'form-control'
                        }
                      />
                    }
                    isClearable={true}
                  />
                  <span>
                    <i>&nbsp;&nbsp; (UTC)</i>
                  </span>
                </div>
                <div className="col-auto">
                  <Form.Label className="col-form-label tbd text-nowrap">
                    {t('releaseInfo:ReleaseTBD')}
                  </Form.Label>
                  <label className="custom-checkbox">
                    <input
                      tabIndex="6+"
                      id="projectReleaseDateTBD"
                      className="form-control"
                      type="checkbox"
                      value={this.state.formInputs.projectReleaseDateTBD}
                      onChange={this.handleReleaseTBDChange}
                      checked={this.state.formInputs.projectReleaseDateTBD}
                    />
                    <span className="checkmark "></span>
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="notes">{t('releaseInfo:Notes')}</Form.Label>
                  <ToolTip tabIndex="-1" message="Anything notable about this release?" />
                </div>
                <div className="col-9">
                  <Form.Control
                    tabIndex="7+"
                    id="projectNotes"
                    as="textarea"
                    rows="3"
                    value={this.state.formInputs.projectNotes}
                    onChange={this.handleChange}
                  />
                </div>
              </Form.Group>
            </div>

            <div className="col-3 row d-flex no-gutters">
              <div className="col-9 d-flex flex-fill justify-content-end">
                <Form.Label className="cover-art-label">{t('releaseInfo:CoverArt')}</Form.Label>
                <div id="preview" dropppable="true" className="form-control album-art-drop">
                  <Button
                    id="removeAlbumArt"
                    className="btn btn-secondary action remove-art"
                    onClick={this.clearCoverArt}
                  >
                    <i className="material-icons notranslate">delete</i>
                  </Button>
                  <span>
                    {t('releaseInfo:ClickToBrowse')}
                    <br />
                    {t('releaseInfo:orDrag')} &amp; {t('releaseInfo:Drop')}
                  </span>
                  <input id="projectCoverArt" type="file" onChange={this.albumArt} />
                  <div className="browse-btn">
                    <span>{t('releaseInfo:BrowseFiles')}</span>
                    <input
                      id="projectCoverArtData"
                      type="file"
                      title="Browse Files"
                      onChange={this.albumArt}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="row d-flex no-gutters save-buttons">
            <div className="col-12">
              <button
                tabIndex="8+"
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
                id="releaseInfoSaveAndContinue"
              >
                {t('releaseInfo:Save')} &amp; {t('releaseInfo:Continue')}
              </button>
            </div>
          </section>
        </Form>
      </div>
    );
  }
}

ReleaseinformationPage = reduxForm({
  form: 'ReleaseinformationPageForm',
  enableReinitialize: true,
})(ReleaseinformationPage);

const mapDispatchToProps = dispatch => ({
  findUpc: val => dispatch(releaseAction.findUpc(val)),
  getProjectDetails: data => dispatch(releaseAction.getProjectDetails(data)),
  submitProjectDetails: data => dispatch(releaseAction.submitProjectDetails(data)),
  validateProjectDetails: data => dispatch(releaseAction.validateProjectDetails(data)),
  initializeUpcData: () => dispatch(releaseAction.initializeUpcData()),
});

const mapStateToProps = state => ({
  upcData: state.releaseReducer.upcData,
  loading: state.releaseReducer.loading,
});

export default withRouter(
  compose(
    withTranslation('releaseInfo'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(ReleaseinformationPage),
);
