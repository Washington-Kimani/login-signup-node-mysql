const inputField = document.getElementById('inputField');
const showIcon = document.getElementById('showIcon');
const hideIcon = document.getElementById('hideIcon');
const toogleIcon = () => {
    if (inputField.type === 'password') {
        inputField.type = 'text';
        showIcon.style.display = 'none';
        hideIcon.style.display = 'block';
    } else {
        inputField.type = 'password';
        hideIcon.style.display = 'none';
        showIcon.style.display = 'block';
    }
};