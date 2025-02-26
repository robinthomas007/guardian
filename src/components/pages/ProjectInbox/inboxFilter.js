import React, { useEffect } from 'react';
import { Field } from 'redux-form';
import Dropdown from '../../common/DropdownSelect';
import DateTimePicker from '../../common/DateTimePicker';
import _ from 'lodash';
import { formatSelectArray, fomatDates } from '../../common/commonHelper';
import { useTranslation } from 'react-i18next';
import i18n from './../../../i18n';

const selectedFilter = [
  { name: 'ProjectArtist', label: i18n.t('search:ProjectArtist') },
  { name: 'AssignedBy', label: i18n.t('search:AssignedBy') },
  { name: 'Step', label: i18n.t('search:Sections') },
  { name: 'From', label: i18n.t('search:From') },
  { name: 'To', label: i18n.t('search:To') },
];

const Filter = props => {
  useEffect(() => {}, []);
  const { t } = useTranslation();
  const values = props.formValues && props.formValues.values;

  const deleteSelected = (val, name) => {
    let newVal = _.cloneDeep(values);
    newVal[name] = null;
    props.initialize(newVal);
    const searchData = {
      itemsPerPage: props.searchCriteria.itemsPerPage,
      pageNumber: props.searchCriteria.pageNumber,
      searchTerm: '',
      filter: props.getSearchCriteria(newVal),
    };
    props.handleInboxSearch({ searchCriteria: fomatDates(_.cloneDeep(searchData)) });
    props.saveFilters(newVal);
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
        <div class="col-auto">{i18n.t('search:SelectedFilters')}:</div>
        <div class="col-10">{data}</div>
      </div>
    );
  };

  const handleOnSelect = (data, name) => {
    let values = _.cloneDeep(_.get(props, 'formValues.values', {}));
    const obj = {};
    if (name === 'To') {
      obj[name] = props.getToDate(data, true);
    } else if (name === 'From') {
      obj[name] = props.getFromDate(data, true);
    } else {
      obj[name] = data;
    }
    props.saveFilters({ ...props.formValues.values, ...obj });
    _.forOwn(values, function(item, key) {
      if (!item) {
        values[key] = '';
      }
      if (item && item.value) {
        values[key] = item.value;
      } else {
        if (key === 'From') {
          values[key] = props.getFromDate(item, true);
        }
        if (key === 'To') {
          values[key] = props.getToDate(item, true);
        }
      }
    });

    if (Array.isArray(data)) {
      values[name] = _.map(data, 'value');
    } else {
      values[name] =
        data && data.value
          ? data.value
          : name === 'From'
          ? props.getFromDate(data, true)
          : props.getToDate(data, true);
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
          <h5>{t('inbox:SearchFilters')}</h5>
          <br />
          <div className="row no-gutters">
            <div className="col-6">
              <div className="assigned_inbox_filter_field">
                <Field
                  label={t('inbox:Assigned')}
                  name="From"
                  handleOnSelect={handleOnSelect}
                  component={DateTimePicker}
                />
                <Field
                  label={t('inbox:To')}
                  name="To"
                  component={DateTimePicker}
                  handleOnSelect={handleOnSelect}
                />
              </div>
            </div>
            <div className="col-6">
              <Field
                label={t('inbox:Artist')}
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
                label={t('inbox:AssignedBy')}
                name="AssignedBy"
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                clearable={true}
                options={AssignedByFacets}
              />
            </div>
            <div className="col-6">
              <Field
                label={t('inbox:Section/Tag')}
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
