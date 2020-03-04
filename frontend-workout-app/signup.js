const signupForm = document.querySelector('#signup-form')
const usersURL = 'http://localhost:4000/users'
const loginURL = 'http://localhost:3000/index.html'

signupForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(signupForm)
    const username = formData.get('username')
    const password = formData.get('password')
    fetch(usersURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(result => {
            if (result.user.id) {
                window.location = loginURL;
            }
            else {
                signupForm.reset()
                alert("Invalid username and/or password")   
            }
        })
})