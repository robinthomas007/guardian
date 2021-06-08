import React, { useEffect } from 'react';
import { Field } from 'redux-form';
import Dropdown from '../../common/DropdownSelect';
import multiSelect from '../../common/multiSelect';
import DateTimePicker from '../../common/DateTimePicker';
import _ from 'lodash';
import { formatSelectArray } from '../../common/commonHelper';

const selectedFilter = [
  { name: 'ProjectArtist', label: 'Project Artist' },
  { name: 'AssignedBy', label: 'Assigned By' },
  { name: 'Step', label: 'Sections' },
  { name: 'From', label: 'From' },
  { name: 'To', label: 'To' },
];

const Filter = props => {
  useEffect(() => {}, []);

  const values = props.formValues && props.formValues.values;

  const deleteSelected = (val, name) => {
    let newVal = _.cloneDeep(values);
    if (name === 'labelIds') {
      let arr = _.filter(values.labelIds, function(e) {
        return !_.isEqual(e, val);
      });
      newVal[name] = arr;
    } else {
      newVal[name] = null;
    }
    props.initialize(newVal);
    const searchData = {
      itemsPerPage: props.searchCriteria.itemsPerPage,
      pageNumber: props.searchCriteria.pageNumber,
      searchTerm: '',
      filter: props.getSearchCriteria(newVal),
    };
    props.handleInboxSearch({ searchCriteria: searchData });
  };

  const getSelectedFilters = () => {
    let hasFilter = false;
    _.forOwn(values, function(item, key) {
      if ((item && item.length > 0) || (item && item.value)) {
        hasFilter = true;
      }
    });

    if (!hasFilter) {
      return false;
    }

    let data = _.map(selectedFilter, (item, key) => {
      if (Array.isArray(values[item.name]) && values[item.name].length > 0) {
        return (
          <span>
            <label>{item.label}:</label>
            {_.map(values[item.name], (val, index) => {
              return (
                <button
                  type="button"
                  onClick={() => deleteSelected(val, item.name)}
                  class="btn btn-sm btn-secondary"
                >
                  {val.label}
                  <i class="material-icons">close</i>
                </button>
              );
            })}
          </span>
        );
      } else if (values[item.name] && item.name !== 'labelIds') {
        return (
          <span>
            <label>{item.label}:</label>
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              onClick={() => deleteSelected(values[item.name], item.name)}
            >
              {values[item.name].label ? values[item.name].label : values[item.name]}
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

  const handleOnSelect = (data, name) => {
    let values = _.cloneDeep(_.get(props, 'formValues.values', {}));
    const obj = {};
    obj[name] = data;
    props.saveFilters({ ...props.formValues.values, ...obj });
    _.forOwn(values, function(item, key) {
      if (!item) {
        values[key] = '';
      }
      if (item && item.value) {
        values[key] = item.value;
      } else {
        if (key === 'From') {
          values[key] = props.getFromDate(item);
        }
        if (key === 'To') {
          values[key] = props.getToDate(item);
        }
      }
    });

    if (Array.isArray(data)) {
      values[name] = _.map(data, 'value');
    } else {
      values[name] =
        data && data.value
          ? data.value
          : name === 'from'
          ? props.getFromDate(data)
          : props.getToDate(data);
    }

    const searchData = {
      itemsPerPage: props.searchCriteria.itemsPerPage,
      pageNumber: props.searchCriteria.pageNumber,
      searchTerm: values.searchTerm,
      filter: { ...values },
    };
    props.handleInboxSearch({ searchCriteria: searchData });
  };

  const AssignedByFacets = formatSelectArray(_.get(props, 'data.AssignedByFacets', []));
  const ArtistFacets = formatSelectArray(_.get(props, 'data.ArtistFacets', []));
  const StepFacets = formatSelectArray(_.get(props, 'data.StepFacets', []));

  return (
    <div>
      <div className="search-filters find-project-filter collapse" id="collapsePanel">
        <div className="card card-body">
          <h5>Search Filters</h5>
          <br />
          <div className="row no-gutters">
            <div className="col-6">
              <div className="assigned_inbox_filter_field">
                <Field
                  label="Assigned"
                  name="From"
                  handleOnSelect={handleOnSelect}
                  component={DateTimePicker}
                />
                <Field
                  label="To"
                  name="To"
                  component={DateTimePicker}
                  handleOnSelect={handleOnSelect}
                />
              </div>
            </div>
            <div className="col-6">
              <Field
                label="Artist"
                name="ProjectArtist"
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                options={ArtistFacets}
                clearable={true}
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-6">
              <Field
                label="Assigned By"
                name="AssignedBy"
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                clearable={true}
                options={AssignedByFacets}
              />
            </div>
            <div className="col-6">
              <Field
                label="Section"
                name="Step"
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                options={StepFacets}
                clearable={true}
              />
            </div>
          </div>
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

export default Filter;
