import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import ToolTip from 'component_library/Tooltip';
import './ReleaseInformation.css';
import { withRouter } from 'react-router-dom';
import LoadingImg from 'component_library/LoadingImg';
import { resetDatePicker, isFormValid, CustomInput, NO_LABEL_ID } from '../../Utils.js';
import moment from 'moment';
import MultiSelectHierarchy from '../../common/multiSelectHierarchy';
import ProjectTypesInput from '../ReleaseInformation/pageComponents/ProjectTypesInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showNotyError } from 'components/Utils';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as releaseAction from './releaseAction';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import VideoPlayer from 'components/template/VideoPlayer';
import axios from 'axios';

class ReleaseinformationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formInputs: {
        mediaType: 1,
        projectID: '',
        projectTitle: '',
        projectCoverArt: '',
        projectArtistName: '',
        projectTypeID: '1',
        projectReleasingLabelID: '',
        projectReleaseDate: null,
        projectReleaseDateTBD: false,
        isTimedRelease: false,
        projectNotes: '',
        projectCoverArtFileName: '',
        upc: '',
        imageId: '',
        imageIsrc: '',
      },
      project: {
        Project: {
          mediaType: 1,
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
          imageId: '',
          imageIsrc: '',
        },
      },
      releaseDateRequired: true,
      showloader: false,
      projectReleaseDateDisabled: false,
      projectReleaseDateReset: false,
      selectedOptions: [],
      isChecked: false,
      isOpen: false,
      selectedList: [],
      hasReleasingLabelError: false,
      imageUrl: '',
      isFindUpcClicked: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setParentState = this.setParentState.bind(this);
    this.albumArt = this.albumArt.bind(this);
    this.clearCoverArt = this.clearCoverArt.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleIsOpen = this.handleIsOpen.bind(this);
  }

  findUpc = () => {
    const { upc, mediaType } = this.state.formInputs;
    if (upc) {
      this.props.findUpc({ upc: upc, mediaType: mediaType });
      localStorage.setItem('upc', upc);
      if (this.state.isFindUpcClicked) {
        this.cisUploadCoverImage('', upc);
        this.setState({ isFindUpcClicked: false });
      }
    }
  };

  handleChange(e) {
    let inputValue = '';
    let obj = {};
    if (e.target.type === 'checkbox') {
      inputValue = e.target.checked ? true : false;
    } else if (e.target.type === 'radio') {
      if (e.target.name === 'mediaType') {
        inputValue = Number(e.target.value);
        // only for video / audio toggle
        localStorage.setItem('mediaType', inputValue);
        this.props.changeMediaType(inputValue);
        inputValue === 2 ? (obj['projectTypeID'] = '5') : (obj['projectTypeID'] = '1');
      } else {
        let { formInputs } = this.state;
        inputValue = e.target.value === 'true' ? true : false;
        // if isTimedRelease is selected then make projectReleaseDateTBD false
        if (e.target.name === 'isTimedRelease') {
          obj['projectReleaseDateTBD'] = false;
          this.setState({
            projectReleaseDateDisabled: false,
            releaseDateRequired: true,
          });
        }
        // if projectReleaseDateTBD  is selected then make isTimedRelease false
        if (e.target.name === 'projectReleaseDateTBD') {
          inputValue = !formInputs.projectReleaseDateTBD;
          obj['isTimedRelease'] = null;
          obj['projectReleaseDate'] = null;
          if (inputValue) {
            this.setState({
              projectReleaseDateDisabled: true,
              releaseDateRequired: false,
            });
            resetDatePicker('projectReleaseDate');
          }
        }
      }
    } else {
      inputValue = e.target.value;
    }
    obj[e.target.id] = inputValue;

    //this gets the inputs into the state.formInputs obj on change
    this.setState({ formInputs: { ...this.state.formInputs, ...obj } });
  }

  handleDateChange(date) {
    let formattedDate = null;
    if (date !== null) {
      formattedDate = moment(date).format('MM/DD/YYYY HH:mm');
    }
    this.setState({ formInputs: { ...this.state.formInputs, projectReleaseDate: formattedDate } });
  }

  cisUploadCoverImage(file, upc) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('User[email]', this.props.user.email);
    const upcVal = upc ? upc : '';
    formData.append('Upc', upcVal);
    formData.append('imageID', this.state.formInputs.imageId);

    axios
      .post(window.env.api.url + '/media/api/cisimageupload', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        this.setState({
          formInputs: {
            ...this.state.formInputs,
            projectCoverArtFileName: response.data.fileName,
            imageId: response.data.imageId,
            imageIsrc: response.data.isrc,
          },
          imageUrl: response.data.imageUrl,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeCheckbox = data => {
    if (data.length > 0)
      this.setState({
        formInputs: { ...this.state.formInputs, projectReleasingLabelID: data[0].value },
        selectedList: data,
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.formInputs && this.state.formInputs.projectReleasingLabelID) {
      this.setState({ hasReleasingLabelError: false });
    } else {
      this.setState({ hasReleasingLabelError: true });
      isFormValid();
      return false;
    }
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
                1,
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
    // if (e.target.files[0].size > 3145727) {
    //   showNotyError('Album image is too big(max 3mb)');
    //   return false;
    // }
    this.cisUploadCoverImage(files[0]);
  }

  clearCoverArt() {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        projectCoverArtFileName: '',
      },
      imageUrl: '',
    });
  }

  setParentState(e) {
    this.handleChange(e);
  }

  handleIsOpen() {
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  }

  getDefaultSelectedList(list) {
    const result = [];
    list.forEach((company, i) => {
      if (company.CompanyId)
        result.push({ value: String(company.CompanyId), label: company.CompanyName });
      if (company.DivisionList.length > 0) {
        let divisionList = company.DivisionList;
        divisionList.forEach((division, i) => {
          if (division.DivisionId)
            result.push({ value: String(division.DivisionId), label: division.DivisionName });
          if (division.LabelList.length > 0) {
            let LabelList = division.LabelList;
            LabelList.forEach((label, i) => {
              result.push({ value: String(label.LabelId), label: label.LabelName });
            });
          }
        });
      }
    });
    return result;
  }

  exitsLabels = this.getDefaultSelectedList(this.props.user.ReleasingLabels);

  componentDidMount() {
    if (this.props.user && this.props.user.IsLabelReadOnly) {
      this.props.history.push('/findProject');
    }
    const localData = JSON.parse(localStorage.getItem('projectData'));
    if (localData && localData.projectReleaseDateTBD) {
      this.setState({ releaseDateRequired: false, projectReleaseDateDisabled: true });
    }

    if (this.props.match.params && this.props.match.params.projectID) {
      this.handleDataLoad();
      this.getCoverArtImage(this.props.match.params.projectID);
    } else {
      localStorage.setItem('mediaType', 1);
      this.props.changeMediaType(1);
    }
    if (this.props.user && this.exitsLabels.length === 1) {
      this.setState({
        formInputs: {
          ...this.state.formInputs,
          projectReleasingLabelID: this.exitsLabels[0],
        },
        selectedList: [this.exitsLabels[0]],
      });
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
      projectReleasingLabelID: this.exitsLabels.length > 0 ? this.exitsLabels[0].value : '',
      projectReleaseDate: null,
      projectReleaseDateTBD: false,
      projectNotes: '',
      projectCoverArtFileName: '',
      projectCoverArtBase64Data: '',
      upc: '',
      mediaType: 1,
    };
  };

  componentDidUpdate() {
    if (this.props.clearProject) {
      const blankInputs = this.getBlankFormInputs();
      localStorage.setItem('mediaType', 1);
      this.props.changeMediaType(1);
      this.setState({
        releaseDateRequired: true,
        showloader: false,
        projectReleaseDateDisabled: false,
        projectReleaseDateReset: false,
        imageUrl: '',
      });
      if (this.state.formInputs !== blankInputs) {
        this.setState({ formInputs: blankInputs });
      }
    } else {
      if (
        this.props.user.ReleasingLabels.length > 0 &&
        this.state.formInputs.projectReleasingLabelID === ''
      ) {
        this.setState({
          formInputs: {
            ...this.state.formInputs,
            projectReleasingLabelID: this.exitsLabels.length > 0 ? this.exitsLabels[0].value : '',
          },
        });
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

  getCoverArtImage(projectID) {
    this.props
      .getCisCoverArt(projectID)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          imageUrl: responseJSON.imageUrl,
          formInputs: {
            ...this.state.formInputs,
            projectCoverArtFileName: responseJSON.fileName,
            imageId: responseJSON.imageId,
            imageIsrc: responseJSON.isrc,
          },
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
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
          selectedList: [
            {
              label: responseJSON.Project.projectReleasingLabel,
              value: responseJSON.Project.projectReleasingLabelID,
            },
          ],
          showloader: false,
        });
        this.props.setHeaderProjectData(this.state.project);
        this.props.changeMediaType(responseJSON.Project.mediaType);
        localStorage.setItem('mediaType', responseJSON.Project.mediaType);
        if (responseJSON.Project.upc) {
          this.findUpc();
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  }
  newHandleLabelSelectChange(options) {
    const { targetUser } = this.state;
    const ids = options.map(opt => opt.value);

    this.setState({ targetUser: { ...targetUser, secondaryLabelIds: ids } });
  }

  render() {
    const { t, user } = this.props;
    const isReadOnlyUser = user.DefaultReleasingLabelID === NO_LABEL_ID ? true : false;
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
            <div className="col-8">
              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">{t('releaseInfo:MediaType')}</Form.Label>
                  <ToolTip tabIndex="-1" message={t('releaseInfo:MediaType')} />
                </div>
                <div className="col-3 custom-radio-wrapper">
                  <div className="custom-radio">
                    <Form.Control
                      tabIndex="1+"
                      id="mediaType"
                      name="mediaType"
                      className="form-control"
                      type="radio"
                      value={1}
                      checked={this.state.formInputs.mediaType === 1}
                      onChange={this.handleChange}
                    />
                    <label for="audio">
                      <i className={'material-icons'}>audiotrack</i> <span>Audio</span>
                    </label>
                  </div>
                  <div className="custom-radio">
                    <Form.Control
                      tabIndex="1+"
                      id="mediaType"
                      name="mediaType"
                      className="form-control"
                      type="radio"
                      checked={this.state.formInputs.mediaType === 2}
                      value={2}
                      onChange={this.handleChange}
                    />
                    <label for="video">
                      <i className={'material-icons'}>videocam</i> <span>Video</span>
                    </label>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {this.state.formInputs.mediaType === 2
                      ? t('releaseInfo:UPC/ISRC')
                      : t('releaseInfo:UPC')}{' '}
                    <i> ({t('releaseInfo:Optional')})</i>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('releaseInfo:UPC')} />
                </div>
                <div className="col-3">
                  <Form.Control
                    tabIndex="1+"
                    id="upc"
                    className="form-control"
                    type="text"
                    placeholder={
                      this.state.formInputs.mediaType === 2
                        ? t('releaseInfo:UPCORISRC')
                        : t('releaseInfo:UPC')
                    }
                    value={this.state.formInputs.upc}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-3">
                  <button
                    style={{ marginLeft: '10px', padding: '7px 10px' }}
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      this.setState({ isFindUpcClicked: true }, () => {
                        this.findUpc();
                      });
                    }}
                    title="Comment"
                    type="button"
                  >
                    <i className={'material-icons notranslate'}>search</i>
                    {this.state.formInputs.mediaType === 2
                      ? t('releaseInfo:FindUPCORISRC')
                      : t('releaseInfo:FindUPC')}
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
                  <ToolTip tabIndex="-1" message={t('releaseInfo:ProjectTitleMessage')} />
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
                  <div className="invalid-tooltip">{t('releaseInfo:ProjectTitleRequired')}</div>
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:Artist')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('releaseInfo:ArtistMessage')} />
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
                  <div className="invalid-tooltip">{t('releaseInfo:ArtistRequired')}</div>
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:Configuration')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('releaseInfo:ProjectTypeMessage')} />
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
                  <ToolTip tabIndex="-1" message={t('releaseInfo:ReleasingLabelMessage')} />
                </div>
                <div className="col-6 ml-10">
                  {this.props.user && (
                    <MultiSelectHierarchy
                      handleChangeCheckbox={this.handleChangeCheckbox}
                      user={this.props.user}
                      isMultiSelect={false}
                      type={'releaseInfoInput'}
                      releasingLabels={this.props.user.ReleasingLabels}
                      selectedLabelIds={this.state.selectedList}
                      tagList={[]}
                      showRequiredError={this.state.hasReleasingLabelError}
                    />
                  )}
                </div>
              </Form.Group>

              {/* <ReleasingLabelsInput
                    tabIndex="4+"
                    id="projectReleasingLabelID"
                    user={this.props.user}
                    value={this.state.formInputs.projectReleasingLabelID}
                    onChange={this.setParentState}
                  /> */}

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="col-form-label">
                    {t('releaseInfo:ReleaseDate')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('releaseInfo:ReleaseDateMessage')} />
                </div>
                <div className="col-4 release-date">
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
                <div className="col-5 release-date-options">
                  <div className="release-date-op">
                    <Form.Control
                      tabIndex="1+"
                      id="isTimedRelease"
                      name="isTimedRelease"
                      className="form-control"
                      type="radio"
                      value={false}
                      checked={this.state.formInputs.isTimedRelease === false}
                      onChange={this.handleChange}
                    />
                    <label for="audio">{t('releaseInfo:LocalStoreTurn')}</label>
                  </div>
                  <div className="release-date-op">
                    <Form.Control
                      tabIndex="1+"
                      id="isTimedRelease"
                      name="isTimedRelease"
                      className="form-control"
                      type="radio"
                      value={true}
                      checked={this.state.formInputs.isTimedRelease === true}
                      onChange={this.handleChange}
                    />
                    <label for="audio">{t('releaseInfo:GloballyTimed')}</label>
                  </div>
                  <div className="release-date-op">
                    <Form.Control
                      tabIndex="1+"
                      id="projectReleaseDateTBD"
                      name="projectReleaseDateTBD"
                      className="form-control"
                      type="radio"
                      value={this.state.formInputs.projectReleaseDateTBD ? true : false}
                      checked={this.state.formInputs.projectReleaseDateTBD}
                      onChange={this.handleChange}
                    />
                    <label for="audio">{t('releaseInfo:ReleaseTBD')}</label>
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-3">
                  <Form.Label className="notes">{t('releaseInfo:Notes')}</Form.Label>
                  <ToolTip tabIndex="-1" message={t('releaseInfo:NotesMessage')} />
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

            <div className="col-4 no-gutters">
              <div className="col-12 d-flex mb-70 justify-end">
                <Form.Label className="cover-art-label">{t('releaseInfo:CoverArt')}</Form.Label>
                <div id="preview" dropppable="true" className="form-control album-art-drop">
                  {this.state.imageUrl && (
                    <img
                      alt="cover"
                      id="projectCoverArtIMG"
                      className="obj"
                      src={this.state.imageUrl}
                      height={188}
                      width={188}
                    />
                  )}
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
                    <br />
                    (JPG, JPEG, PNG)
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
              {this.state.formInputs.imageIsrc && (
                <div className="col-12 d-flex justify-end">
                  <Form.Label className="cover-art-label">{t('releaseInfo:ImageID')}</Form.Label>
                  <div style={{ minWidth: '188px' }}>{this.state.formInputs.imageIsrc}</div>
                </div>
              )}
            </div>
          </div>

          {!isReadOnlyUser && (
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
          )}
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
  getCisCoverArt: id => dispatch(releaseAction.getCisCoverArt(id)),
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
