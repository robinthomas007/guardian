import _ from 'lodash';
import moment from 'moment';
import i18n from './../../i18n';

export const formaterForSelect = data => ({
  label: data.name,
  value: data.id,
});

export const formatSelectArray = arr => _.map(arr, data => formaterForSelect(data));

export const getSearchCriteria = searchCriteria => {
  _.forOwn(searchCriteria, function(item, key) {
    if (!item) {
      searchCriteria[key] = '';
    }
    if (item && item.value) {
      searchCriteria[key] = item.value;
    } else {
      if (Array.isArray(item)) {
        searchCriteria[key] = _.map(item, 'value');
      }
      if (key === 'from') {
        searchCriteria[key] = getFromDate(item);
      }
      if (key === 'to') {
        searchCriteria[key] = getToDate(item);
      }
    }
  });

  delete searchCriteria['searchTerm'];

  return searchCriteria;
};

export const getToDate = (date, iso) => {
  if (!date) return '';
  // let toDate = new Date(date);
  // toDate.setHours(23, 59, 59);
  // toDate.setDate(toDate.getDate() + 1);
  // if (iso) {
  //   toDate = moment(toDate).format('YYYY-MM-DD');
  //   toDate = `${toDate}T00:00:00.000Z`;
  // } else {
  //   toDate = toDate.toISOString().replace('Z', '');
  // }
  // return toDate;
  return moment(date)
    .format('YYYY-MM-DD')
    .toString();
};

export const getFromDate = (date, iso) => {
  if (!date) return '';
  // let fromDate = new Date(date);
  // if (iso) {
  //   fromDate = moment(fromDate).format('YYYY-MM-DD');
  //   fromDate = `${fromDate}T00:00:00.000Z`;
  // } else {
  //   fromDate = fromDate.toISOString().replace('Z', '');
  // }
  // return fromDate;
  return moment(date)
    .format('YYYY-MM-DD')
    .toString();
};

export const steps = [
  { value: 'Step 1 - Release Information', label: i18n.t('header:Step_1_ReleaseInformation') },
  { value: 'Step 2 - Contacts', label: i18n.t('header:Step_2_Contacts') },
  { value: 'Step 3 - Audio', label: i18n.t('header:Step_3_Audio') },
  { value: 'Step 4 - Tracks', label: i18n.t('header:Step_4_Tracks') },
  { value: 'Step 5 - Territorial Rights', label: i18n.t('header:Step_5_TerritorialRights') },
  { value: 'Step 6 - UGC Blocking', label: i18n.t('header:Step_6_UGCBlocking') },
  { value: 'Step 7 - Review', label: i18n.t('header:Step_7_Review') },
];

export const fomatDates = searchData => {
  if (searchData.filter) {
    if (searchData.filter.From) searchData.filter.From = getFromDate(searchData.filter.From, true);
    if (searchData.filter.To) searchData.filter.To = getToDate(searchData.filter.To, true);
  }
  return searchData;
};
