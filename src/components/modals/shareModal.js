import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TextArea from '../common/texarea';
import * as shareAction from 'actions/shareAction';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import LoadingImg from 'component_library/LoadingImg';

const validate = values => {
  const errors = {};

  if (!values.emails) {
    errors.emails = 'Emails are required';
  }
  // return errors;
};

const ShareProjectModal = props => {
  const { handleClose, handleSubmit } = props;
  const loading = useSelector(state => state.shareReducer.loading);
  const success = useSelector(state => state.shareReducer.success);

  const [isEmailsValid, setEmailValid] = useState(true);
  const [emails, setEmails] = useState([]);

  const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    if (success) {
      props.handleClose();
    }
  }, [success]);

  const formSubmit = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (emails.length > 0) {
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

  const onKeyUp = evt => {
    if (['Enter', ',', ' ', ';', 'Tab'].includes(evt.key)) {
      let email = document.querySelector('#shareEmailsIds').value;
      email = email.trim();
      email = email.split(/(?:,| |;)+/);
      email = email[0];
      props.initialize({
        emails: null,
      });
      if (email) {
        setEmails([...emails, email]);
      }
    }
  };

  const updateEmail = email => {
    let arr = emails.filter(e => e !== email);
    setEmails(arr);
    props.initialize({
      emails: email,
    });
  };

  const removeEmail = email => {
    let arr = emails.filter(e => e !== email);
    setEmails(arr);
  };
  const handleKeyDown = evt => {
    if (evt.key === 'Tab') {
      evt.preventDefault();
    }
    if (evt.key === 'Backspace') {
      let clear = document.querySelector('#shareEmailsIds').value;
      if (clear === '') {
        const popElm = emails.pop();
        removeEmail(popElm);
      }
    }
  };

  const onPasteEmail = e => {
    let email = e.clipboardData.getData('Text');
    const copiedEmail = extract(['<', '>'])(email);
    if (copiedEmail && copiedEmail.length > 0) {
      email = copiedEmail;
    } else {
      email = email.trim();
      email = email.split(/(?:,| |;)+/);
    }
    props.initialize({
      emails: null,
    });
    if (email) {
      if (email) {
        setEmails([...emails, ...email]);
      }
    }
    e.preventDefault();
  };

  const extract = ([beg, end]) => {
    const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
    const normalise = str => str.slice(beg.length, end.length * -1);
    return function(str) {
      if (str.match(matcher)) return str.match(matcher).map(normalise);
    };
  };

  return (
    <Modal id="shareProjectModal" show={props.show} onHide={handleClose}>
      <Modal.Body>
        <LoadingImg show={loading} />
        <form onSubmit={handleSubmit(formSubmit)}>
          <label>Please enter email id's</label>
          <div className="col-12 bubule-email-field">
            {emails.map(email => (
              <button
                type="button"
                key={email}
                className={`btn btn-sm btn-secondary email-bubble ${
                  validateEmail(email) ? 'valid-email' : 'invalid-email'
                }`}
              >
                <span onClick={() => updateEmail(email)}>{email}</span>
                <i class="material-icons" onClick={() => removeEmail(email)}>
                  close
                </i>
              </button>
            ))}
            <Field
              row="3"
              id="share"
              name="emails"
              component={TextArea}
              onKeyUp={onKeyUp}
              id="shareEmailsIds"
              onPaste={onPasteEmail}
              onKeyDown={handleKeyDown}
            />
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
