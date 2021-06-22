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
import LoadingImg from '../../ui/LoadingImgSm';
import { steps } from '../../common/commonHelper';

const CommentSlider = props => {
  const { handleClose, handleSubmit } = props;
  const comments = useSelector(state => state.commentReducer.comments);
  const loading = useSelector(state => state.commentReducer.loading);

  useEffect(() => {
    if (props.projectID) props.getComments({ ProjectId: props.projectID });
  }, []);

  useEffect(() => {
    const node = document.querySelector('.comment-section-wrap');
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [comments]);

  const formSubmit = val => {
    let reqObj = _.cloneDeep(val);
    reqObj['ProjectId'] = props.projectID;
    reqObj['Step'] = val.Step.value;
    props.postComment({ Comment: reqObj }).then(function(response) {
      if (response.Comment) {
        props.initialize({});
      }
    });
  };

  const renderComments = () => {
    return (
      <ul className="comment-section-wrap">
        {_.map(comments, (obj, key) => {
          return (
            <li key={key}>
              <strong>
                {obj.CreatedDateTime} - {obj.AssignedByName} - {obj.Step}
              </strong>
              <br /> {obj.Text}
            </li>
          );
        })}
        <div className="loader-img">
          <LoadingImg show={loading} />
        </div>
      </ul>
    );
  };

  return (
    <Rnd
      default={{
        x: 65,
        y: 190 + window.scrollY,
        width: 350,
        height: 440,
      }}
      minWidth={350}
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
            <button type="submit" class="btn btn-primary" disabled={loading}>
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
  getComments: val => dispatch(commentAction.getComments(val)),
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
