const sideToggleButton = document.querySelector('.side-toggle-button')

sideToggleButton.addEventListener('click', ()=>{
    const sideArea = document.querySelector('.side-area')
    const content = document.querySelector('.content')
    if(!sideArea.classList.contains('on')){
        sideArea.classList.add('on')
        sideToggleButton.classList.add('on')
        content.classList.add('on')
    } else {
        sideArea.classList.remove('on')
        sideToggleButton.classList.remove('on')
        content.classList.remove('on')
    }

})
