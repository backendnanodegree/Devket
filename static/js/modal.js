import { createNode, appendTag, getElement, getCookie, getElements, removeElement } from './common.js';

function makeModal(param) {
    
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
    modalContent.setAttribute('aria-label', param['title'])
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
    modalHeader.innerText           = param['title']
    modalHeader.setAttribute('data-cy', 'modal-header')
    appendTag(btnContainer, modalHeader)

    // delete 안내문 및 delete 버튼
    const confirmContainer          = createNode('div')
    appendTag(btnContainer, confirmContainer)

    const confirmTextContainer      = createNode('div')
    confirmTextContainer.className  = 'mweydr9'
    appendTag(confirmContainer, confirmTextContainer)

    const confirmText               = createNode('p')
    confirmText.innerText           = param['alarm_txt']
    appendTag(confirmTextContainer, confirmText)

    const deleteBtnContainer        = createNode('div')
    deleteBtnContainer.className    = 'm11mcrga bordered sticky'
    appendTag(btnContainer, deleteBtnContainer)

    const eventButton              = createNode('button')
    eventButton.className          = 'b18soqoe primary normal'
    eventButton.type               = 'submit'
    eventButton.innerText          = param['buttonName']
    eventButton.setAttribute('data-cy' ,'delete-confirm')
    appendTag(deleteBtnContainer, eventButton)

    // Modal 창 닫기
    closeBtn.addEventListener('click', () => {
        closeModal(param['type'])
    })

    // Modal 창 버튼 클릭 시, event func 실행 및 modal 창 닫기 
    eventButton.addEventListener('click', () => {
        
        // 매개변수로 받은 함수 실행
        param['func'](param['args'])

        // Modal 창 닫기
        closeModal()

        // 항목 전체 다시 조회
        window.location.reload()
        
    })

}

function openModal(param) {
    /* Modal 창 열기 */

    makeModal(param);

    const body              = getElement('body');
    const modalOverlay      = getElement('.o1ohlj7h')
    const hidModal          = getElement('.m1gbisw7')

    modalOverlay.classList.add('animation-show');
    body.classList.add('modal-open')
    hidModal.classList.toggle('off')
}   

function closeModal(type='') {
    /* Modal 창 닫기 */

    const body                  = getElement('body');
    const articles              = getElements('article')
    const modalOverlay          = getElement('.o1ohlj7h')
    const hidModal              = getElement('.m1gbisw7')
    const modalPop              = getElement('.ReactModal__Overlay')

    if (modalPop != null)
        removeElement(modalPop)

    modalOverlay.classList.remove('animation-show');
    body.classList.remove('modal-open')
    hidModal.classList.toggle('off')       

    if(type == 'bottom') {
        articles.forEach((element) => {
            element.classList.remove('selected')
        })
    } 
}


export {
    makeModal,
    openModal,
}