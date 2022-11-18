import { createNode, appendTag, getCookie } from "./common.js"


function makeFavoriteInToolBar(parentNode, post) {
    /* 하단 툴바의 즐겨찾기 버튼 Dom을 만드는 함수 */

    const favoriteButtonContainer   = createNode('span')
    appendTag(parentNode, favoriteButtonContainer)

    const favoriteButton        = createNode('button')
    favoriteButton.className    = post.favorite == false ? 'm11fpiro t1221eea pmdugmx d1mp5exd' : 'm11fpiro t1221eea pmdugmx d1mp5exd active'
    favoriteButton.setAttribute('data-tooltip', post.favorite == false ? '즐겨찾기' : '즐겨찾기 해제')
    appendTag(favoriteButtonContainer, favoriteButton)

    const favoriteIconContainer     = createNode('span')
    favoriteIconContainer.className = 'i1qqph0t icon'
    appendTag(favoriteButton, favoriteIconContainer)

    const favoriteIcon      = createNode('i')
    favoriteIcon.className  = 'fa-regular fa-star fa-lg'
    appendTag(favoriteIconContainer, favoriteIcon)

    changeFavoriteValue(favoriteButton, post)

}

function makeCategoryInToolBar(parentNode, post) {
    /* 하단 툴바의 category button Dom을 만드는 함수 */

    const categoryButtonContainer   = createNode('span')
    appendTag(parentNode, categoryButtonContainer)

    const categoryButton        = createNode('button')
    categoryButton.className    = 'm11fpiro t1221eea pmdugmx d1mp5exd'
    categoryButton.setAttribute('data-tooltip', '카테고리')
    appendTag(categoryButtonContainer, categoryButton)

    const categoryIconContainer     = createNode('span')
    categoryIconContainer.className = 'i1qqph0t icon'
    appendTag(categoryButton, categoryIconContainer)

    const categoryIcon      = createNode('i')
    categoryIcon.className  = 'fa fa-regular fa-folder-open fa-lg'
    appendTag(categoryIconContainer, categoryIcon)

}

function makeTagInToolBar(itemActions, post) {
    /* 하단 툴바의 tag button Dom을 만드는 함수 */

    const tagButtonContainer    = createNode('span')
    appendTag(itemActions, tagButtonContainer)

    const tagButton     = createNode('button')
    tagButton.className = 'm11fpiro t1221eea pmdugmx d1mp5exd'
    tagButton.setAttribute('data-tooltip', '태그')
    appendTag(tagButtonContainer, tagButton)

    const tagIconContainer      = createNode('span')
    tagIconContainer.className  = 'i1qqph0t icon'
    appendTag(tagButton, tagIconContainer)

    
    const tagIcon       = createNode('i')
    tagIcon.className   = 'fa-regular fa-hashtag fa-lg'
    appendTag(tagIconContainer, tagIcon)

}

function makeDeleteInToolBar(parentNode, post) {
     /* 하단 툴바의 delete button Dom을 만드는 함수 */

    const deleteButtonContainer = createNode('span')
    appendTag(parentNode, deleteButtonContainer)

    const deleteButton      = createNode('button')
    deleteButton.className  = 'm11fpiro t1221eea pmdugmx d1mp5exd'
    deleteButton.setAttribute('data-tooltip', '삭제')
    appendTag(deleteButtonContainer, deleteButton)

    const deleteIconContainer       = createNode('span')
    deleteIconContainer.className   = 'i1qqph0t icon'
    appendTag(deleteButton, deleteIconContainer)


    const deleteIcon        = createNode('i')
    deleteIcon.className    = 'fa fa-regular fa-trash fa-lg'
    appendTag(deleteIconContainer, deleteIcon)

}

function makeBottomToolbar(parentNode, post) {
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
     makeFavoriteInToolBar(itemActions, post)
    
     // bottom toolbar - category
     makeCategoryInToolBar(itemActions, post)
 
     // bottom toolbar - tag
     makeTagInToolBar(itemActions, post)
 
     // bottom toolbar - delete
     makeDeleteInToolBar(itemActions, post)
}

function changeFavoriteValue(favoriteButton, post) {
    /* 하단 툴바의 즐겨찾기 버튼 상태 변경에 따른 즐겨찾기 목록에 추가 및 제거 */

    favoriteButton.addEventListener('click', () => {

        // 하단 툴바의 즐겨찾기 버튼 활성화 및 즐겨찾기 목록에 추가
        const csrftoken     = getCookie('csrftoken');
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
            fetch(`/api/sites/${post.id}/`, data)
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
            fetch(`/api/sites/${post.id}/`, data)
            .then(response => {
                let status = response.status

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
    makeBottomToolbar
}