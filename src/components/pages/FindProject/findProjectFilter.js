import React, { useEffect } from 'react';
import { Field } from 'redux-form';
import Dropdown from '../../common/DropdownSelect';
import DateTimePicker from '../../common/DateTimePicker';
import _ from 'lodash';
import { formatSelectArray } from '../../common/commonHelper';

const selectedFilter = [
  { name: 'labelIds', label: 'Labels' },
  { name: 'hasAudio', label: 'Has Audio' },
  { name: 'hasRights', label: 'Has Rights' },
  { name: 'statusID', label: 'Status' },
  { name: 'hasBlocking', label: 'Blocking' },
  { name: 'from', label: 'From' },
  { name: 'to', label: 'To' },
];

const Filter = props => {
  useEffect(() => {}, []);

  const values = props.formValues && props.formValues.values;

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
                <button type="button" class="btn btn-sm btn-secondary">
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
            <button type="button" class="btn btn-sm btn-secondary">
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
        if (Array.isArray(item)) {
          values[key] = _.map(item, 'value');
        }
        if (key === 'from') {
          values[key] = props.getFromDate(item);
        }
        if (key === 'to') {
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
    props.handleProjectSearch({ searchCriteria: searchData });
  };

  const LabelFacets = formatSelectArray(_.get(props, 'data.LabelFacets', []));
  const StatusFacets = formatSelectArray(_.get(props, 'data.StatusFacets', []));
  const HasAudioFacets = formatSelectArray(_.get(props, 'data.HasAudioFacets', []));
  const HasBlockingFacets = formatSelectArray(_.get(props, 'data.HasBlockingFacets', []));
  const HasRightsFacets = formatSelectArray(_.get(props, 'data.HasRightsFacets', []));

  return (
    <div>
      <div className="search-filters find-project-filter collapse" id="collapsePanel">
        <div className="card card-body">
          <h5>Search Filters</h5>
          <br />
          <div className="row no-gutters">
            <div className="col-5">
              <Field
                label="By Label"
                name="labelIds"
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                isMulti={true}
                options={LabelFacets}
              />
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <Field
                label="By Status"
                name="statusID"
                clearable={true}
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                options={StatusFacets}
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-5">
              <Field
                label="Has Audio"
                name="hasAudio"
                clearable={true}
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                options={HasAudioFacets}
              />
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <Field
                label="Has Blocking"
                name="hasBlocking"
                clearable={true}
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                options={HasBlockingFacets}
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-5">
              <Field
                label="Has Rights"
                name="hasRights"
                clearable={true}
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                options={HasRightsFacets}
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-10 last-up-date">
              <Field
                label="Last Updated"
                name="from"
                handleOnSelect={handleOnSelect}
                component={DateTimePicker}
              />
              <Field
                label="to"
                name="to"
                handleOnSelect={handleOnSelect}
                component={DateTimePicker}
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
