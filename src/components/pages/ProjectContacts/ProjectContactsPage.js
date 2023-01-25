import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ToolTip from 'component_library/Tooltip';
import BootStrapDropDownInput from '../ProjectContacts/pageComponents/BootStrapDropDownInput';
import { withRouter } from 'react-router';
import './ProjectContacts.css';
import LoadingImg from 'component_library/LoadingImg';
import { isFormValid, isPreReleaseDate } from '../../Utils.js';
import _ from 'lodash';
import { showNotyInfo, showNotyAutoError, NO_LABEL_ID } from 'components/Utils';
import { connect } from 'react-redux';
import * as releaseAction from './../ReleaseInformation/releaseAction';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

class ProjectContactsPage extends Component {
  constructor(props) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    super(props);
    this.state = {
      formInputs: {
        projectPrimaryContact: user.name,
        projectPrimaryContactEmail: user.email ? user.email.toLowerCase() : '',
        projectSecurityID: '1',
        projectAdditionalContacts: '',
        projectStatusID: '1',
        isMasked: false,
      },
      projectAdditionalContactsValid: '',
      project: {},
      showloader: false,
      emails: [],
    };

    if (this.props.match.params.projectID) {
      this.handlePageDataLoad();
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.handleChangeByID = this.handleChangeByID.bind(this);
    this.isAdditionalContactsValid = this.isAdditionalContactsValid.bind(this);
    this.handleMaskChange = this.handleMaskChange.bind(this);
  }

  handlePageDataLoad() {
    this.setState({ showloader: true });
    this.props
      .getProjectDetails({
        PagePath: this.props.match.url ? this.props.match.url : '',
        ProjectID: this.props.match.params.projectID,
        languagecode: localStorage.getItem('languageCode') || 'en',
      })
      .then(response => response.json())
      .then(responseJSON => {
        let modifiedFormInputs = responseJSON.Project;
        let emails = modifiedFormInputs.projectAdditionalContacts
          ? modifiedFormInputs.projectAdditionalContacts.split(',')
          : [];
        modifiedFormInputs.projectAdditionalContacts = '';
        this.setState({
          formInputs: modifiedFormInputs,
          project: responseJSON,
          showloader: false,
          emails: emails,
        });
        this.props.setHeaderProjectData(responseJSON);
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  }

  showNotification(e, projectID, saveAndContinue) {
    showNotyInfo(this.props.t('contact:projectSaved'), () => {
      if (saveAndContinue) {
        if (
          !this.state.project.Project.projectReleaseDateTBD &&
          !isPreReleaseDate(this.state.project)
        ) {
          this.props.history.push({
            pathname: '/trackInformation/' + projectID,
          });
        } else {
          this.props.history.push({
            pathname: '/audioFiles/' + projectID,
          });
        }
      }
    });
  }

  showNotSavedNotification(e) {
    showNotyAutoError(this.props.t('contact:projectSaved'));
  }

  handleChange(e) {
    let inputValue = '';
    if (e.target.type === 'checkbox') {
      inputValue = e.target.checked ? true : false;
    } else {
      inputValue = e.target.value;
    }

    this.setState({
      formInputs: { ...this.state.formInputs, [e.target.id]: inputValue },
    });
  }

  handleChangeByID(id, value) {
    const { formInputs } = this.state;
    let modifiedFormInput = formInputs;
    modifiedFormInput[id] = value;
    if (id === 'projectSecurityID' && value === '2') {
      modifiedFormInput['isMasked'] = false;
    }
    this.setState({ formInputs: modifiedFormInput });
  }

  isAdditionalContactsValid(e) {
    const { formInputs, emails } = this.state;
    const saveAndContinue = e.target.classList.contains('saveAndContinueButton') ? true : false;

    let email = document.querySelector('#projectAdditionalContacts').value;
    email = email.trim();
    email = email.split(/(?:,| |;)+/);
    email = email[0];
    formInputs.projectAdditionalContacts = '';
    if (email) {
      this.setState({
        emails: [...emails, email],
        formInputs: formInputs,
      });
    }

    this.props
      .validateEmails({
        emails: [...emails, email].join(),
      })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.IsValid) {
          this.setState({ projectAdditionalContactsValid: '' }, e => {
            this.handleSubmit(e, saveAndContinue);
          });
        } else {
          this.setState({ projectAdditionalContactsValid: ' is-invalid' });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSubmit(e, saveAndContinue) {
    const formInputs = _.cloneDeep(this.state.formInputs);
    const isValidForm = isFormValid();

    if (isValidForm) {
      this.setState({ showloader: true });
      formInputs.projectAdditionalContacts = this.state.emails.join();
      let releaseInformationInputs = JSON.parse(localStorage.getItem('projectData'));
      if (this.props.data && this.props.data.projectID) {
        releaseInformationInputs = this.props.data;
      }
      const projectID = this.props.match.params.projectID;

      const projectFields = projectID ? formInputs : { ...releaseInformationInputs, ...formInputs };

      this.props
        .submitProjectDetails({
          Project: projectFields,
          languagecode: localStorage.getItem('languageCode') || 'en',
        })
        .then(response => response.json())
        .then(responseJSON => {
          if (responseJSON.errorMessage) {
            this.showNotSavedNotification();
          } else {
            this.props.showNotiBarIfMasked(responseJSON);
            this.setState(
              {
                project: responseJSON,
                showloader: false,
              },
              () =>
                this.showNotification(
                  e,
                  responseJSON.Project ? responseJSON.Project.projectID : null,
                  saveAndContinue,
                ),
            );
            this.props.setHeaderProjectData(responseJSON);
            localStorage.setItem('prevStep', 2);
            //clear the local storage
            saveAndContinue && localStorage.removeItem('projectData');
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ showloader: false });
        });
    }
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleKeyDown = evt => {
    const { emails } = this.state;
    if (evt.key === 'Backspace') {
      let clear = document.querySelector('#projectAdditionalContacts').value;
      if (clear === '') {
        emails.pop();
        this.setState({
          emails: emails,
        });
      }
    }
  };

  handleKeyUp = evt => {
    const { formInputs, emails } = this.state;
    if (['Enter', ',', ' ', ';'].includes(evt.key)) {
      let email = document.querySelector('#projectAdditionalContacts').value;
      email = email.trim();
      email = email.split(/(?:,| |;)+/);
      email = email[0];
      formInputs.projectAdditionalContacts = '';
      if (email) {
        this.setState({
          emails: [...emails, email],
          formInputs: formInputs,
        });
      }
    }
  };

  updateEmail = email => {
    const { emails, formInputs } = this.state;
    let arr = emails.filter(e => e !== email);
    this.setState({ emails: arr });
    formInputs.projectAdditionalContacts = email;
    this.setState({ formInputs: formInputs });
  };

  removeEmail = email => {
    const { emails } = this.state;
    let arr = emails.filter(e => e !== email);
    this.setState({ emails: arr });
  };

  onPasteEmail = e => {
    const { formInputs, emails } = this.state;
    let email = e.clipboardData.getData('Text');
    const copiedEmail = this.extract(['<', '>'])(email);
    if (copiedEmail && copiedEmail.length > 0) {
      email = copiedEmail;
    } else {
      email = email.trim();
      email = email.split(/(?:,| |;)+/);
    }
    formInputs.projectAdditionalContacts = '';
    if (email) {
      this.setState({
        emails: [...emails, ...email],
        formInputs: formInputs,
      });
    }
    e.preventDefault();
  };

  extract = ([beg, end]) => {
    const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
    const normalise = str => str.slice(beg.length, end.length * -1);
    return function(str) {
      if (str.match(matcher)) return str.match(matcher).map(normalise);
    };
  };

  componentDidUpdate = () => {
    if (this.props.match.params.projectID) {
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
    }
  };

  componentDidMount = () => {
    if (this.props.match.params.projectID) {
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
    }
  };

  handleMaskChange = e => {
    this.handleChange(e);
  };

  render() {
    const { t, user } = this.props;
    const isReadOnlyUser = user.DefaultReleasingLabelID === NO_LABEL_ID ? true : false;
    return (
      <div className="col-10">
        <LoadingImg show={this.state.showloader} />
        <div className="row d-flex no-gutters step-description">
          <div className="col-12">
            <h2>
              {t('contact:step')} <span className="count-circle notranslate">2</span>{' '}
              {t('contact:ProjectContacts')}
            </h2>
            <p>
              {t('contact:DescriptionMain')} <span className="required-ind">*</span>.
            </p>
          </div>
        </div>

        <Form>
          <div className="row d-flex">
            <div className="col-12">
              <Form.Group className="row d-flex no-gutters">
                <div className="col-2">
                  <Form.Label className="col-form-label">
                    {t('contact:ProjectSecurity')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('contact:ProjectSecurityMessage')} />
                </div>
                <div className="col-10">
                  <BootStrapDropDownInput
                    tabIndex="1+"
                    id="projectSecurityID"
                    value={this.state.formInputs.projectSecurityID}
                    onChange={this.handleChangeByID}
                    className={'project-security-dropdown'}
                    t={t}
                  />
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-2">
                  <Form.Label className="col-form-label">
                    {t('contact:mask')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('contact:maskMessage')} />
                </div>
                <div className="col-10">
                  <label className="custom-checkbox">
                    <input
                      tabIndex="+1"
                      id="isMasked"
                      className="form-control"
                      type="checkbox"
                      value={this.state.formInputs.isMasked}
                      onChange={this.handleMaskChange}
                      checked={this.state.formInputs.isMasked}
                      disabled={this.state.formInputs.projectSecurityID !== '1'}
                    />

                    <span
                      className={`checkmark ${
                        this.state.formInputs.projectSecurityID !== '1' ? 'disabled' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-2">
                  <Form.Label className="col-form-label">
                    {t('contact:PrimaryContact')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('contact:PrimaryContactMessage')} />
                </div>
                <div className="col-5">
                  <Form.Control
                    className="form-control requiredInput"
                    tabIndex="2+"
                    id="projectPrimaryContact"
                    value={this.state.formInputs.projectPrimaryContact}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-tooltip">{t('contact:PrimaryContactRequired')}</div>
                </div>
                <div className="col-5"></div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-2">
                  <Form.Label className="col-form-label">
                    {t('contact:PrimaryContactEmail')}
                    <span className="required-ind">*</span>
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('contact:PrimaryContactEmailMessage')} />
                </div>
                <div className="col-5">
                  <Form.Control
                    className="form-control requiredInput"
                    tabIndex="3+"
                    id="projectPrimaryContactEmail"
                    value={this.state.formInputs.projectPrimaryContactEmail}
                    onChange={this.handleChange}
                    type="email"
                  />
                  <div className="invalid-tooltip">{t('contact:PrimaryContactEmailRequired')}</div>
                </div>
                <div className="col-5"></div>
              </Form.Group>

              <Form.Group className="row d-flex no-gutters">
                <div className="col-2">
                  <Form.Label className="col-form-label align-top">
                    {t('contact:AdditionalContacts')}
                  </Form.Label>
                  <ToolTip tabIndex="-1" message={t('contact:AdditionalContactsMessage')} />
                </div>
                <div className="col-10 bubule-email-field">
                  {this.state.emails.map(email => (
                    <button
                      type="button"
                      key={email}
                      className={`btn btn-sm btn-secondary email-bubble ${
                        this.validateEmail(email) ? 'valid-email' : 'invalid-email'
                      }`}
                    >
                      <span onClick={() => this.updateEmail(email)}>{email}</span>
                      <i class="material-icons" onClick={() => this.removeEmail(email)}>
                        close
                      </i>
                    </button>
                  ))}

                  <Form.Control
                    id="projectAdditionalContacts"
                    className={
                      'form-control additionalContactsInput' +
                      this.state.projectAdditionalContactsValid
                    }
                    tabIndex="4+"
                    as="textarea"
                    rows="4"
                    value={this.state.formInputs.projectAdditionalContacts}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    onKeyDown={this.handleKeyDown}
                    onPaste={this.onPasteEmail}
                  />
                  <div className="invalid-tooltip">{t('contact:IncorrectlyFormattedEmail')}</div>
                </div>
              </Form.Group>
            </div>
          </div>

          {!isReadOnlyUser && (
            <div className="row save-buttons">
              <div className="col-12">
                <button
                  tabIndex="5+"
                  id="contactsSaveButton"
                  type="button"
                  className="btn btn-secondary saveButton"
                  onClick={this.isAdditionalContactsValid}
                >
                  {t('contact:Save')}
                </button>
                <button
                  tabIndex="6+"
                  id="contactsSaveContButton"
                  type="button"
                  className="btn btn-primary saveAndContinueButton"
                  onClick={this.isAdditionalContactsValid}
                >
                  {t('contact:Save')} &amp; {t('contact:Continue')}
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  findUpc: val => dispatch(releaseAction.findUpc(val)),
  getProjectDetails: data => dispatch(releaseAction.getProjectDetails(data)),
  submitProjectDetails: data => dispatch(releaseAction.submitProjectDetails(data)),
  validateEmails: data => dispatch(releaseAction.validateEmails(data)),
});

const mapStateToProps = state => ({});

export default withRouter(
  compose(
    withTranslation('contact'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(ProjectContactsPage),
);
