const loginBtn = document.getElementById('login-button')
const loginModal = document.getElementById('modal-login')
const loginCancleBtn = document.getElementById('login-close')

loginBtn.addEventListener('click', (e) => {
    loginModal.style.display = 'block'
})

loginCancleBtn.addEventListener('click', (e) => {
    loginModal.style.display = 'none'
})