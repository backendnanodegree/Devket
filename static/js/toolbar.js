import {getElement, getElements, removeElement, createNode, appendTag, makeBottomToolbar} from './common.js';

function makeSearchTopToolBar() {
    /* 검색 toolbar 생성 함수 */

    const searchForm                = createNode('form')
    searchForm.className            = 'sxpxhia'
    searchForm.autocomplete         = 'off'
    appendTag(headerContainer, searchForm)

    const searchWindow              = createNode('div')
    searchWindow.className          = 's1pj0kbg'
    appendTag(searchForm, searchWindow)

    const searchIcon                = createNode('span')
    searchIcon.className            = 'i1qqph0t icon szie4no'
    appendTag(searchWindow, searchIcon)

    let searchIconSvgHTML           = `<svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' class='search-icon-svg'></svg>` 
    searchIcon.insertAdjacentHTML('beforeend', searchIconSvgHTML)
    const searchIconSvg             = getElement('.search-icon-svg')
    
    let searchIconPathHTML          = `<path fill-rule="evenodd" clip-rule="evenodd" d="M16.618 18.032a9 9 0 1 1 1.414-1.414l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675ZM18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>`
    searchIconSvg.insertAdjacentHTML('beforeend', searchIconPathHTML)

    const searchInput               = createNode('input')
    searchInput.placeholder         = '주제 및 관심사 검색'
    searchInput.className           = 'search-input'
    searchInput.name                = 'search-input'
    searchInput.enterkeyhint        = 'search'

    searchInput.setAttribute('data-cy', 'search-input')
    searchInput.setAttribute('aria-label', '컬렉션 검색')
    appendTag(searchWindow, searchInput)
    
    const searchButton              = createNode('button')
    searchButton.className          = 'search-button'
    searchButton.setAttribute('data-cy', 'search-submit')
    appendTag(searchForm, searchButton)

    const searchFont                = createNode('font')
    searchFont.style                = 'vertical-align: inherit;'
    appendTag(searchButton, searchFont)

    const searchText                = createNode('font')
    searchText.style                = 'vertical-align: inherit;'
    searchText.textContent          = '검색'
    appendTag(searchFont, searchText)

    const mobileSearchInput         = createNode('input')
    mobileSearchInput.type          = 'submit'
    mobileSearchInput.className     = 'mobile-submit'
    appendTag(searchForm, mobileSearchInput)

    const mobileSearchButton        = createNode('button')
    mobileSearchButton.className    = 'c1n69ads'
    mobileSearchButton.setAttribute('data-cy', 'search-cancel')
    appendTag(searchForm, mobileSearchButton)
    
    const mobileSearchSpan          = createNode('span')
    mobileSearchSpan.className      = 'i1qqph0t icon c14udmp5'
    appendTag(mobileSearchButton, mobileSearchSpan)

    let mobileSearchSvgHTML         = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='search-icon-svg-m'></svg>`
    mobileSearchSpan.insertAdjacentHTML('beforeend', mobileSearchSvgHTML)
    const mobileSearchIconSvg       = getElement('.search-icon-svg-m')

    let mobileSearchIconPathHTML    = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z"></path>`
    mobileSearchIconSvg.insertAdjacentHTML('beforeend', mobileSearchIconPathHTML)

    const mobileSearchSpanC         = createNode('span')
    mobileSearchSpanC.className     = 'c1nzshxn'
    appendTag(searchButton, mobileSearchSpanC)

    const mobileSearchFont          = createNode('font')
    mobileSearchFont.style          = 'vertical-align: inherit;'
    appendTag(mobileSearchSpanC, mobileSearchFont)

    const mobileSearchText          = createNode('font')
    mobileSearchText.style          = 'vertical-align: inherit;'
    mobileSearchText.textContent    = '취소'
    appendTag(mobileSearchSpan, mobileSearchText)
}

function makeSaveTopToolBar() {
    /* 저장 toolbar 생성 함수 */

    const saveForm                  = createNode('form')
    saveForm.className              = 'a14hwmit'
    saveForm.autocomplete           = 'off'
    appendTag(headerContainer, saveForm)
    
    const saveWindow                = createNode('div')
    saveWindow.className            = 'a2ytnol'
    appendTag(saveForm, saveWindow)
    
    const saveIcon                  = createNode('span')
    saveIcon.className              = 'i1qqph0t icon a7o7dd7'
    appendTag(saveWindow, saveIcon)

    let saveIconSvgHTML             = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='save-icon-svg'></svg>`
    saveIcon.insertAdjacentHTML('beforeend', saveIconSvgHTML)
    const saveIconSvg               = getElement('.save-icon-svg')
    
    let saveIconPathHTML            = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V4a1 1 0 0 1 1-1Z"></path>`
    saveIconSvg.insertAdjacentHTML('beforeend', saveIconPathHTML)

    const saveInput                 = createNode('input')

    saveInput.enterkeyhint          = 'send'
    saveInput.placeholder           = 'URL 저장 https://...'
    saveInput.className             = 'add-input'
    saveInput.name                  = 'add-input'
    saveInput.type                  = 'url'

    saveInput.setAttribute('aria-label', '주머니에 아이템 추가')
    saveInput.setAttribute('data-cy', 'add-input')
    appendTag(saveWindow, saveInput)

    const saveButton                = createNode('button')
    saveButton.className            = 'add-button'
    saveButton.setAttribute('data-cy', 'add-submit')
    appendTag(saveForm, saveButton)

    const saveFont                  = createNode('font')
    saveFont.style                  = 'vertical-align: inherit;'
    appendTag(saveButton, saveFont)

    const saveText                  = createNode('font')
    saveText.style                  = 'vertical-align: inherit;'
    saveText.textContent            = '추가하다'
    appendTag(saveFont, saveText)

    const mobileSaveInput           = createNode('input')
    mobileSaveInput.type            = 'submit'
    mobileSaveInput.className       = 'mobile-submit'
    appendTag(saveForm, mobileSaveInput)

    const mobileSaveButton          = createNode('button')
    mobileSaveButton.className      = 'cj9zxq3'
    mobileSaveButton.setAttribute('data-cy', 'add-cancel')
    appendTag(saveForm, mobileSaveButton)
    
    const mobileSaveSpan            = createNode('span')
    mobileSaveSpan.className        = 'i1qqph0t icon c6uzcx'
    appendTag(mobileSaveButton, mobileSaveSpan)

    let mobileSaveSvgHTML           = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='save-icon-svg-m'>`
    mobileSaveSpan.insertAdjacentHTML('beforeend', mobileSaveSvgHTML)
    const mobileSaveIconSvg         = getElement('.save-icon-svg-m')

    let mobileSaveIconPathHTML      = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z"></path>`
    mobileSaveIconSvg.insertAdjacentHTML('beforeend', mobileSaveIconPathHTML)

    const mobileSaveSpanC           = createNode('span')
    mobileSaveSpanC.className       = 'c1xd9hu9'
    appendTag(saveButton, mobileSaveSpanC)

    const mobileSaveFont            = createNode('font')
    mobileSaveFont.style            = 'vertical-align: inherit;'
    appendTag(mobileSaveSpanC, mobileSaveFont)

    const mobileSaveText            = createNode('font')
    mobileSaveText.style            = 'vertical-align: inherit;'
    mobileSaveText.textContent      = '취소'
    appendTag(mobileSaveFont, mobileSaveText)
}

const headerContainer   = getElement('.global-nav-container > .n27eiag');
const toolContainer     = getElement('.toolbar-wrap');
const profileContainer  = getElement('.profile-wrap');
const menuContainer     = getElement('.menu-wrap');
const btnSearch         = getElement('#search');
const btnSave           = getElement('#save');
const btnBulk           = getElement('#bulk');

btnSearch.addEventListener('click', ()=>{

    removeElement(menuContainer, toolContainer, profileContainer);

    makeSearchTopToolBar();
})

btnSave.addEventListener('click', ()=>{

    removeElement(menuContainer, toolContainer, profileContainer);

    makeSaveTopToolBar()
})

btnBulk.addEventListener('click', ()=>{

    removeElement(menuContainer, toolContainer, profileContainer);

})
