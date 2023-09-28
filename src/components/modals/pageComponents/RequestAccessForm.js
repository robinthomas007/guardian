import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
// import LabelsDropDown from 'components/modals/pageComponents/LabelsDropDown';
import ReleasingLabelsInput from '../../../components/pages/ReleaseInformation/pageComponents/ReleasingLabelsInput.js';
import { isFormValid } from '../../../components/Utils';
import { showNotySucess, showNotyError } from 'components/Utils';
import MultiSelectHierarchy from '../../common/multiSelectTag';
import _ from 'lodash';

class RequestAccessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        firstName: '',
        lastName: '',
        LabelID: null,
        email: '',
        phoneNumber: '',
      },
      ReleasingLabels: [],
      submitDisabled: false,
      selectedOptions: [],
      selectedList: [],
      isLabelSelected: false,
    };
  }

  handleChange = e => {
    this.setState({ formInputs: { ...this.state.formInputs, [e.target.name]: e.target.value } });
  };

  handleLabelChange = e => {
    this.setState({ formInputs: { ...this.state.formInputs, LabelID: parseInt(e.target.value) } });
  };
  handleChangeCheckbox = data => {
    const modificedData = _.map(data, 'value');
    this.setState({ selectedOptions: modificedData, selectedList: data });
  };

  getLabels = () => {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    fetch(window.env.api.url + '/labels', {
      method: 'GET',
      headers: fetchHeaders,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        let modifiedReleasingLabels = responseJSON;
        modifiedReleasingLabels.ReleasingLabels.unshift({ id: '', name: 'Select One' });
        this.setState({ ReleasingLabels: modifiedReleasingLabels });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleAccessSuccess = () => {
    showNotySucess('Your request for access to the Guardian has been successfully sent.');
  };

  handleAccessError = message => {
    showNotyError(message + ' Click to close.', () => {
      this.setState({ submitDisabled: false });
    });
  };

  sumbitRequestAccess = () => {
    this.setState({ submitDisabled: true });

    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    const formattedFormData = {
      ...this.state.formInputs,
      LabelID: this.state.selectedOptions.join(','),
    };
    const fetchBody = JSON.stringify(formattedFormData);

    fetch(window.env.api.url + '/access', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        if (responseJSON.message) {
          this.setState({ submitDisabled: true }, () => {
            this.handleAccessError(responseJSON.message);
          });
        } else {
          this.setState({ submitDisabled: false }, () => {
            this.handleAccessSuccess();
            this.props.handleClose();
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ submitDisabled: false });
      });
  };

  componentDidMount() {
    // this.getLabels();
  }

  checkIfLabeleSelected() {
    if (this.state.selectedList.length <= 0) {
      this.setState({ isLabelSelected: true });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.checkIfLabeleSelected();
    if (isFormValid() && this.state.selectedList.length > 0) {
      this.setState({ isLabelSelected: false }, () => {
        this.sumbitRequestAccess();
      });
    }
  };

  render() {
    const user = { IsAdmin: true };
    return (
      <Form>
        <ul className="request-form">
          <li>Fill in the fields below for review by our administrative team.</li>
          <li>
            <Form.Label>
              First Name <span className="required-ind">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              className="form-control requiredInput"
              value={this.state.formInputs.firstName}
              onChange={this.handleChange}
            />
            <div className="invalid-tooltip">First Name is required.</div>
          </li>
          <li>
            <Form.Label>
              Last Name <span className="required-ind">*</span>
            </Form.Label>
            <Form.Control
              component="input"
              type="text"
              name="lastName"
              className="form-control requiredInput"
              value={this.state.formInputs.lastName}
              onChange={this.handleChange}
            />
            <div className="invalid-tooltip">Last Name is required.</div>
          </li>
          <li>
            <div className="msh-parent-wrapper">
              <Form.Label id="labelName">
                Label/Company <span className="required-ind">*</span>
              </Form.Label>
              <MultiSelectHierarchy
                handleChangeCheckbox={this.handleChangeCheckbox}
                type={'requestFormInput'}
                isMultiSelect={true}
                tagList={[]}
                user={user}
                selectedLabelIds={this.state.selectedList}
              />
              {this.state.isLabelSelected && (
                <div className="multiselect-invalid-tooltip">A label selection is required.</div>
              )}
            </div>

            {/*  <Form.Label id="labelName">
              Label/Company <span className="required-ind">*</span>
            </Form.Label>
             <ReleasingLabelsInput
              id="LabelID"
              name="LabelID"
              user={this.state.ReleasingLabels} 
              value={this.state.formInputs.LabelID}
              onChange={this.handleLabelChange}
              className={'requiredInput'}
    />*/}
          </li>
          <li>
            <Form.Label>
              Email <span className="required-ind">*</span>
            </Form.Label>
            <Form.Control
              component="input"
              type="email"
              name="email"
              className="form-control requiredInput"
              value={this.state.formInputs.email}
              onChange={this.handleChange}
            />
            <div className="invalid-tooltip">An email address is required.</div>
          </li>
          <li>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              component="input"
              type="tel"
              name="phoneNumber"
              className="form-control"
              value={this.state.formInputs.phoneNumber}
              onChange={this.handleChange}
            />
          </li>
          <li className="float-right">
            <Button variant="secondary" id="cancelButton" onClick={this.props.handleClose}>
              Cancel
            </Button>
            &nbsp;&nbsp;
            <Button
              disabled={this.state.submitDisabled}
              onClick={this.handleSubmit}
              variant="primary"
              id="submitButton"
              type="submit"
            >
              Submit
            </Button>
          </li>
        </ul>
      </Form>
    );
  }
}

export default RequestAccessForm;
