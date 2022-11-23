import { createNode, appendTag, getElement, getCookie, getElements } from './common.js';

function makeModal() {
    /* modal 창 만들기 */

    const next                      = getElement('#__next')
    next.setAttribute('aria-hidden','true')

    const modalOverlay              = createNode('div')
    modalOverlay.className          = "ReactModal__Overlay ReactModal__Overlay--after-open o1ohlj7h animation-base"
    modalOverlay.setAttribute('display', 'none')
    appendTag(next, modalOverlay)

    const modalContent              = createNode('div')
    modalContent.className          = "ReactModal__Content ReactModal__Content--after-open m1gbisw7 animation-base animation-show off"
    modalContent.tabindex           = '-1'
    modalContent.role               = 'dialog'
    modalContent.setAttribute('aria-label', '항목 삭제')
    modalContent.setAttribute('aria-modal', 'true')
    appendTag(modalOverlay, modalContent)

    const btnContainer              = createNode('div')
    appendTag(modalContent, btnContainer)

    // modal 창 닫기 버튼
    const closeBtn                  = createNode('button')
    closeBtn.className              = 'close c16lr040'
    closeBtn.setAttribute('aria-label', '닫기')
    appendTag(btnContainer, closeBtn)

    const closeBtnIconContainer     = createNode('span')
    closeBtnIconContainer.className = 'i1qqph0t icon'
    appendTag(closeBtn, closeBtnIconContainer)

    let closeIconSvgHTML            = `<svg class='close-icon-svg' fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`
    closeBtnIconContainer.insertAdjacentHTML('beforeend', closeIconSvgHTML)
    const closeIconSvg              = getElement('.close-icon-svg')
    
    let iconPathHTML                = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z"></path>`
    closeIconSvg.insertAdjacentHTML('beforeend', iconPathHTML)

    // modal 창 header
    const modalHeader               = createNode('h6')
    modalHeader.className           = 'm1oixje6 bordered sticky'
    modalHeader.innerText           = '항목 삭제'
    modalHeader.setAttribute('data-cy', 'modal-header')
    appendTag(btnContainer, modalHeader)

    // delete 안내문 및 delete 버튼
    const confirmContainer          = createNode('div')
    appendTag(btnContainer, confirmContainer)

    const confirmTextContainer      = createNode('div')
    confirmTextContainer.className  = 'mweydr9'
    appendTag(confirmContainer, confirmTextContainer)

    const confirmText               = createNode('p')
    confirmText.innerText           = `이 항목을 삭제하겠습니까? 삭제한 항목은 복원할 수 없습니다.`
    appendTag(confirmTextContainer, confirmText)

    const deleteBtnContainer        = createNode('div')
    deleteBtnContainer.className    = 'm11mcrga bordered sticky'
    appendTag(btnContainer, deleteBtnContainer)

    const deleteButton              = createNode('button')
    deleteButton.className          = 'b18soqoe primary normal'
    deleteButton.type               = 'submit'
    deleteButton.innerText          = '삭제'
    deleteButton.setAttribute('data-cy' ,'delete-confirm')
    appendTag(deleteBtnContainer, deleteButton)

    // Modal 창 닫기
    closeBtn.addEventListener('click', () => {
        closeModal()
    })

    // modal 창 삭제 버튼 클릭 시, 삭제 실행 및 modal 창 닫기 
    deleteButton.addEventListener('click', () => {
        
        // 삭제 실행
        deleteSite()

        // Modal 창 닫기
        closeModal()

        // 항목 전체 다시 조회
        window.location.reload()
        
    })

}

function openModal() {
    /* 하단 툴바의 삭제 버튼 클릭으로 modal 창 open */
    const body              = getElement('body');
    const modalOverlay      = getElement('.o1ohlj7h')
    const hidModal          = getElement('.m1gbisw7')

    modalOverlay.classList.add('animation-show');
    body.classList.add('modal-open')
    hidModal.classList.toggle('off')
}   

function closeModal() {
    /* Modal 창 닫기 */

    const body                  = getElement('body');
    const articles              = getElements('article')
    const modalOverlay          = getElement('.o1ohlj7h')
    const hidModal              = getElement('.m1gbisw7')

    modalOverlay.classList.remove('animation-show');
    body.classList.remove('modal-open')
    hidModal.classList.toggle('off')       

    articles.forEach((element) => {
        element.classList.remove('selected')
    })
}

function deleteSite() {
    /* DELETE http message를 보내는 함수 */

    const site = getElement('.c18o9ext.grid.hiddenActions.noExcerpt.selected')
    const csrftoken             = getCookie('csrftoken');
    const data                  = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken' : csrftoken,  
        },
    }
    
    fetch(`/api/sites/${site.id}`, data)
    .then(response => {
        const status             = response.status
        
        if (status === 200) {
            console.log('삭제 완료했습니다.')
        } else if (status === 404) {
            console.log('해당 항목이 존재하지 않습니다.')
        } return response.json() 
    })
    .catch(error => console.log('Error:', error))
}


export {
    makeModal,
    openModal,
}