import {getElement} from './common.js';

const sideToggleButton = getElement('.side-toggle-button')

sideToggleButton.addEventListener('click', ()=>{
    const sideArea = getElement('.side-area')
    const content = getElement('.content')

    sideArea.classList.toggle('on')
    sideToggleButton.classList.toggle('on')
    content.classList.toggle('on')

})
