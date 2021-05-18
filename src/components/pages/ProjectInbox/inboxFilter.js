import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown from '../../common/DropdownSelect';
import * as commentAction from 'actions/commentAction';
import DateTimePicker from '../../common/DateTimePicker';
import _ from 'lodash';

const labels = [
  { name: 'assigned', label: 'Assigned' },
  { name: 'to', label: 'To' },
  { name: 'artist', label: 'Artist' },
  { name: 'assigned_by', label: 'Assigned By' },
  { name: 'section', label: 'Section' },
];

const Filter = props => {
  const { handleClose, handleSubmit } = props;
  useEffect(() => {}, []);

  const formSubmit = val => {
    console.log(val, 'form submit');
  };

  let values = props.formValues && props.formValues.values;
  console.log(values);

  const getSelectedFilters = () => {
    console.log('coming here ', labels, values);
    let data = _.map(labels, (item, key) => {
      if (values[item.name]) {
        return (
          <span>
            <label>{item.label}:</label>
            <button class="btn btn-sm btn-secondary">
              {values[item.name]}
              <i class="material-icons">close</i>
            </button>
          </span>
        );
      }
    });
    return (
      <div class="selected-filters row d-flex flex-nowrap no-gutters">
        <div class="col-auto">Selected Filters:</div>
        <div class="col-10">{data}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="search-filters collapse" id="collapsePanel">
        <div className="card card-body">
          <h5>Search Filters</h5>
          <br />
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="row no-gutters">
              <div className="col-6">
                <div className="assigned_inbox_filter_field">
                  <Field label="Assigned" name="assigned" component={DateTimePicker} />
                  <Field label="To" name="to" component={DateTimePicker} />
                </div>
              </div>
              <div className="col-6">
                <Field label="Artist" name="artist" component={Dropdown} options={[]} />
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-6">
                <Field label="Assigned By" name="by" component={Dropdown} options={[]} />
              </div>
              <div className="col-6">
                <Field label="Section" name="Section" component={Dropdown} options={[]} />
              </div>
            </div>
          </form>
        </div>
      </div>
      {values && Object.keys(values).length > 0 && (
        <ul className="row search-row filters">
          <li className="col-2 d-flex"></li>
          <li className="col-8 d-flex">{getSelectedFilters()}</li>
          <li className="col-2 d-flex"></li>
        </ul>
      )}
    </div>
  );
};

Filter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const FilterComp = reduxForm({
  form: 'FilterForm',
})(Filter);

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  formValues: state.form.FilterForm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterComp);
