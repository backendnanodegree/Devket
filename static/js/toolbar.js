import {getElement, getElements, makeElementOff, makeElementOn, removeElement, createNode, appendTag, getCookie} from './common.js';
import {getSiteList} from './get-site-list.js';

function makeSearchTopToolBar() {
    /* 검색 toolbar 생성 함수 */

    const searchForm                = createNode('div')
    searchForm.className            = 'sxpxhia toolbar-container'
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

    const mobileSearchButton        = createNode('span')
    mobileSearchButton.className    = 'c1n69ads toolbar-cancel'
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
    appendTag(mobileSearchButton, mobileSearchSpanC)

    const mobileSearchFont          = createNode('font')
    mobileSearchFont.style          = 'vertical-align: inherit;'
    appendTag(mobileSearchSpanC, mobileSearchFont)

    const mobileSearchText          = createNode('font')
    mobileSearchText.style          = 'vertical-align: inherit;'
    mobileSearchText.textContent    = '취소'
    appendTag(mobileSearchFont, mobileSearchText)

    searchInput.focus()

    toolbarCancelBtn()

    searchSitebyToolbar()
}

function makeSaveTopToolBar() {
    /* 저장 toolbar 생성 함수 */

    const saveForm                  = createNode('div')
    saveForm.className              = 'a14hwmit toolbar-container'
    saveForm.autocomplete           = 'off'
    appendTag(headerContainer, saveForm)
    
    const saveWindow                = createNode('div')
    saveWindow.className            = 'a2ytnol'
    appendTag(saveForm, saveWindow)
    
    const saveIcon                  = createNode('span')
    saveIcon.className              = 'i1qqph0t icon a7o7dd7'
    appendTag(saveWindow, saveIcon)

    let saveIconSvgHthml             = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='save-icon-svg'></svg>`
    saveIcon.insertAdjacentHTML('beforeend', saveIconSvgHthml)
    const saveIconSvg               = getElement('.save-icon-svg')
    
    let saveIconPathHtml            = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V4a1 1 0 0 1 1-1Z"></path>`
    saveIconSvg.insertAdjacentHTML('beforeend', saveIconPathHtml)

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

    const mobileSaveButton          = createNode('span')
    mobileSaveButton.className      = 'cj9zxq3 toolbar-cancel'
    mobileSaveButton.setAttribute('data-cy', 'add-cancel')
    appendTag(saveForm, mobileSaveButton)
    
    const mobileSaveSpan            = createNode('span')
    mobileSaveSpan.className        = 'i1qqph0t icon c6uzcx'
    appendTag(mobileSaveButton, mobileSaveSpan)

    let mobileSaveSvgHtml           = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='save-icon-svg-m'>`
    mobileSaveSpan.insertAdjacentHTML('beforeend', mobileSaveSvgHtml)
    const mobileSaveIconSvg         = getElement('.save-icon-svg-m')

    let mobileSaveIconPathHtml      = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z"></path>`
    mobileSaveIconSvg.insertAdjacentHTML('beforeend', mobileSaveIconPathHtml)

    const mobileSaveSpanC           = createNode('span')
    mobileSaveSpanC.className       = 'c1xd9hu9'
    appendTag(mobileSaveButton, mobileSaveSpanC)

    const mobileSaveFont            = createNode('font')
    mobileSaveFont.style            = 'vertical-align: inherit;'
    appendTag(mobileSaveSpanC, mobileSaveFont)

    const mobileSaveText            = createNode('font')
    mobileSaveText.style            = 'vertical-align: inherit;'
    mobileSaveText.textContent      = '취소'
    appendTag(mobileSaveFont, mobileSaveText)

    saveInput.focus()

    toolbarCancelBtn()

    saveSitebyToolbar()
}

function makeBulkTopToolBar() {
    /* 벌크 toolbar 생성 함수 */

    const bulkWrap                      = createNode('div')
    bulkWrap.className                  = 'b1xsx9mu toolbar-container'
    appendTag(headerContainer, bulkWrap)
    
    const bulkInnerWrap                 = createNode('div')
    bulkInnerWrap.className             = 'bn8myry'
    appendTag(bulkWrap, bulkInnerWrap)
    
    const bulkContainer                 = createNode('div')
    bulkContainer.className             = 'bulk-container'
    appendTag(bulkInnerWrap, bulkContainer)

    const bulkAction                    = createNode('div')
    bulkAction.className                = 'bulk-actions'
    appendTag(bulkContainer, bulkAction)
    
    const tagButton                     = createNode('button')
    tagButton.className                 = 'b1vi9mhm t1221eea pzhe358'

    tagButton.setAttribute('aria-label', '꼬리표')
    tagButton.setAttribute('data-cy', 'bulk-tag')
    tagButton.setAttribute('data-tooltip', 'Tag')
    appendTag(bulkAction, tagButton)

    const tagIcon                       = createNode('span')
    tagIcon.className                   = 'i1qqph0t icon b172fsd5'
    appendTag(tagButton, tagIcon)

    let tagIconSvgHtml                  = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="tag-icon-svg"></svg>`
    tagIcon.insertAdjacentHTML('beforeend', tagIconSvgHtml)
    const tagIconSvg = getElement('.tag-icon-svg')


    const tagIconPathHtml               = `<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"></path>
                                            <path d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>`
    tagIconSvg.insertAdjacentHTML('beforeend', tagIconPathHtml)

    const favoriteButton                = createNode('button')
    favoriteButton.className            = 'b1vi9mhm t1221eea pzhe358'

    favoriteButton.setAttribute('aria-label', '가장 좋아하는')
    favoriteButton.setAttribute('data-cy', 'bulk-favorite')
    favoriteButton.setAttribute('data-tooltip', 'Favorite')
    appendTag(bulkAction, favoriteButton)

    const favoriteIcon                  = createNode('span')
    favoriteIcon.className              = 'i1qqph0t icon b172fsd5'
    appendTag(favoriteButton, favoriteIcon)

    let favoriteIconSvgHtml             = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="favorite-icon-svg"></svg>`
    favoriteIcon.insertAdjacentHTML('beforeend', favoriteIconSvgHtml)
    const favoriteIconSvg               = getElement('.favorite-icon-svg')

    const favoriteIconPathHtml          = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"></path>`
    favoriteIconSvg.insertAdjacentHTML('beforeend', favoriteIconPathHtml)

    const categoryButton                = createNode('button')
    categoryButton.className            = 'b1vi9mhm t1221eea pzhe358'

    categoryButton.setAttribute('aria-label', '카테고리')
    categoryButton.setAttribute('data-cy', 'bulk-category')
    categoryButton.setAttribute('data-tooltip', 'Category')
    appendTag(bulkAction, categoryButton)

    const categoryIcon                  = createNode('span')
    categoryIcon.className              = 'i1qqph0t icon b172fsd5'
    appendTag(categoryButton, categoryIcon)

    let categoryIconSvgHtml             = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='category-icon-svg'></svg>`
    categoryIcon.insertAdjacentHTML('beforeend', categoryIconSvgHtml)
    const categoryIconSvg = getElement('.category-icon-svg')

    const categoryIconPathHtml          = `<path fill-rule="evenodd" clip-rule="evenodd" d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"></path>`
    categoryIconSvg.insertAdjacentHTML('beforeend', categoryIconPathHtml)

    const deleteButton                  = createNode('button')
    deleteButton.className              = 'b1vi9mhm t1221eea pzhe358'
    deleteButton.setAttribute('aria-label', '삭제')
    deleteButton.setAttribute('data-cy', 'bulk-delete')
    deleteButton.setAttribute('data-tooltip', 'Delete')
    appendTag(bulkAction, deleteButton)

    const deleteIcon                    = createNode('span')
    deleteIcon.className                = 'i1qqph0t icon b172fsd5'
    appendTag(deleteButton, deleteIcon)

    let deleteIconSvgHtml               = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='delete-icon-svg'>`
    deleteIcon.insertAdjacentHTML('beforeend', deleteIconSvgHtml)

    deleteIcon.append()
    const deleteIconSvg = getElement('.delete-icon-svg')

    const deleteIconPathHtml            = `<path fill-rule="evenodd" clip-rule="evenodd" d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"></path>`
    deleteIconSvg.insertAdjacentHTML('beforeend', deleteIconPathHtml)
    
    const toolbarActionLabl             = createNode('div')
    toolbarActionLabl.className         = 'labelText'
    appendTag(bulkAction, toolbarActionLabl)
    
    const mobileItemSelect              = createNode('font')
    mobileItemSelect.style              = 'vertical-align: inherit;'
    appendTag(toolbarActionLabl, mobileItemSelect)
    
    const mobileItemSelectFont          = createNode('font')
    mobileItemSelectFont.style          = 'vertical-align: inherit; display:block; min-width:100px;'
    mobileItemSelectFont.textContent    = '항목선택'
    appendTag(mobileItemSelect, mobileItemSelectFont)
    
    const bulkCancleButton              = createNode('button')
    bulkCancleButton.className          = 'bulk-cancle toolbar-cancel'
    bulkCancleButton.setAttribute('data-cy', 'clear-button')
    appendTag(bulkInnerWrap, bulkCancleButton)
    
    const bulkCancleButtonFont          = createNode('font')
    bulkCancleButtonFont.style          = 'vertical-align: inherit;'
    appendTag(bulkCancleButton, bulkCancleButtonFont)
    
    const mobileItemSelectText          = createNode('font')
    mobileItemSelectText.style          = 'vertical-align: inherit;'
    mobileItemSelectText.textContent    = '취소'
    appendTag(bulkCancleButtonFont, mobileItemSelectText)

    const cancleButton                  = createNode('button')
    cancleButton.className              = 'b1vi9mhm cancel-button toolbar-cancel'
    cancleButton.setAttribute('data-cy', 'bulk-close')
    appendTag(bulkInnerWrap, cancleButton)
    
    const cancleButtonSpan              = createNode('span')
    cancleButtonSpan.className          = 'i1qqph0t icon nio91go'
    appendTag(cancleButton, cancleButtonSpan)
    
    let cancleButtonSvgHtml             = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='cancle-icon-svg'></svg>`
    cancleButtonSpan.insertAdjacentHTML('beforeend', cancleButtonSvgHtml)
    const cancleButtonSvg = getElement('.cancle-icon-svg')
    
    let cancleButtonPathHtml            = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414Z"></path>`
    cancleButtonSvg.insertAdjacentHTML('beforeend', cancleButtonPathHtml)

    const cancleTextSpan                = createNode('span')
    cancleTextSpan.className            = 'c1dmz8tx'
    appendTag(cancleButton, cancleTextSpan)
    
    const cancleText                    = createNode('font')
    cancleText.style                    = 'vertical-align: inherit;'
    appendTag(cancleTextSpan, cancleText)
    
    const cancleTextFont                = createNode('font')
    cancleTextFont.style                = 'vertical-align: inherit;'
    cancleTextFont.textContent          = '취소'
    appendTag(cancleTextSpan, cancleTextFont)
    
    toolbarCancelBtn()

    // bulk 버튼 클릭 시 벌크 선택 활성화
    activeSelectBulk()
}

function activeSelectBulk() {
    /* toolbar bulk 활성화시 사이트 항목 선택 버튼 활성화 */
    
    // toolbar 활성화 시 벌크 선택 toggle 처리(활성화)
    changeSelectBulk()
}

function toolbarCancelBtn () {
    /* toolbar 닫기 클릭 이벤트 */
    
    const btnCancels = getElements('.toolbar-cancel');
    const toolbarContainer = getElement('.toolbar-container');

    btnCancels.forEach((element) => {
        element.addEventListener('click', () => {
            // 취소 버튼 클릭 시 툴바 컨테이너 지운 후 기본 mane 활성화
            makeElementOn(menuContainer, toolContainer, profileContainer)
            removeElement(toolbarContainer)
            
            // 취소 버튼 클릭 시 벌크 선택 toggle 처리(비확성화)      
            changeSelectBulk()
        })
    }) 
}

function changeSelectBulk() {
    /* 벌크 선택 유무를 확인 후 change 함수 */
    
    const bottomToolbarConatiner = getElements('.i18uycg6')

    bottomToolbarConatiner.forEach(element => {
        element.classList.toggle('bulkEdit')

        let bottomToolbar = element.querySelector('.item-actions')
        let bulkToolbar = element.querySelector('.item-bulk-select')

        bottomToolbar.classList.toggle('off')
        bulkToolbar.classList.toggle('off')
    })
}

function saveSitebyToolbar () {
    /* toolbar URL 저장 클릭 이벤트 */

    const toolbarSaveBtn = getElement('.add-button');

    toolbarSaveBtn.addEventListener('click', () => {

        const csrftoken = getCookie('csrftoken');
        let url         = getElement('.add-input').value;
        let regex       = /^(http(s)?:\/\/)([^\/]*)(\.)(com|net|kr|my|shop|info|site|io)(\/)/gi

        if(regex.test(url)){
            const data = {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken' : csrftoken,        
                },
                body: JSON.stringify({
                    url: url,
                    id : 'User Id' 
                })
            }
            
            fetch(`/api/scrap/parse/`, data)
                .then(response => {
                    let status = response.status
                    if (status === 200) {
                        alert('저장에 성공하였습니다.')
                    }else if (status === 202) {
                        alert('저장할 수 없는 사이트입니다.')
                    }else if (status === 400) {
                        alert(response.json.msg)
                    }
                    return response.json()
                })
                // 조회함수 호출
                .then(result => getSiteList()) 
                .catch(error => console.log(error))
        }else{
            alert('형식에 맞는 url을 입력바랍니다. (http://... or https://...)')
        }
    })
}

function searchSitebyToolbar () {
    /* toolbar title 조회 클릭 이벤트*/

    const searchToolbarBtn = getElement('.search-button');

    searchToolbarBtn.addEventListener('click', () => {
        let word = getElement('.search-input').value;

        getSiteList(word)
    })
}

const headerContainer  = getElement('.global-nav-container > .n27eiag');
const toolContainer    = getElement('.toolbar-wrap');
const profileContainer = getElement('.profile-wrap');
const menuContainer    = getElement('.menu-wrap');
const btnSearch        = getElement('#search');
const btnSave          = getElement('#save');
const btnBulk          = getElement('#bulk');

btnSearch.addEventListener('click', () => {
    /* 검색 toolbar 클릭 이벤트 */

    makeElementOff(menuContainer, toolContainer, profileContainer);

    makeSearchTopToolBar();
})

btnSave.addEventListener('click', () => {
    /* 저장 toolbar 클릭 이벤트 */

    makeElementOff(menuContainer, toolContainer, profileContainer)

    makeSaveTopToolBar()
})

btnBulk.addEventListener('click', () => {
    /* 벌크 toolbar 클릭 이벤트 */

    makeElementOff(menuContainer, toolContainer, profileContainer)

    makeBulkTopToolBar()
})
