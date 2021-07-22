import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './projectInbox.css';
import InputField from '../../common/InputField';
import TextArea from '../../common/texarea';
import Dropdown from '../../common/DropdownSelect';
import { steps } from '../../common/commonHelper';
import _ from 'lodash';
import LoadingImg from '../../ui/LoadingImgSm';
import * as commentAction from 'actions/commentAction';
import moment from 'moment';

const validate = values => {
  const errors = {};
  if (!values.Text) {
    errors.Text = 'Comment is required';
  }
  return errors;
};

const Message = props => {
  const { handleClose, handleSubmit } = props;
  const comments = useSelector(state => state.commentReducer.comments);
  const loading = useSelector(state => state.commentReducer.loading);

  useEffect(() => {
    if (props.projectID) props.getComments({ ProjectId: props.projectID });
  }, []);

  useEffect(() => {
    const node = document.querySelector('.comments-list');
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [comments]);

  const formSubmit = val => {
    let reqObj = _.cloneDeep(val);
    reqObj['ProjectId'] = props.projectID || '552'; // TODO
    reqObj['Step'] = val.Step ? val.Step.value : '';
    props.postComment({ Comment: reqObj }).then(function(response) {
      if (response.Comment) {
        props.initialize({});
      }
    });
  };

  const renderComments = () => {
    return (
      <div className="comments-list">
        {_.map(comments, (obj, key) => {
          return (
            <div key={key} className="each-message">
              <div className="message-name">
                <strong>
                  {moment
                    .utc(obj.CreatedDateTime)
                    .local()
                    .format('MM/DD/YYYY hh:mm A')}{' '}
                  - {obj.AssignedByName} - {obj.Step}
                </strong>
              </div>
              <div className="message-content">{obj.Text}</div>
            </div>
          );
        })}
        <div className="loader-img">
          <LoadingImg show={loading} />
        </div>
      </div>
    );
  };

  return (
    <div className="message-wrapper">
      <span class="material-icons close" onClick={handleClose}>
        close
      </span>
      {renderComments()}
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="row d-flex no-gutters">
          <div className="col-3">
            <Field strong={true} name="AssignedToEmail" component={InputField} label="Assign To" />
            <Field strong={true} name="Step" component={Dropdown} label="Step#" options={steps} />
          </div>
          <div className="col-9 pad-lft-25">
            <Field id="comment" name="Text" component={TextArea} row={3} />
          </div>
        </div>
        <div className="text-right">
          <button type="submit" class="btn btn-primary" disabled={loading}>
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
  validate,
})(Message);

const mapDispatchToProps = dispatch => ({
  postComment: val => dispatch(commentAction.postComment(val)),
  getComments: val => dispatch(commentAction.getComments(val)),
});

const mapStateToProps = state => ({
  formValues: state.form.MessageForm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageComp);
