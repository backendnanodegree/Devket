import { createNode, appendTag, getCookie, getElement } from "./common.js"
import { openModal } from "./modal.js"

function makeFavoriteInToolBar(parentNode, site) {
    /* 하단 툴바의 즐겨찾기 버튼 Dom을 만드는 함수 */

    const favoriteButtonContainer   = createNode('span')
    appendTag(parentNode, favoriteButtonContainer)

    const favoriteButton        = createNode('button')
    favoriteButton.className    = site.favorite == false ? 'm11fpiro t1221eea pmdugmx d1mp5exd favorite' : 'm11fpiro t1221eea pmdugmx d1mp5exd favorite active'
    favoriteButton.setAttribute('data-tooltip', site.favorite == false ? '즐겨찾기' : '즐겨찾기 해제')
    appendTag(favoriteButtonContainer, favoriteButton)

    const favoriteIconContainer     = createNode('span')
    favoriteIconContainer.className = 'i1qqph0t icon'
    appendTag(favoriteButton, favoriteIconContainer)

    const favoriteIcon      = createNode('i')
    favoriteIcon.className  = 'fa-regular fa-star fa-lg'
    appendTag(favoriteIconContainer, favoriteIcon)

    changeFavoriteValue(favoriteButton, site)

}

function makeCategoryInToolBar(parentNode, site) {
    /* 하단 툴바의 category button Dom을 만드는 함수 */

    const categoryButtonContainer   = createNode('span')
    appendTag(parentNode, categoryButtonContainer)

    const categoryButton        = createNode('button')
    categoryButton.className    = 'm11fpiro t1221eea pmdugmx d1mp5exd category'
    categoryButton.setAttribute('data-tooltip', '카테고리')
    appendTag(categoryButtonContainer, categoryButton)

    const categoryIconContainer     = createNode('span')
    categoryIconContainer.className = 'i1qqph0t icon'
    appendTag(categoryButton, categoryIconContainer)

    const categoryIcon      = createNode('i')
    categoryIcon.className  = 'fa fa-regular fa-folder-open fa-lg'
    appendTag(categoryIconContainer, categoryIcon)

}

function makeTagInToolBar(parentNode, site) {
    /* 하단 툴바의 tag button Dom을 만드는 함수 */

    const tagButtonContainer    = createNode('span')
    appendTag(parentNode, tagButtonContainer)

    const tagButton     = createNode('button')
    tagButton.className = 'm11fpiro t1221eea pmdugmx d1mp5exd tag'
    tagButton.setAttribute('data-tooltip', '태그')
    appendTag(tagButtonContainer, tagButton)

    const tagIconContainer      = createNode('span')
    tagIconContainer.className  = 'i1qqph0t icon'
    appendTag(tagButton, tagIconContainer)

    
    const tagIcon       = createNode('i')
    tagIcon.className   = 'fa-regular fa-hashtag fa-lg'
    appendTag(tagIconContainer, tagIcon)

}

function makeDeleteInToolBar(parentNode, site) {
     /* 하단 툴바의 delete button Dom을 만드는 함수 */

    const deleteButtonContainer = createNode('span')
    appendTag(parentNode, deleteButtonContainer)

    const deleteButton      = createNode('button')
    deleteButton.className  = 'm11fpiro t1221eea pmdugmx d1mp5exd delete'
    deleteButton.setAttribute('data-tooltip', '삭제')
    appendTag(deleteButtonContainer, deleteButton)

    const deleteIconContainer       = createNode('span')
    deleteIconContainer.className   = 'i1qqph0t icon'
    appendTag(deleteButton, deleteIconContainer)

    const deleteIcon        = createNode('i')
    deleteIcon.className    = 'fa fa-regular fa-trash fa-lg'
    appendTag(deleteIconContainer, deleteIcon)

    // click 시, modal 창 열기
    deleteButton.addEventListener('click', () => {
        const article = document.getElementById(`${site.id}`)
        article.classList.add('selected')
        openModal(deleteButton)
    })

}

function makeBottomToolbar(parentNode, site) {
    /*각 항목마다 하단 툴바를 만드는 함수*/

     // bottom toolbar container - footer
     const footer       = createNode('footer')
     footer.className   = 'footer'
     appendTag(parentNode, footer)
 
     const itemActionsContainer     = createNode('div')
     itemActionsContainer.className = 'i18uycg6 actions'
     appendTag(footer, itemActionsContainer)
 
     const itemActions      = createNode('div')
     itemActions.className  = 'item-actions'
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
     let itemBulkContainer = createNode('div')
     itemBulkContainer.className = 'item-bulk-select off'
     appendTag(itemActionsContainer, itemBulkContainer)

     let itemBulkIcon = createNode('span')
     itemBulkIcon.className = 'i1qqph0t icon'
     appendTag(itemBulkContainer, itemBulkIcon)

     let itemBulkIconSvgHtml = `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class='select-icon-svg'></svg>`
     itemBulkIcon.insertAdjacentHTML('beforeend', itemBulkIconSvgHtml)   
     
     let itemBulkIconSvg = itemBulkIcon.querySelector('.select-icon-svg')

     let itemBulkIconPathHtml = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z" class='select-dot-empty'></path>`
     itemBulkIconSvg.insertAdjacentHTML('beforeend', itemBulkIconPathHtml)
     
     let itemBulkIconDotPathHtml = `<path fill-rule="evenodd" clip-rule="evenodd" d="M16.707 9.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 13.586l4.293-4.293a1 1 0 0 1 1.414 0Z"  class='select-dot-choice off'></path>`
     itemBulkIconSvg.insertAdjacentHTML('beforeend', itemBulkIconDotPathHtml)

}

function changeFavoriteValue(favoriteButton, site) {
    /* 하단 툴바의 즐겨찾기 버튼 상태 변경에 따른 즐겨찾기 목록에 추가 및 제거 */

    favoriteButton.addEventListener('click', () => {

        // 하단 툴바의 즐겨찾기 버튼 활성화 및 즐겨찾기 목록에 추가
        const csrftoken         = getCookie('csrftoken');

        if (favoriteButton.classList.contains('active') == false) {
          
            // PUT: favorite 값 True로 수정
            const data          = {
                                    method: 'PUT',
                                    headers: {
                                        'content-type': 'application/json',
                                        'X-CSRFToken' : csrftoken,  
                                        },
                                        body: JSON.stringify({
                                            favorite: true,
                                        })
                                    }

            fetch(`/api/sites/${site.id}`, data)
            .then(response => {
                let status = response.status

                // 하단 툴바의 즐겨찾기 버튼 활성화
                if (status === 202) {
                    
                    favoriteButton.classList.add('active');
                    favoriteButton.setAttribute('data-tooltip', '즐겨찾기 해제');
                    console.log("즐겨찾기 목록에 추가했습니다.", data)
                
                } return response.json() })
                .catch(error => console.error('Error:', error))
            }
        
        // 하단 툴바의 즐겨찾기 버튼 비활성화 및 즐겨찾기 목록에서 제거
        else { 
            // PUT: favorite 값 false로 수정
            const data          = {
                                    method: 'PUT',
                                    headers: {
                                        'content-type': 'application/json',
                                        'X-CSRFToken' : csrftoken,  
                                    },
                                    body: JSON.stringify({
                                        'favorite': false,
                                    })
                                }

            fetch(`/api/sites/${site.id}`, data)
            .then(response => {

                let status      = response.status

                // 하단 툴바의 즐겨찾기 버튼 비활성화
                if (status === 202) {
                
                    favoriteButton.classList.remove('active');
                    favoriteButton.setAttribute('data-tooltip', '즐겨찾기');
                    console.log("즐겨찾기 목록에서 제거했습니다.", data)
                
                } return response.json() })
                .catch(error => console.error('Error:', error))
            }
        
        }
    )
}

export {
    makeBottomToolbar,
}