import Noty from 'noty';
import React from 'react';

export const isFormValid = () => {
  let requiredInputs = document.getElementsByClassName('requiredInput');

  return Array.prototype.map
    .call(requiredInputs, input => {
      if (input.value.length <= 0) {
        setInputValidStatus(input, 'invalid');
        return false;
      } else if (input.type === 'email') {
        if (isValidEmail(input.value)) {
          setInputValidStatus(input, 'valid');
          return true;
        } else {
          setInputValidStatus(input, 'invalid');
          return false;
        }
      } else {
        setInputValidStatus(input, 'valid');
        return true;
      }
    })
    .every(isValid => isValid === true); // Check if all fields are valid
};

export const setInputValidStatus = (input, status) => {
  if (status === 'invalid') {
    input.className = input.className.replace('is-invalid', '') + ' is-invalid';
  } else {
    input.className = input.className.replace('is-invalid', '');
  }
};

export const isValidIsrc = isrc => {
  return isrc.replace(/\W/g, '').length === 12 ? true : false;
};

export const isValidTitle = title => {
  return title.length > 0 ? true : false;
};

export const isValidEmail = email => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,64})+$/.test(email);
};

export const convertToLocaleTime = dateString => {
  const utcDate = new Date(dateString);
  utcDate.setSeconds(0, 0);
  const localTime = utcDate.toISOString();

  let dateArr = localTime.split('T');
  let date = dateArr[0].replace(',', '');
  let timeArr = dateArr[1].split(':');
  let amPm = dateArr[2] ? dateArr[2] : '';
  let dateStr = date + ' ' + timeArr[0] + ':' + timeArr[1] + ' ' + amPm;
  return dateStr;
};

export const formatDateToYYYYMMDD = unFormattedDate => {
  if (unFormattedDate) {
    var d = new Date(unFormattedDate.replace(/-/g, '/')),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  }
  return [year, month, day].join('-');
};

export const formatDateToDDMMYYYY = unFormattedDate => {
  if (unFormattedDate) {
    var d = new Date(unFormattedDate.replace(/-/g, '/')),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  }
  return [day, month, year].join('/');
};

export const convertUTC = date => {
  let newDate = new Date(date);
  newDate.setHours(23, 59, 59);
  newDate.setDate(newDate.getDate() + 1);
  newDate = newDate.toISOString().replace('Z', '');
  return newDate;
};

export const resetDatePicker = inputID => {
  //because datepickers don't have a simple way to reset
  const projectReleaseDatePicker = document.getElementById(inputID);
  if (projectReleaseDatePicker) {
    projectReleaseDatePicker.value = '';
  }
};

export const resetDatePickerByObj = inputObj => {
  //because datepickers don't have a simple way to reset

  if (inputObj) {
    let isDisabled = inputObj.disabled;
    inputObj.disabled = false;
    inputObj.value = null;
    inputObj.disabled = isDisabled;
  }
};

export const isPreReleaseDate = projectData => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (user && projectData && projectData.Project && projectData.Project.projectReleaseDate) {
    const projectReleaseDate = parseInt(
      projectData.Project.projectReleaseDate
        ? new Date(projectData.Project.projectReleaseDate).getTime()
        : '',
    );
    const serverDate = parseInt(user.UtcDateTime ? new Date(user.UtcDateTime).getTime() : '');
    if (!Number.isNaN(projectReleaseDate)) {
      return projectReleaseDate > serverDate;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

export function isDuplicateTrackTitle() {
  let trackTitles = document.getElementsByClassName('trackTitleField');
  let titleValues = [];
  let isDuplicate = false;

  for (var i = 0; i < trackTitles.length; i++) {
    const title = trackTitles[i].value;
    if (title && titleValues.includes(title)) {
      isDuplicate = true;
      break;
    } else {
      titleValues.push(title);
    }
  }
  return isDuplicate;
}

export function showNotyError(message) {
  new Noty({
    type: 'error',
    text: message,
    theme: 'bootstrap-v4',
    layout: 'top',
    timeout: false,
    onClick: 'Noty.close();',
  }).show();
}

export const CustomInput = props => {
  return (
    <div className="custom-date-picker">
      <input onClick={props.onClick} value={props.value} type="text" readOnly={props.isreadOnly} />
      {!props.value && (
        <i onClick={props.onClick} aria-hidden="true" class="material-icons calendar">
          date_range
        </i>
      )}
    </div>
  );
};
