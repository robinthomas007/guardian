export const isFormValid = () => {
    let requiredInputs = document.getElementsByClassName('requiredInput');
    let invalid = false;

    for(var i=0; i<requiredInputs.length; i++) {
        let input = requiredInputs[i];
        if(input.value.length <= 0) {
            setInputValidStatus(input, 'invalid');
            invalid = false;
        } else if (input.type === 'email') {
            if(isValidEmail(input.value)) {
                setInputValidStatus(input, 'valid');
                invalid = false;
            } else {
                setInputValidStatus(input, 'invalid');
                invalid = true;
            }
        } else {
            setInputValidStatus(input, 'valid');
            invalid = true;
        }
    }

    return(invalid)
}

export const setInputValidStatus = (input, status) => {
    if(status === 'invalid') {
        input.className = input.className.replace('is-invalid', '') + ' is-invalid';
    } else {
        input.className.replace('is-invalid', '');
    }
}

export const isValidIsrc = (isrc) => {
    return((isrc.replace(/\W/g, '').length == 12) ? true : false);
}

export const isValidTitle = (title) => {
    return((title.length > 0) ? true : false);
}

export const isValidEmail = (email) => {
    return ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,64})+$/.test(email) )
}

export const formatDateToYYYYMMDD = (unFormattedDate) => {
    let formattedDate = '';
    if(unFormattedDate) {
        var d = new Date(unFormattedDate),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        formattedDate = [year, month, day].join('-');
    }
    return(formattedDate)
}