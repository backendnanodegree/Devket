import { createNode, appendTag, insertAfter, getElement, getCookie, getElements, removeElement } from './common.js';

let added_tags =[] 

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

    const body              = getElement('body');
    const articles          = getElements('article')
    const modalOverlay      = getElement('.o1ohlj7h')
    const hidModal          = getElement('.m1gbisw7')
    const modalPop          = getElement('.ReactModal__Overlay')

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

function makeTagModal(param) {
    const next                      = getElement('#__next')
    next.setAttribute('aria-hidden','true')

    const modalOverlay              = createNode('div')
    modalOverlay.className          = 'ReactModal__Overlay ReactModal__Overlay--after-open o1ohlj7h animation-base'
    modalOverlay.setAttribute('display', 'none')
    appendTag(next, modalOverlay)

    const modalContent              = createNode('div')
    modalContent.className          = "ReactModal__Content ReactModal__Content--after-open m1gbisw7 animation-base animation-show off"
    modalContent.tabindex           = '-1'
    modalContent.role               = 'dialog'
    modalContent.setAttribute('aria-label', 'Add Tags')
    modalContent.setAttribute('aria-modal', 'true')
    appendTag(modalOverlay, modalContent)

    const btnContainer              = createNode('div')
    appendTag(modalContent, btnContainer)

    // modal 창 닫기 버튼
    const closeBtn                  = createNode('button')
    closeBtn.className              = 'close c16lr040'
    closeBtn.setAttribute('aria-label', '닫기')
    closeBtn.setAttribute('data-cy', 'close-modal-button')
    appendTag(btnContainer, closeBtn)

    const closeBtnIconContainer     = createNode('span')
    closeBtnIconContainer.className = 'i1qqph0t icon'
    appendTag(closeBtn, closeBtnIconContainer)

    let closeIconSvgHTML            = `<svg class='close-icon-svg' fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`
    closeBtnIconContainer.insertAdjacentHTML('beforeend', closeIconSvgHTML)
    const closeIconSvg              = getElement('.close-icon-svg')

    let iconPathHTML                = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z"></path>`
    closeIconSvg.insertAdjacentHTML('beforeend', iconPathHTML)

    const closeBtnText              = createNode('span')
    closeBtnText.className          = 'visually-hidden'
    closeBtnText.innerText          = 'Close'
    appendTag(closeBtn, closeBtnText)

    // modal 창 header
    const modalHeader               = createNode('h6')
    modalHeader.className           = 'm1oixje6 bordered sticky'
    modalHeader.innerText           = '태그 추가'
    modalHeader.setAttribute('data-cy', 'modal-header')
    appendTag(btnContainer, modalHeader)
    
    // Tag 입력 및  등록 버튼
    const tagInputContainer         = createNode('div')
    appendTag(btnContainer, tagInputContainer)

    const tagInputWrap              = createNode('div')
    tagInputWrap.className          = 'mweydr9 tagging'
    appendTag(tagInputContainer, tagInputWrap)

    const tagInputTagArea           = createNode('div')
    tagInputTagArea.className       = 'tchv94s'
    tagInputTagArea.onclick         = tagInputFocus
    appendTag(tagInputWrap, tagInputTagArea)

    const tagInputI1h0              = createNode('div')
    tagInputI1h0.className          = 'i1h0u21y'
    appendTag(tagInputTagArea, tagInputI1h0)

    const tagInputParent            = createNode('div')
    tagInputParent.className        = 'a157jxs6'
    tagInputParent.style            = 'display: inline-block;'
    appendTag(tagInputI1h0, tagInputParent)

    const tagInput                  = createNode('input')
    tagInput.className              = 'i18xvto0'
    tagInput.value                  = ''
    tagInput.style                  = 'box-sizing: content-box; width: 2px;'
    tagInput.enterkeyhint           = 'search'
    tagInput.setAttribute('maxlength', '30')
    appendTag(tagInputParent, tagInput)

    const tagArea                   = createNode('div')
    tagArea.style                   = 'position: absolute; top: 0px; left: 0px; visibility: hidden; height: 0px; overflow: scroll; white-space: pre; font-size: 16px; font-family: &quot;Graphik Web&quot;; font-weight: 400; font-style: normal; letter-spacing: normal; text-transform: none;'
    appendTag(tagInputParent, tagArea)

    const applyBtnContainer         = createNode('div')
    applyBtnContainer.className     = 'm11mcrga bordered'
    appendTag(tagInputContainer, applyBtnContainer)

    const eventButton               = createNode('button')
    eventButton.className           = 'b18soqoe primary normal disabled'
    eventButton.type                = 'button'
    eventButton.innerText           = '저장'
    eventButton.disabled            = ''
    eventButton.setAttribute('data-cy' ,'tagging-confirm')
    appendTag(applyBtnContainer, eventButton)

    // Modal 창 닫기
    closeBtn.addEventListener('click', () => {
        closeModal('bulk tag')
    })

    // Modal 창 버튼 클릭 시, event func 실행 및 modal 창 닫기 
    eventButton.addEventListener('click', () => {
        
        // 매개변수로 받은 함수 실행
        param['func']()

        // Modal 창 닫기
        closeModal()

        // 항목 전체 다시 조회
        window.location.reload()
    })

    // 포커싱이 dom생성보다 빠르기 때문에 setTimeout으로 딜레이 주기
    tagInputFocus()

    // input width event
    inputClickEvent()
}

function tagInputFocus(){
    const tagInput = getElement('.i18xvto0')

    setTimeout(() => {tagInput.focus(), 1})
}

function openTagModal(param) {
    /* Tag Modal 창 열기 */

    makeTagModal(param);

    const modalOverlay      = getElement('.o1ohlj7h')
    const hidModal          = getElement('.m1gbisw7')
    const body              = getElement('body');

    modalOverlay.classList.add('animation-show');
    hidModal.classList.toggle('off')
    body.classList.add('modal-open')
}  

function inputClickEvent() {
    /* Input 입력 시 width 조절  */

    const input         = getElement('.i18xvto0')
    const inputWidth    = 30
    const minWidthLimit = 2
    const maxWidthLimit = 300
    const minWidth      = 5
    const maxWidth      = 300

    input.addEventListener('keydown', (event) => {

        let tags = getElement('.tchv94s').querySelectorAll('.trxac13')
        
        if(tags.length > 0 && event.keyCode !== 8)
            tags[tags.length-1].classList.remove('selected')


        // 입력 값의 길이를 보고 width 조절
        input.style.width = input.value.length*inputWidth <  minWidthLimit   ? `${minWidth}px`
                          : input.value.length*inputWidth >= maxWidthLimit   ? `${maxWidth}px`
                          : `${(input.value.length*inputWidth)}px`;

        // Enter 클릭 시 입력값 Tag 추가
        // event.key == 'Enter'로 설정 시 keydown, keyup으로 이중 처리 됨
        if(event.keyCode === 13) { //13 = enter

            // 빈값을 모두 지우고 빈값이면 태그 추가 불가
            if(duplicateCheck(input.value.trim())&&(!input.value.replaceAll(' ','') == ''))
                makeTag(input)
            
            // 입력 값 초기화
            input.value = ''

            // 추가 버튼 활성화
            activeApplyButton()
        }

        // 백스페이스 클릭 시 마지막 태그 선택 이벤트
        if(event.keyCode === 8) { // 8 = backspace
            
            // 모든 태그 조회
            let tags = getElement('.tchv94s').querySelectorAll('.trxac13')

            // 마지막 태그가 selected 포함하는지 확인
            let flag = tags.length == 0 ? false : tags[tags.length-1].classList.contains('selected')

            // 입력값이 0인 경우
            if(input.value.length == 0){

                // 태그개수가 0이 아닐 때 마지막 태그 선택 적용
                if(tags.length != 0)      
                tags[tags.length-1].classList.add('selected')

                // 마지막 태그가 선택이 적용되어 있으면 그 항목 지우기
                if(flag) {
                    tags[tags.length-1].remove()
                    
                    // 태그 지우면서 전역변수 added_tags의 태그가 가진 text값도 제거
                    added_tags = added_tags.filter((element) => element !== tags[tags.length-1].innerText)
                }
            }
            
            // 추가 버튼 활성화
            activeApplyButton()
        }
    })
}

function activeApplyButton() {
    /* 태그 추가 버튼 활성화 */

    const tags          = getElement('.tchv94s').querySelectorAll('.trxac13')
    const applyButton   = getElement('.b18soqoe.primary.normal')
    
    tags.length > 0 ? applyButton.classList.remove('disabled') : applyButton.classList.add('disabled')
}

function duplicateCheck(inputVal) {
    /* 태그 중복 체크  */

    const tags = getElement('.tchv94s').querySelectorAll('.trxac13')
    let flag   = true

    tags.forEach((element) => {
        if (inputVal === element.innerText)
            flag = false
    })

    return flag
}

function makeTag(input) {
    /* 태그 추가  */

    const tagInputTagArea   = getElement('.tchv94s')
    const tagBlock          = createNode('div')

    tagBlock.className      = 'trxac13 t9ef2pv action'
    tagBlock.style          = 'margin: 0px 5px 0.6em 0px;'
    tagBlock.innerText      = input.value.trim()

    let tags                = tagInputTagArea.querySelectorAll('.trxac13')

    // 태그가 하나라도 있으면 태그 뒤에 삽입
    if(tags.length > 0) {
        insertAfter(tagBlock, tags[tags.length-1])

    // 태그가 하나도 없으면 제일 앞에 삽입
    }else{     
        tagInputTagArea.insertBefore(tagBlock, tagInputTagArea.firstChild); //맨 앞에 삽입
    }

    const closeBtn          = createNode('button')
    closeBtn.className      = 'b5bt6fr cn6urtm'
    closeBtn.onclick        = removeTag
    appendTag(tagBlock, closeBtn)

    const closeIcon         = createNode('span')
    closeIcon.className     = 'i1qqph0t icon'
    appendTag(closeBtn, closeIcon)

    let closeIconSvgHtml    = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='tag-cancel-icon-svg'></svg>`
    closeIcon.insertAdjacentHTML('beforeend', closeIconSvgHtml)
    const closeIconSvg      = getElements('.tag-cancel-icon-svg')

    let closeIconPathHtml   = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z"></path>`
    closeIconSvg[closeIconSvg.length-1].insertAdjacentHTML('beforeend', closeIconPathHtml)

    // enter로 태그가 만들어 질때 저장할 때 이용할 전역변수 added_tags에 값 추가
    added_tags.push(input.value.trim())
}

function removeTag() {
    /* 태그 제거  */

    this.closest('.trxac13').remove()
    activeApplyButton()
}

export {
    makeModal,
    openModal,
    openTagModal,
    added_tags,
}