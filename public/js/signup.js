const signUpHandler = async (e) => {
    e.preventDefault();
    const user_name = $('#userNameSignUp').val().trim();
    const password = $('#passwordSignUp').val().trim();
    const firstName = $('#firstName').val().trim();
    const lastName = $('#lastName').val().trim();
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

    if (firstName == "") {
        $('#firstName').attr("style", "border-color: red;")
        $('#firstName').attr("placeholder", "Please enter your first name.")
    }

    if (lastName == "") {
        $('#lastName').attr("style", "border-color: red;")
        $('#lastName').attr("placeholder", "Please enter your last name.")
    }

    if (user_name && password && firstName && lastName) {  //MIGHT NEED TO CHANGE THIS PART
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ user_name, password, firstName, lastName, title, picture, company, experience, education, skills }),
            headers: { 'Content-Type': 'application/json' },
        });

        const signData = await response.json();
        if (response.status === 400 || response.status === 404) {
            return alert(signData.message)
        }
        if (response.ok) {
            //replaces current page with home page
            document.location.replace('/');
        } else {
            return alert('Username already exist in our database. Try another Username.')
        }
    }
};

$('#signup-btn').click(signUpHandler);