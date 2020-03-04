const logout = document.querySelector('.logout')
const indexURL = 'http://localhost:3000/index.html'

logout.addEventListener('click', event => {
    event.preventDefault()
    window.location = indexURL
})