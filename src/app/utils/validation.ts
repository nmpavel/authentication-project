export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const passwordStrengthChecker = (password: string) => {
    const strengthObj = {
        strength: 0,
        color: '',
        status: '',
        text: ''
    }
    if (password.match(/[a-z]+/)) strengthObj.strength += 15;
    if (password.match(/[A-Z]+/)) strengthObj.strength += 15;
    if (password.match(/[0-9]+/)) strengthObj.strength += 15;
    if (password.match(/[$@#&!]+/)) strengthObj.strength += 15;
    if (password.length >= 8 && password.length < 10) strengthObj.strength += 20;
    if (password.length >= 10) strengthObj.strength += 40;

    if (strengthObj.strength > 0 && strengthObj.strength < 50) {
        strengthObj.color = 'bg-danger';
        strengthObj.text = 'Your password is weak';
        strengthObj.status = 'Weak';
    } else if (strengthObj.strength >= 50 && strengthObj.strength < 80) {
        strengthObj.color = 'bg-warning';
        strengthObj.text = 'Your password is medium.'
        strengthObj.status = 'Medium';
    } else if (strengthObj.strength >= 80) {
        strengthObj.color = 'bg-success';
        strengthObj.text = 'Your password is strong. Nice work!'
        strengthObj.status = 'Strong';
    }

    return strengthObj
}