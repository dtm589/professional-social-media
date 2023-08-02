const loginHandler = async (e) => {
    e.preventDefault();
    const user_name = $('#userNameLogin').val().trim();
    const password = $('#passwordLogin').val().trim();

    if (user_name == "") {
        $('#userNameLogin').attr("style", "background-color: rgb(255, 245, 235); border-color: red; ")
        $('#userNameLogin').attr("placeholder", "Please enter a username")
    }

    if (password == "") {
        $('#passwordLogin').attr("style", "background-color: rgb(255, 245, 235); border-color: red; ")
        $('#passwordLogin').attr("placeholder", "Please enter a password")
    }

    //If username and password have been entered
    if (user_name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.status === 400 || response.status === 401) {
            return alert(data.message);
        }
        document.location.replace('/');
    }
}

$(document).ready(function () {
    // do this after dom is ready
    $('#login-btn').click(loginHandler);
});