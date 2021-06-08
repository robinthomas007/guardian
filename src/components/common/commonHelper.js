import _ from 'lodash';

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

export const getToDate = date => {
  if (!date) return '';
  let toDate = new Date(date);
  toDate.setHours(23, 59, 59);
  toDate.setDate(toDate.getDate() + 1);
  toDate = toDate.toISOString().replace('Z', '');
  return toDate;
};

export const getFromDate = date => {
  if (!date) return '';
  let toDate = new Date(date);
  toDate.setHours(0, 0, 1);

  toDate = toDate.toISOString().replace('Z', '');
  return toDate;
};

export const steps = [
  { value: 'Release Information', label: 'Release Information' },
  { value: 'Contacts', label: 'Contacts' },
  { value: 'Audio', label: 'Audio' },
  { value: 'Tracks', label: 'Tracks' },
  { value: 'Territorial Rights', label: 'Territorial Rights' },
  { value: 'UGC Blocking', label: 'UGC Blocking' },
  { value: 'Review', label: 'Review' },
];
