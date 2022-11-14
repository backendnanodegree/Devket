// csrf
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




const text = document.querySelector('#text');
const textInnerText = text.innerText;
let selectText;
let start;
let end;

const btn = document.querySelector('.btn');
let startX;
let startY;
let targetX;
let targetY;

text.addEventListener('mousedown', (e) => {
    console.log('startX - ', e.clientX, 'startY - ', e.clientY)
    startX = e.clientX
    startY = e.clientY
})

text.addEventListener('mouseup', (e) => {
    console.log('endX - ', e.clientX, 'endY - ', e.clientY)
    let endX = e.clientX
    let endY = e.clientY

    targetX = (startX + endX) / 2;

    btn.style.cssText = `display:block; left: ${targetX}px; top: ${endY}px`

})




btn.addEventListener('click', () => {
    const selection = window.getSelection()
    start = selection.anchorOffset
    end = selection.focusOffset
    hightext = selection.toString()

    if(selection){
        text.innerHTML = text.innerText.replace(selection, `<span class='select'>${selection}</span>`)
        btn.style.display = 'none'
    }

    fetch('http://127.0.0.1:8000/api/testo/', {
        method: "POST",
        headers: {
            'X-CSRFToken' : csrftoken,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({

            content_text : hightext,
            content_location: {start: start, end: end},
            list: 1
            
          }),
    
    }).then((response) => response.json()).then((data) => console.log(data));
})



// csrf
const csrftoken = getCookie('csrftoken');
console.log(csrftoken)

// url


// 서버로 api 호출
