import {getElement, setFetchData} from './common.js';

const signUpBtn = getElement('.signup-btn-form')

// 회원가입 등록 버튼
signUpBtn.addEventListener('click', signUp)

// 회원가입 등록 이벤트
async function signUp() {
    // email, password, password
    let email            = getElement('#signup_email').value
    let password         = getElement('#signup_password').value

    const data = setFetchData("post", {
        email : email,
        password : password,
    })

    const signup_response = await fetch('/api/signup', data)

    if(signup_response.status == 200) {
        alert('회원 가입이 성공적으로 완료 되었습니다.')
        location.href = '/login'
    }
}