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
import { withRouter } from 'react-router-dom';

const steps = [
  { value: 'Release Information', label: 'Release Information' },
  { value: 'Contacts', label: 'Contacts' },
  { value: 'Audio', label: 'Audio' },
  { value: 'Tracks', label: 'Tracks' },
  { value: 'Territorial Rights', label: 'Territorial Rights' },
  { value: 'UGC Blocking', label: 'UGC Blocking' },
  { value: 'Review', label: 'Review' },
];

const CommentSlider = props => {
  const { handleClose, handleSubmit } = props;
  const comments = useSelector(state => state.commentReducer.comments);

  useEffect(() => {
    // props.getComments()
  }, []);

  const formSubmit = val => {
    let reqObj = _.cloneDeep(val);

    reqObj['ProjectId'] = props.projectID;
    reqObj['Step'] = val.Step.value;
    props.postComment({ Comment: reqObj, User: { email: 'Robin.Thomas@umusic.com' } });
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
        y: 270 + window.scrollY,
        width: 300,
        height: 440,
      }}
      minWidth={300}
      minHeight={440}
      bounds="parent"
      cancel="#commentForm"
    >
      <div className="comment-slider">
        <span className="material-icons close" onClick={handleClose}>
          close
        </span>
        {renderComments()}

        <form onSubmit={handleSubmit(formSubmit)} id="commentForm">
          <Field strong={true} name="AssignedToEmail" component={InputField} label="Assign To" />
          <Field strong={true} name="Step" component={Dropdown} label="Step#" options={steps} />
          <Field id="comment" name="Text" component={TextArea} />
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CommentSliderComp),
);
