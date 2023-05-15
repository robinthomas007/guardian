import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import Dropdown from '../../common/DropdownSelect';
import multiSelect from '../../common/multiSelect';
import DateTimePicker from '../../common/DateTimePicker';
import _ from 'lodash';
import { formatSelectArray } from '../../common/commonHelper';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import i18n from './../../../i18n';
import MultiSelectHierarchy from '../../common/multiSelectHierarchy';

const selectedFilter = [
  { name: 'labelIds', label: i18n.t('search:Labels') },
  { name: 'hasAudio', label: i18n.t('search:HasAudio') },
  { name: 'hasRights', label: i18n.t('search:HasRights') },
  { name: 'statusID', label: i18n.t('search:Status') },
  { name: 'hasBlocking', label: i18n.t('search:HasBlocking') },
  { name: 'from', label: i18n.t('search:UpdatedFrom') },
  { name: 'to', label: i18n.t('search:UpdatedTo') },
  { name: 'releaseFrom', label: i18n.t('search:ReleaseFrom') },
  { name: 'releaseTo', label: i18n.t('search:ReleaseTo') },
  { name: 'excludeLabelIds', label: i18n.t('search:ExcludeLabels') },
];

const Filter = props => {
  useEffect(() => {}, []);
  const { t } = useTranslation();

  const values = props.formValues && props.formValues.values;

  const deleteSelected = (val, name) => {
    let newVal = _.cloneDeep(values);
    if (name === 'labelIds') {
      let arr = _.filter(newVal.labelIds, function(e) {
        return !_.isEqual(e, val);
      });
      newVal[name] = _.cloneDeep(arr);
    } else if (name === 'excludeLabelIds') {
      let arr = _.filter(newVal.excludeLabelIds, function(e) {
        return !_.isEqual(e, val);
      });
      newVal[name] = _.cloneDeep(arr);
    } else {
      newVal[name] = null;
    }
    const searchData = {
      itemsPerPage: props.searchCriteria.itemsPerPage,
      pageNumber: props.searchCriteria.pageNumber,
      searchTerm: '',
      filter: props.getSearchCriteria(_.cloneDeep(newVal)),
    };
    props.handleProjectSearch({ searchCriteria: searchData });
    props.initialize(newVal);
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
      } else if (
        values[item.name] &&
        (item.name !== 'labelIds' && item.name !== 'excludeLabelIds')
      ) {
        return (
          <span>
            <label>{item.label}:</label>
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              onClick={() => deleteSelected(values[item.name], item.name)}
            >
              {values[item.name].label
                ? values[item.name].label
                : moment(values[item.name]).format('YYYY-MM-DD')}
              <i class="material-icons">close</i>
            </button>
          </span>
        );
      }
    });
    return (
      <div class="selected-filters row d-flex flex-nowrap no-gutters">
        <div class="col-auto"> {i18n.t('search:SelectedFilters')}:</div>
        <div class="col-10">{data}</div>
      </div>
    );
  };

  const handleOnSelect = (data, name) => {
    let values = _.cloneDeep(_.get(props, 'formValues.values', {}));
    const obj = {};
    obj[name] = data;
    props.formValues && props.saveFilters({ ...props.formValues.values, ...obj });
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
        if (key === 'releaseFrom') {
          values[key] = props.getFromDate(item);
        }
        if (key === 'releaseTo') {
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

  const getMultiSelectDataForLabelIds = data => {
    if (props.formValues) {
      props.initialize({ ...props.formValues.values, ...{ labelIds: data } });
    }
    handleOnSelect(data, 'labelIds');
  };

  const getMultiSelectDataForExcludeLabelIds = data => {
    if (props.formValues) {
      props.initialize({ ...props.formValues.values, ...{ excludeLabelIds: data } });
    }
    handleOnSelect(data, 'excludeLabelIds');
  };
  // excludeLabelIds
  const LabelFacets = formatSelectArray(_.get(props, 'data.LabelFacets', []));
  const StatusFacets = formatSelectArray(_.get(props, 'data.StatusFacets', []));
  const HasAudioFacets = formatSelectArray(_.get(props, 'data.HasAudioFacets', []));
  const HasBlockingFacets = formatSelectArray(_.get(props, 'data.HasBlockingFacets', []));
  const HasRightsFacets = formatSelectArray(_.get(props, 'data.HasRightsFacets', []));
  return (
    <div>
      <div className="search-filters find-project-filter collapse" id="collapsePanel">
        <div className="card card-body">
          <h5>{t('search:SearchFilters')}</h5>
          <br />
          <div className="row no-gutters">
            <div className="col-5">
              <div className="row no-gutters">
                <div className="col-4">
                  <label>{t('search:ByLabel')}</label>
                </div>
                <div className="col-6">
                  <MultiSelectHierarchy
                    handleChangeCheckbox={getMultiSelectDataForLabelIds}
                    isAdmin={props.userData.IsAdmin}
                    isMultiSelect={props.userData.IsAdmin ? true : false}
                    type={'filterModal'}
                    releasingLabels={props.data.LabelFacets}
                    selectedLabelIds={[]}
                  />
                </div>
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <Field
                label={t('search:ByStatus')}
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
                label={t('search:HasAudio')}
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
                label={t('search:HasBlocking')}
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
                label={t('search:HasRights')}
                name="hasRights"
                clearable={true}
                handleOnSelect={handleOnSelect}
                component={Dropdown}
                options={HasRightsFacets}
              />
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <div className="row no-gutters">
                <div className="col-4">
                  <label>{t('search:excludeLabel')}</label>
                </div>
                <div className="col-6">
                  <MultiSelectHierarchy
                    handleChangeCheckbox={getMultiSelectDataForExcludeLabelIds}
                    isAdmin={props.userData.IsAdmin}
                    isMultiSelect={props.userData.IsAdmin ? true : false}
                    type={'filterModal'}
                    releasingLabels={props.data.LabelFacets}
                    selectedLabelIds={[]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-10 last-up-date">
              <Field
                label={t('search:LastUpdated')}
                name="from"
                handleOnSelect={handleOnSelect}
                component={DateTimePicker}
              />
              <Field
                label={t('search:to')}
                name="to"
                handleOnSelect={handleOnSelect}
                component={DateTimePicker}
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-10 last-up-date">
              <Field
                label={t('search:ReleaseDate')}
                name="releaseFrom"
                handleOnSelect={handleOnSelect}
                component={DateTimePicker}
              />
              <Field
                label={t('search:to')}
                name="releaseTo"
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
