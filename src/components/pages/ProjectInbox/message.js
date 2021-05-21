import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './projectInbox.css';
import InputField from '../../common/InputField';
import TextArea from '../../common/texarea';
import Dropdown from '../../common/DropdownSelect';

const steps = [
  { value: '1', label: 'Release Information' },
  { value: '2', label: 'Contacts' },
  { value: '3', label: 'Audio' },
  { value: '4', label: 'Tracks' },
  { value: '5', label: 'Territorial Rights' },
  { value: '6', label: 'UGC Blocking' },
  { value: '7', label: 'Review' },
];

const Message = props => {
  const { handleClose, handleSubmit } = props;

  useEffect(() => {}, []);

  const formSubmit = val => {};

  return (
    <div className="message-wrapper">
      <span class="material-icons close" onClick={handleClose}>
        close
      </span>
      <div className="comments-list">
        <div className="each-message">
          <div className="message-name">
            <strong>02/04/20 - Ethan Karp - Release Notes</strong>
          </div>
          <div className="message-content">
            <span>Is this the correct label for this project?</span>
          </div>
        </div>
        <div className="each-message">
          <div className="message-name">
            <strong>02/04/20 - Matt Conlon - Release Notes</strong>
          </div>
          <div className="message-content">
            <span>Yes this is the correct label! Sheesh.</span>
          </div>
        </div>
        <div className="each-message">
          <div className="message-name">
            <strong>02/04/20 - Ethan Karp - Release Notes</strong>
          </div>
          <div className="message-content">
            <span>Is this the correct label for this project?</span>
          </div>
        </div>
        <div className="each-message">
          <div className="message-name">
            <strong>02/04/20 - Ethan Karp - Release Notes</strong>
          </div>
          <div className="message-content">
            <span>Is this the correct label for this project?</span>
          </div>
        </div>
        <div className="each-message">
          <div className="message-name">
            <strong>02/04/20 - Matt Conlon - Release Notes</strong>
          </div>
          <div className="message-content">
            <span>Yes this is the correct label! Sheesh.</span>
          </div>
        </div>
        <div className="each-message">
          <div className="message-name">
            <strong>02/04/20 - Ethan Karp - Release Notes</strong>
          </div>
          <div className="message-content">
            <span>Is this the correct label for this project?</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="row d-flex no-gutters">
          <div className="col-3">
            <Field strong={true} name="assign_to" component={InputField} label="Assign To" />
            <Field strong={true} name="step" component={Dropdown} label="Step#" options={steps} />
          </div>
          <div className="col-9 pad-lft-25">
            <Field id="comment" name="comment" component={TextArea} row={3} />
          </div>
        </div>
        <div className="text-right">
          <button type="submit" class="btn btn-primary">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

Message.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const MessageComp = reduxForm({
  form: 'MessageForm',
})(Message);

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  formValues: state.form.MessageForm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageComp);
