import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TextArea from '../common/texarea';
import * as shareAction from 'actions/shareAction';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import LoadingImg from '../ui/LoadingImg';

const validate = values => {
  const errors = {};

  if (!values.emails) {
    errors.emails = 'Emails are required';
  }
  return errors;
};

const ShareProjectModal = props => {
  const { handleClose, handleSubmit } = props;
  const loading = useSelector(state => state.shareReducer.loading);
  const success = useSelector(state => state.shareReducer.success);

  const [isEmailsValid, setEmailValid] = useState(true);

  const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    if (success) {
      props.handleClose();
    }
  }, [success]);

  const formSubmit = val => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (val.emails) {
      const emails = val.emails.split(/(?:,| |;)+/);
      let isValid = true;
      if (emails.length > 0) {
        emails.forEach(email => {
          if (!validateEmail(email)) {
            setEmailValid(false);
            isValid = false;
          }
        });

        isValid &&
          props.postEmails({
            emails: emails,
            projectID: props.projectId,
            User: {
              email: user.email,
            },
          });
      }
    }
  };

  return (
    <Modal id="shareProjectModal" show={props.show} onHide={handleClose}>
      <Modal.Body>
        <LoadingImg show={loading} />
        <form onSubmit={handleSubmit(formSubmit)}>
          <div>
            <label>Please enter email id's</label>
            <Field id="share" name="emails" component={TextArea} />
            {props.formValues &&
              props.formValues.values &&
              props.formValues.values.emails &&
              !isEmailsValid && <span className="error_message">Email id's are not valid.</span>}
          </div>
          <div className="submit-buttons float-right">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} class="btn btn-primary" variant="primary">
              Send Email
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

ShareProjectModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const ShareProjectModalComp = reduxForm({
  form: 'ShareProjectModalForm',
  validate,
})(ShareProjectModal);

const mapDispatchToProps = dispatch => ({
  postEmails: val => dispatch(shareAction.postEmails(val)),
});

const mapStateToProps = state => ({
  formValues: state.form.ShareProjectModalForm,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ShareProjectModalComp),
);
