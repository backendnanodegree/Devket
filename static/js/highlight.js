import {getElement, setFechData} from './common.js';


function highlighClickEvent() {
    const text = getElement('#root');
    let start;
    let end;
    
    const btn = getElement('.btn');
    let startX;
    let startY;
    let targetX;
 
    
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
    
        btn.style = `display:block; left: ${targetX}px; top: ${endY}px`
    })

    btn.addEventListener('click', () => {
        const selection = window.getSelection()
        let hightext = selection.toString()
        start = selection.anchorOffset
        end = selection.focusOffset
    
        if(selection){
            text.innerHTML = text.innerText.replace(selection, `<span class='select'>${selection}</span>`)
            console.log(text.innerHTML.indexOf(selection), text.innerHTML.lastIndexOf(selection))
            btn.style.display = 'none'
        }
    
        const data = setFechData('POST', {
            content_text : hightext,
            content_location: {start: start, end: end},
            site: 1
        })
    
        fetch('/api/highlights', data)        
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // highlightRetrieve()
            });
        })
}


function highlightRetrieve() {
    const text = getElement('#root');

    // setTimeout(() => {

        fetch('/api/highlights')
            .then((response) => response.json())  
            .then((data) => {
                data.forEach(({content_text}) => {
                    text.innerHTML = text.innerHTML.replace(content_text, `<span class='select'>${content_text}</span>`)
                });
            });

    // }, 1)

    
}

export {
    highlighClickEvent,
    highlightRetrieve
};



