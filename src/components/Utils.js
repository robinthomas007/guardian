export const isFormValid = () => {
    let requiredInputs = document.getElementsByClassName('requiredInput');
    let invalid = false;

    for(var i=0; i<requiredInputs.length; i++) {
        let input = requiredInputs[i];

        if(input.value.length <= 0) {
            setInputValidStatus(input, 'invalid');
            invalid = false;
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