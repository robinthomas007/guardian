import React from 'react';
import moment from 'moment';
import { Slide, toast } from 'react-toastify';
import i18n from './../i18n';
import { ProgressBar } from 'react-bootstrap';

export function isDuplicateItem(array, what) {
  return array.filter(item => item !== '' && item === what).length > 1;
}

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
  return isrc.length === 0 || isrc.match(/^[a-zA-Z]{2}[a-zA-Z0-9]{3}[0-9]{7}$/) ? true : false;
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
    if (
      moment(projectData.Project.projectReleaseDate).format('YYYY-MM-DD') <=
      moment(user.UtcDateTime).format('YYYY-MM-DD')
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

export function isDuplicateISRC() {
  let isDuplicate = false;
  let trackIsrc = document.getElementsByClassName('trackIsrcField');
  let isrcValues = [];
  for (let i = 0; i < trackIsrc.length; i++) {
    const title = trackIsrc[i].value;
    if (title && isrcValues.includes(title)) {
      isDuplicate = true;
      break;
    } else {
      isrcValues.push(title);
    }
  }
  return isDuplicate;
}

export function isDuplicateTrackTitle() {
  let trackTitles = document.getElementsByClassName('trackTitleField');
  let titleValues = [];
  let isDuplicate = false;

  for (let i = 0; i < trackTitles.length; i++) {
    let title = trackTitles[i].value;
    title = title.toUpperCase();
    if (title && titleValues.includes(title)) {
      isDuplicate = true;
      break;
    } else {
      titleValues.push(title);
    }
  }

  let trackIsrc = document.getElementsByClassName('trackIsrcField');
  let isrcValues = [];
  for (let i = 0; i < trackIsrc.length; i++) {
    const title = trackIsrc[i].value;
    if (title && title.length === 12 && isrcValues.includes(title)) {
      isDuplicate = true;
      break;
    } else {
      isrcValues.push(title);
    }
  }
  return isDuplicate;
}

const renderIcon = type => {
  switch (type) {
    case 'success':
      return <i className="material-icons icon-big"> done</i>;
    case 'error':
      return <i className="material-icons icon-big">error</i>;
    case 'warning':
      return <i className="material-icons icon-big"> info</i>;
    case 'info':
      return <i className="material-icons icon-big"> info</i>;
    case 'uploading':
      return <i className="material-icons icon-big icon-spin"> sync</i>;
    default:
      break;
  }
};

export const renderMessage = (message, type, customHeading, progress) => {
  const variant = type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info';
  return (
    <div className={`custom-notification custom-noti-${type}`}>
      <i className="material-icons icon-close"> close</i>;{renderIcon(type)}
      <div>
        <h4 className="heading">{customHeading ? customHeading : type}</h4>
      </div>
      <p className="noti-content">{message}</p>
      {progress && (
        <ProgressBar striped variant={variant} animated now={progress} label={`${progress}%`} />
      )}
    </div>
  );
};

export function showNotyError(message, afterClose, id) {
  toast(renderMessage(message, 'error'), {
    onClose: afterClose,
    toastId: id,
    transition: Slide,
    position: 'top-right',
    className: 'auto-error',
  });
}

export function showNotyMaskWarning(message, afterClose, id) {
  toast(renderMessage(message, 'error', 'Project Masked'), {
    onClose: afterClose,
    toastId: id,
    transition: Slide,
    position: 'top-center',
    className: 'auto-error',
  });
}

export function showNotyAutoError(message, afterClose, id) {
  toast(renderMessage(message, 'error'), {
    autoClose: 4000,
    onClose: afterClose,
    toastId: id,
    transition: Slide,
    position: 'top-right',
    className: 'auto-error',
  });
}

export function showNotyWarning(message, afterClose) {
  toast.warn(renderMessage(message, 'warning'), {
    autoClose: 4000,
    onClose: afterClose,
    transition: Slide,
    position: 'top-right',
    className: 'auto-warning',
  });
}

export function showNotyInfo(message, afterClose, id) {
  toast(renderMessage(message, 'info'), {
    autoClose: 4000,
    onClose: afterClose,
    toastId: id,
    transition: Slide,
    position: 'top-right',
    className: 'auto-info',
  });
}

export function showNotySucess(message, afterClose, id) {
  toast(renderMessage(message, 'success'), {
    autoClose: 4000,
    onClose: afterClose,
    toastId: id,
    transition: Slide,
    position: 'top-right',
    className: 'auto-success',
  });
}

export const CustomInput = props => {
  return (
    <div className="custom-date-picker">
      <input
        onClick={props.onClick}
        className={props.adClass}
        tabIndex={props.tabIndex}
        value={props.value}
        type="text"
        readOnly={props.isreadOnly}
        disabled={props.isreadOnly}
      />
      {!props.value && (
        <i
          onClick={!props.isreadOnly && props.onClick}
          className={
            props.isreadOnly ? 'disabled material-icons calendar' : 'material-icons calendar'
          }
          aria-hidden="true"
        >
          date_range
        </i>
      )}
      <div className="invalid-tooltip">Release Date is Required if not TBD</div>
    </div>
  );
};

export const getAlias = name => {
  if (name) {
    const nameArr = name.split(' ');
    if (nameArr.length > 1) {
      return nameArr[0].charAt().toUpperCase() + nameArr[1].charAt().toUpperCase();
    } else if (nameArr.length === 1) {
      return nameArr[0].charAt().toUpperCase() + nameArr[0].charAt(1).toUpperCase();
    }
    return name.charAt().toUpperCase() + nameArr.charAt(1).toUpperCase();
  }
  return 'UK';
};

export const renameFile = (originalFile, newName) => {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
};

export function getCookie(name) {
  var b = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export const deleteCookie = function(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.umusic.net';
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.umusic.net';
  document.cookie = 'guardian_auth=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.umusic.com';
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const LOGOUT_URL =
  'https://umgb2cnonprod.b2clogin.com/umgb2cnonprod.onmicrosoft.com/B2C_1A_LIMITEDWITHMFASIGNUPSIGNINGUARDIAN/oauth2/v2.0/logout';

export const Duration = [
  { value: '', text: i18n.t('blocking:selectOne'), selected: true },
  { value: '> 30 sec', text: '> 30 sec', selected: false },
  { value: '> 1:00', text: '> 1:00', selected: false },
  { value: '> 1:30', text: '> 1:30', selected: false },
  { value: '> 2:00', text: '> 2:00', selected: false },
  { value: '> 2:30', text: '> 2:30', selected: false },
];

export const getProjectReview = fetchBody => {
  const fetchHeaders = new Headers({
    'Content-Type': 'application/json',
    Authorization: sessionStorage.getItem('accessToken'),
  });
  return fetch(window.env.api.url + '/project/review', {
    method: 'POST',
    headers: fetchHeaders,
    body: fetchBody,
  }).then(response => {
    return response.json();
  });
};

export const getPlatforms = () => {
  return [
    {
      platformName: 'YouTube',
      block: false,
      duration: '',
      expirationDate: '',
    },
    {
      platformName: 'SoundCloud',
      block: false,
      duration: '',
      expirationDate: '',
    },
    {
      platformName: 'Facebook',
      block: false,
      duration: '',
      expirationDate: '',
    },
    {
      platformName: 'Instagram',
      block: false,
      duration: '',
      expirationDate: '',
    },
    {
      platformName: 'Tiktok',
      block: false,
      duration: '',
      expirationDate: '',
    },
  ];
};

export const getVideoPlatforms = () => {
  return [
    {
      platformName: 'YouTube',
      block: false,
      duration: '',
      expirationDate: '',
    },
    {
      platformName: 'Facebook',
      block: false,
      duration: '',
      expirationDate: '',
    },
    {
      platformName: 'Instagram',
      block: false,
      duration: '',
      expirationDate: '',
    },
  ];
};

export function checkEmpty(obj) {
  for (let key in obj) {
    if (obj[key] instanceof Object === true) {
      if (checkEmpty(obj[key]) === false) return false;
    } else {
      if (obj[key].length !== 0) return false;
    }
  }
  return true;
}

export const NO_LABEL_ID = '-2';

export const formatProjectTitleToMasked = (isMasked, projectTitle) => {
  return isMasked ? `${projectTitle}(Masked)` : projectTitle;
};

export const formatDiscData = discs => {
  const trackLabel = discs[0].Tracks ? 'Tracks' : 'ExTracks';
  return discs.map(disc => {
    return {
      discNumber: disc.discNumber,
      Tracks: disc[trackLabel].map(track => {
        return {
          trackTitle: track.trackTitle,
          isrc: track.isrc,
          artist: track.artist,
        };
      }),
    };
  });
};

export const compareJson = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
