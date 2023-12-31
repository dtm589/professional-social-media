const signUpHandler = async (e) => {
    e.preventDefault();
    const user_name = $('#userNameSignUp').val().trim();
    const password = $('#passwordSignUp').val().trim();
    const firstName = $('#firstName').val().trim();
    const lastName = $('#lastName').val().trim();
    const location = $('#location').val().trim();
    const title = $('#title').val().trim();
    const picture = $('#pic').val().trim();
    const company = $('#company').val().trim();
    const experience = $('#experience').val().trim();
    const education = $('#education').val().trim();
    const skills = $('#skills').val().trim();

    if (user_name == "") {
        $('#userNameSignUp').attr("style", "border-color: red;")
        $('#userNameSignUp').attr("placeholder", "Please enter a username.")
    }

    if (password.length < 8) {
        $('#passwordSignUp').attr("style", "border-color: red;")
        $('#passwordSignUp').attr("placeholder", "Please enter a valid password.")
        return;
    }

    if (location == "") {
        $('#location').attr("style", "border-color: red;")
        $('#location').attr("placeholder", "Please enter your city.")
    }

    if (firstName == "") {
        $('#firstName').attr("style", "border-color: red;")
        $('#firstName').attr("placeholder", "Please enter your first name.")
    }

    if (lastName == "") {
        $('#lastName').attr("style", "border-color: red;")
        $('#lastName').attr("placeholder", "Please enter your last name.")
    }

    if (user_name && password && firstName && lastName && location) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ user_name, password, firstName, lastName, location, title, picture, company, experience, education, skills }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
            //replaces current page with home page
        } else {
            return alert('Failed to sign up.')
        }
    }
};

$('#signup-btn').click(signUpHandler);