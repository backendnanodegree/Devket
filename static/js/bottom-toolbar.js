import { createNode, appendTag, getCookie, getElement, setFetchData } from "./common.js"
import { openModal } from "./modal.js"

function makeFavoriteInToolBar(parentNode, site) {
    /* 하단 툴바의 즐겨찾기 버튼 Dom을 만드는 함수 
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
    */

    const favoriteButtonContainer       = createNode('span')
    appendTag(parentNode, favoriteButtonContainer)

    const favoriteButton                = createNode('button')
    favoriteButton.className            = site.favorite == false ? 'm11fpiro t1221eea pmdugmx d1mp5exd favorite' : 'm11fpiro t1221eea pmdugmx d1mp5exd favorite active'
    favoriteButton.setAttribute('data-tooltip', site.favorite == false ? '즐겨찾기' : '즐겨찾기 해제')
    appendTag(favoriteButtonContainer, favoriteButton)

    const favoriteIconContainer         = createNode('span')
    favoriteIconContainer.className     = 'i1qqph0t icon'
    appendTag(favoriteButton, favoriteIconContainer)

    let favoriteIconSvgHTML             = `<svg class='favorite-icon-svg' fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"aria-hidden="true"></svg>`
    favoriteIconContainer.insertAdjacentHTML('beforeend', favoriteIconSvgHTML)
    const favoriteIconSvg               = getElement('.favorite-icon-svg')

    let favoriteIconPathHTML            = '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"></path>'
    favoriteIconSvg.insertAdjacentHTML('beforeend', favoriteIconPathHTML)

    changeFavoriteValue(favoriteButton, site)

}

function makeCategoryInToolBar(parentNode, site) {
    /* 하단 툴바의 category button Dom을 만드는 함수 
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
    */

    const categoryButtonContainer       = createNode('span')
    appendTag(parentNode, categoryButtonContainer)

    const categoryButton                = createNode('button')
    categoryButton.className            = 'm11fpiro t1221eea pmdugmx d1mp5exd category'
    categoryButton.setAttribute('data-tooltip', '카테고리')
    appendTag(categoryButtonContainer, categoryButton)

    const categoryIconContainer         = createNode('span')
    categoryIconContainer.className     = 'i1qqph0t icon'
    appendTag(categoryButton, categoryIconContainer)

    let categoryIconSvgHTML             = '<svg class="category-icon-svg" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>'
    categoryIconContainer.insertAdjacentHTML('beforeend', categoryIconSvgHTML)
    const categoryIconSvg               = getElement('.category-icon-svg')

    let categoryIconPathHTMLFirst       = '<path fill-rule="evenodd" clip-rule="evenodd" d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"></path>'
    categoryIconSvg.insertAdjacentHTML('beforeend', categoryIconPathHTMLFirst)
    
    let categoryIconPathHTMLSecond      = '<path fill-rule="evenodd" clip-rule="evenodd" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"></path>'
    categoryIconSvg.insertAdjacentHTML('beforeend', categoryIconPathHTMLSecond)
    
    let categoryIconPathHTMLThird       = '<path fill-rule="evenodd" clip-rule="evenodd" d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"></path>'
    categoryIconSvg.insertAdjacentHTML('beforeend', categoryIconPathHTMLThird)

}

function makeTagInToolBar(parentNode, site) {
    /* 하단 툴바의 tag button Dom을 만드는 함수
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
    */

    const tagButtonContainer        = createNode('span')
    appendTag(parentNode, tagButtonContainer)

    const tagButton                 = createNode('button')
    tagButton.className             = 'm11fpiro t1221eea pmdugmx d1mp5exd tag'
    tagButton.setAttribute('data-tooltip', '태그')
    appendTag(tagButtonContainer, tagButton)

    const tagIconContainer          = createNode('span')
    tagIconContainer.className      = 'i1qqph0t icon'
    appendTag(tagButton, tagIconContainer)

    let tagIconSvgHTML              = `<svg class="tag-icon-svg" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`
    tagIconContainer.insertAdjacentHTML('beforeend', tagIconSvgHTML)
    const tagIconSvg                = getElement('.tag-icon-svg')
    
    let tagIconPathHTMLFirst             = `<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"></path>`
    tagIconSvg.insertAdjacentHTML('beforeend', tagIconPathHTMLFirst)
   
    let tagIconPathHTMLSecond             = `<path d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>`
    tagIconSvg.insertAdjacentHTML('beforeend', tagIconPathHTMLSecond)

}

function makeDeleteInToolBar(parentNode, site) {
     /* 하단 툴바의 delete button Dom을 만드는 함수 
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.     
     */

    const deleteButtonContainer     = createNode('span')
    appendTag(parentNode, deleteButtonContainer)

    const deleteButton              = createNode('button')
    deleteButton.className          = 'm11fpiro t1221eea pmdugmx d1mp5exd delete'
    deleteButton.setAttribute('data-tooltip', '삭제')
    appendTag(deleteButtonContainer, deleteButton)

    const deleteIconContainer       = createNode('span')
    deleteIconContainer.className   = 'i1qqph0t icon'
    appendTag(deleteButton, deleteIconContainer)

    const deleteIcon                = createNode('i')
    deleteIcon.className            = 'fa fa-regular fa-trash fa-lg'
    appendTag(deleteIconContainer, deleteIcon)

    // click 시, modal 창 열기
    deleteButton.addEventListener('click', () => {
        const article               = document.getElementById(`${site.id}`)
        article.classList.toggle('selected')

        let modalParam              = {
                                        func        : deleteSite,
                                        type        : 'bottom',
                                        alarm_txt   : `이 항목을 삭제하겠습니까? 삭제한 항목은 복원할 수 없습니다.`,
                                        title       : '항목 삭제',
                                        buttonName  : '삭제', 
                                        args        : '',
                                    }
        
        openModal(modalParam)
    })

}

function makeBottomToolbar(parentNode, site) {
    /*각 항목마다 하단 툴바를 만드는 함수
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
    */

     // bottom toolbar container - footer
     const footer                   = createNode('footer')
     footer.className               = 'footer'
     appendTag(parentNode, footer)
 
     const itemActionsContainer     = createNode('div')
     itemActionsContainer.className = 'i18uycg6 actions'
     appendTag(footer, itemActionsContainer)
 
     const itemActions              = createNode('div')
     itemActions.className          = 'item-actions'
     appendTag(itemActionsContainer, itemActions)
 
     // bottom toolbar - favorite
     makeFavoriteInToolBar(itemActions, site)
    
     // bottom toolbar - category
     makeCategoryInToolBar(itemActions, site)
 
     // bottom toolbar - tag
     makeTagInToolBar(itemActions, site)
 
     // bottom toolbar - delete
     makeDeleteInToolBar(itemActions, site)

     // toolbar bulk 선택 시 활성화 icon
     let itemBulkContainer          = createNode('div')
     itemBulkContainer.className    = 'item-bulk-select off'
     appendTag(itemActionsContainer, itemBulkContainer)

     let itemBulkIcon               = createNode('span')
     itemBulkIcon.className         = 'i1qqph0t icon'
     appendTag(itemBulkContainer, itemBulkIcon)

     let itemBulkIconSvgHtml        = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='select-icon-svg'></svg>`
     itemBulkIcon.insertAdjacentHTML('beforeend', itemBulkIconSvgHtml)   
     
     let itemBulkIconSvg            = itemBulkIcon.querySelector('.select-icon-svg')

     let itemBulkIconPathHtml       = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z" class='select-dot-empty'></path>`
     itemBulkIconSvg.insertAdjacentHTML('beforeend', itemBulkIconPathHtml)
     
     let itemBulkIconDotPathHtml    = `<path fill-rule="evenodd" clip-rule="evenodd" d="M16.707 9.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 13.586l4.293-4.293a1 1 0 0 1 1.414 0Z"  class='select-dot-choice off'></path>`
     itemBulkIconSvg.insertAdjacentHTML('beforeend', itemBulkIconDotPathHtml)

}

function changeFavoriteValue(favoriteButton, site) {
    /* 하단 툴바의 즐겨찾기 버튼 상태 변경에 따른 즐겨찾기 목록에 추가 및 제거
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
    */

    favoriteButton.addEventListener('click', () => {

        // 하단 툴바의 즐겨찾기 버튼 활성화 및 즐겨찾기 목록에 추가
        if (favoriteButton.classList.contains('active') == false) {
          
            // PUT: favorite 값 True로 수정
            const data              = setFetchData('PUT', {favorite: true})
            fetch(`/api/sites/${site.id}`, data)
            .then(response => {
                let status          = response.status

                // 하단 툴바의 즐겨찾기 버튼 활성화
                if (status === 202) {
                    favoriteButton.classList.toggle('active');
                    favoriteButton.setAttribute('data-tooltip', '즐겨찾기 해제');
                    console.log("즐겨찾기 목록에 추가했습니다.", data)
                } return response.json() })
                .catch(error => console.error('Error:', error))
            }
        
        // 하단 툴바의 즐겨찾기 버튼 비활성화 및 즐겨찾기 목록에서 제거
        else { 
            // PUT: favorite 값 false로 수정
            const data              = setFetchData('PUT', {favorite: false})
            fetch(`/api/sites/${site.id}`, data)
            .then(response => {
                let status          = response.status

                // 하단 툴바의 즐겨찾기 버튼 비활성화
                if (status === 202) {
                    favoriteButton.classList.toggle('active');
                    favoriteButton.setAttribute('data-tooltip', '즐겨찾기');
                    console.log("즐겨찾기 목록에서 제거했습니다.", data)
                } return response.json() })
                .catch(error => console.error('Error:', error))
            }
        
        }
    )
}

function deleteSite() {
    /* DELETE http message를 보내는 함수 
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
    */

    const site                  = getElement('.c18o9ext.grid.hiddenActions.noExcerpt.selected')
    const data                  = setFetchData('DELETE', '')
    fetch(`/api/sites/${site.id}`, data)
    .then(response => {
        const status                = response.status
        
        if (status === 200) {
            console.log('삭제 완료했습니다.')
        } else if (status === 404) {
            console.log('해당 항목이 존재하지 않습니다.')
        } return response.json() 
    })
    .catch(error => console.log('Error:', error))
}

export {
    makeBottomToolbar,
}