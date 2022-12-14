function getElement(elemVal) {
    /* 단일 요소 가져오는 함수 */

    return document.querySelector(elemVal);
}

function getElements(val) {
    /* 다중 요소 가져오는 함수 */

    return document.querySelectorAll(val)
}

function makeElementOff(...args) {
    /* 요소 off 처리 함수 */

    args.map((element) => {
        if (!element.classList.contains('off')) {
            element.classList.add('off')
        }
    });
}

function makeElementOn(...args) {
    /* 요소 off 제거 함수 */

    args.map((element) => {
        if (element.classList.contains('off')) {
            element.classList.remove('off')
        }
    });
}
function removeElement(...args) {
    /* 요소 제거 함수 */

    args.map((element) => {
        element.remove()
    });
}

function createNode(tag) {
    /* tag를 생성하는 함수 */

    return document.createElement(tag);
}

function appendTag(parent, element) {
    /* parent tag에 child tag를 추가하는 함수 */

    return parent.appendChild(element);
}

function insertAfter(element, referenceElement) {
    /* 요소 다음에 추가하는 함수 */

    referenceElement.parentElement.insertBefore(element, referenceElement.nextSibling);
}

function removeAllNode(element) {
    /* 요소의 내부 요소 초기화 */

    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function getCookie(name) {
    /* 이름값의 cookie 값 가져오기 */

    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {

        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function setFetchData(method, body){
    /* Fetch data 셋팅 */

    let csrftoken   = getCookie('csrftoken');

    const data = {
        method: method,
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken' : csrftoken,        
        },
        body: JSON.stringify(body)
    }

    return data
}

function redirectLogin(response) {
    /* Server에서 200외의 상태값을 받았을 경우 login페이지로 이동하는 함수 
        - fetch 함수 사용시 response에 아래와 같이 사용
        - ex : .then(response => redirectLogin(response))
    */
    return response.status == 200 ? response.json() : location.href = '/login'
}

export {
    getElement,
    getElements,
    makeElementOff,
    makeElementOn, 
    removeElement,
    createNode, 
    appendTag,
    insertAfter,
    removeAllNode,
    getCookie, 
    setFetchData,
    redirectLogin,
};