const logout = async (event) => {
    event.preventDefault();
    const response = await fetch(' ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });


    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Uh-oh, something went wrong')
    }
};

$('#logout').click(logout);