import {getElement, setFetchData} from './common.js';

const loginBtn = getElement('.login-btn-email')

// 로그인 등록 버튼
loginBtn.addEventListener('click', login)

// 로그인 이벤트
async function login() {
    // email, password, password
    let email            = getElement('#login_email').value
    let password         = getElement('#login_password').value

    const data = setFetchData("post", {
        email : email,
        password : password,
    })

    const login_response = await fetch('/api/login', data)

    if(login_response.status == 200) 
        location.href = '/mylist'  
}