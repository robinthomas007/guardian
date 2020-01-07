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

export const isValidIsrc = (isrc) => {
    return((isrc.replace(/\W/g, '').length === 12) ? true : false);
};

export const isValidTitle = (title) => {
    return((title.length > 0) ? true : false);
};

export const isValidEmail = (email) => {
    return ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,64})+$/.test(email) )
};

export const convertToLocaleTime = (dateString) => {

    const utcDate = new Date(dateString);
          utcDate.setSeconds(0,0);
    const localTime = utcDate.toLocaleString();
        
    let dateArr = localTime.split(' ')
    let date = dateArr[0].replace(',', '')
    let timeArr =  dateArr[1].split(':')
    let amPm = (dateArr[2]) ? dateArr[2] : ''
    let dateStr = date + ' ' + timeArr[0] + ':' + timeArr[1] + ' ' + amPm

    return (dateStr)
};

export const formatDateToYYYYMMDD = (unFormattedDate) => {
    if(unFormattedDate) {
        var d = new Date(unFormattedDate.replace(/-/g, '\/')),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate()),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    }
    return([year, month, day].join('-'))
};

export const convertUTC = (date) => {
    let newDate = new Date(date)
        newDate.setHours(23,59,59);	
        newDate.setDate(newDate.getDate() + 1)
    newDate = newDate.toISOString().replace('Z', '')
    return(newDate)
}

export const resetDatePicker = (inputID) => {
    //because datepickers don't have a simple way to reset
    const projectReleaseDatePicker = document.getElementById(inputID);
    if(projectReleaseDatePicker) {
        projectReleaseDatePicker.value = '';
    }
};

export const resetDatePickerByObj = (inputObj) => {
    //because datepickers don't have a simple way to reset

    if(inputObj) {
        let isDisabled = inputObj.disabled;
        inputObj.disabled = false;
        inputObj.value = null;
        inputObj.disabled = isDisabled;
    }
};
