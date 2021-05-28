import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './CommentSlider.css';
import InputField from '../../common/InputField';
import TextArea from '../../common/texarea';
import Dropdown from '../../common/DropdownSelect';
import * as commentAction from 'actions/commentAction';
import { Rnd } from 'react-rnd';
import _ from 'lodash';

const steps = [
  { value: '1', label: 'Release Information' },
  { value: '2', label: 'Contacts' },
  { value: '3', label: 'Audio' },
  { value: '4', label: 'Tracks' },
  { value: '5', label: 'Territorial Rights' },
  { value: '6', label: 'UGC Blocking' },
  { value: '7', label: 'Review' },
];

const CommentSlider = props => {
  const { handleClose, handleSubmit } = props;
  const comments = useSelector(state => state.commentReducer.comments);

  useEffect(() => {
    // props.getComments()
  }, []);

  const formSubmit = val => {
    props.postComment({ comment: val });
  };

  const renderComments = () => {
    return (
      <ul>
        {_.map(comments, (obj, key) => {
          return (
            <li key={key}>
              <strong>
                {obj.date} - {obj.name} - {obj.step}
              </strong>
              <br /> {obj.comment}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Rnd
      default={{
        x: 1120,
        y: 275 + window.scrollY,
        width: 300,
        height: 390,
      }}
      minWidth={300}
      minHeight={390}
      bounds="parent"
      cancel="#commentForm"
    >
      <div className="comment-slider">
        <span className="material-icons close" onClick={handleClose}>
          close
        </span>
        {renderComments()}

        <form onSubmit={handleSubmit(formSubmit)} id="commentForm">
          <Field strong={true} name="assign_to" component={InputField} label="Assign To" />
          <Field strong={true} name="step" component={Dropdown} label="Step#" options={steps} />
          <Field id="comment" name="comment" component={TextArea} />
          <div className="text-right">
            <button type="submit" class="btn btn-primary">
              Comment
            </button>
          </div>
        </form>
      </div>
    </Rnd>
  );
};

CommentSlider.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const CommentSliderComp = reduxForm({
  form: 'CommentSliderForm',
})(CommentSlider);

const mapDispatchToProps = dispatch => ({
  postComment: val => dispatch(commentAction.postComment(val)),
});

const mapStateToProps = state => ({
  formValues: state.form.CommentSliderForm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentSliderComp);
