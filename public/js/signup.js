async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/signup');
        } else {
            alert('Failed to sign-up');
        }
    }
}

const submitBtn = document.querySelector("#submitbtn");
document   
    .querySelector('signup-form');
    submitBtn.addEventListener('submit', signupFormHandler);