export const isFormValid = () => {
    let requiredInputs = document.getElementsByClassName('requiredInput');
    let invalid = false;

    for(var i=0; i<requiredInputs.length; i++) {
        let input = requiredInputs[i];

        if(input.value.length <= 0) {
            input.className = input.className.replace('is-invalid', '') + ' is-invalid';
            invalid = false;
        } else {
            input.className.replace('is-invalid', '');
            invalid = true;
        }
    }

    return(invalid)
}