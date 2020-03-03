const loginForm = document.querySelector('#login_form')
const loginURL = 'http://localhost:4000/login'
const homeURL = 'http://localhost:3000/home.html'

loginForm.addEventListener('submit', () => {
    event.preventDefault()
    const formData = new FormData(loginForm)
    const username = formData.get('username')
    const password = formData.get('password')
    fetch(loginURL, {
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
            if (result.token) {window.location = homeURL;}
            else 
                {alert("Incorrect Username and/or Password")}
        
        })
    
    // window.location = homeURL
    loginForm.reset();
})

