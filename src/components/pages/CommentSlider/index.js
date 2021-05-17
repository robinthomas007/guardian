import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CommentSlider.css';
import InputField from '../../common/InputField';
import TextArea from '../../common/texarea';
import Dropdown from '../../common/DropdownSelect';
import * as commentAction from 'actions/commentAction';

const steps = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const CommentSlider = props => {
  const { handleClose, handleSubmit } = props;

  useEffect(() => {
    // if (props.step === 0) {
    props.test(21);
    // }
  }, []);

  const formSubmit = val => {
    props.postComment(val);
    console.log(val, 'form submit');
  };

  return (
    <div className="comment-slider">
      <span class="material-icons close" onClick={handleClose}>
        close
      </span>
      <ul>
        <li>02/04/20 - Ethan Karp - Release Notes Is this the correct label for this project?</li>
        <li>02/04/20 - Matt Conlon - Release Notes Yes this is the correct label! Sheesh.</li>
        <li>02/04/20 - Ethan Karp - Release Notes Is this the correct label for this project?</li>
      </ul>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Field name="assign_to" component={InputField} label="Assign To" />
        <Field name="step" component={Dropdown} label="Step#" options={steps} />
        <Field id="comment" name="comment" component={TextArea} />
        <div className="text-right">
          <button type="submit" class="btn btn-primary">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

CommentSlider.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const CommentSliderComp = reduxForm({
  form: 'CommentSliderForm',
})(CommentSlider);

const mapDispatchToProps = dispatch => ({
  test: id => {
    console.log('Test coming ');
  },
  postComment: val => dispatch(commentAction.postComment(val)),
});

const mapStateToProps = state => ({
  formValues: state.form.CommentSliderForm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentSliderComp);
