import { getElement } from "./common.js";

const profile = getElement('.profile')

profile.addEventListener('click', logout)

async function logout() {
    const logout_response = await fetch('/api/logout')

    if(logout_response.status == 200) 
        location.href = '/home'
}