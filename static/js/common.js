function getElement(elemVal) {
    /* 단일 요소 가져오는 함수 */

    return document.querySelector(elemVal);
}

function getElements(val) {
    /* 다중 요소 가져오는 함수 */

    return document.querySelectorAll(val)
}

function offElement(...args) {
    /* 요소 off 처리 함수 */

    args.map((element) => {
        if (!element.classList.contains('off')) {
            element.classList.add('off')
        }
    });
}

function onElement(...args) {
    /* 요소 off 제거 함수 */

    args.map((element) => {
        if (element.classList.contains('off')) {
            element.classList.remove('off')
        }
    });
}


function removeElement(...args) {
    /* 요소 제거 함수 */

    args.map((element) => {
        element.remove()
    });
}

function createNode(tag) {
    /* tag를 생성하는 함수 */

    return document.createElement(tag);
}

function appendTag(parent, element) {
    /* parent tag에 child tag를 추가하는 함수 */

    return parent.appendChild(element);
}

function makeFavoriteInToolBar(parentNode) {
    /* 하단 툴바의 즐겨찾기 버튼 Dom을 만드는 함수 */

    const favoriteButtonContainer = createNode('span')
    appendTag(parentNode, favoriteButtonContainer)

    const favoriteButton = createNode('button')
    favoriteButton.className = 'm11fpiro t1221eea pmdugmx d1mp5exd'
    favoriteButton.setAttribute('data-tooltip', '즐겨찾기')
    appendTag(favoriteButtonContainer, favoriteButton)

    const favoriteIconContainer = createNode('span')
    favoriteIconContainer.className = 'i1qqph0t icon'
    appendTag(favoriteButton, favoriteIconContainer)

    const favoriteIcon = createNode('i')
    favoriteIcon.className = 'fa-regular fa-star fa-lg'
    appendTag(favoriteIconContainer, favoriteIcon)

}

function makeCategoryInToolBar(parentNode) {
    /* 하단 툴바의 category button Dom을 만드는 함수 */

    const categoryButtonContainer = createNode('span')
    appendTag(parentNode, categoryButtonContainer)

    const categoryButton = createNode('button')
    categoryButton.className = 'm11fpiro t1221eea pmdugmx d1mp5exd'
    categoryButton.setAttribute('data-tooltip', '카테고리')
    appendTag(categoryButtonContainer, categoryButton)

    const categoryIconContainer = createNode('span')
    categoryIconContainer.className = 'i1qqph0t icon'
    appendTag(categoryButton, categoryIconContainer)

    const categoryIcon = createNode('i')
    categoryIcon.className = 'fa fa-regular fa-folder-open fa-lg'
    appendTag(categoryIconContainer, categoryIcon)

}


function makeTagInToolBar(itemActions) {
    /* 하단 툴바의 tag button Dom을 만드는 함수 */

    const tagButtonContainer = createNode('span')
    appendTag(itemActions, tagButtonContainer)

    const tagButton = createNode('button')
    tagButton.className = 'm11fpiro t1221eea pmdugmx d1mp5exd'
    tagButton.setAttribute('data-tooltip', '태그')
    appendTag(tagButtonContainer, tagButton)

    const tagIconContainer = createNode('span')
    tagIconContainer.className = 'i1qqph0t icon'
    appendTag(tagButton, tagIconContainer)

    
    const tagIcon = createNode('i')
    tagIcon.className = 'fa-regular fa-hashtag fa-lg'
    appendTag(tagIconContainer, tagIcon)

}

function makeDeleteInToolBar(parentNode) {
     /* 하단 툴바의 delete button Dom을 만드는 함수 */

    const deleteButtonContainer = createNode('span')
    appendTag(parentNode, deleteButtonContainer)

    const deleteButton = createNode('button')
    deleteButton.className = 'm11fpiro t1221eea pmdugmx d1mp5exd'
    deleteButton.setAttribute('data-tooltip', '삭제')
    appendTag(deleteButtonContainer, deleteButton)

    const deleteIconContainer = createNode('span')
    deleteIconContainer.className = 'i1qqph0t icon'
    appendTag(deleteButton, deleteIconContainer)


    const deleteIcon = createNode('i')
    deleteIcon.className = 'fa fa-regular fa-trash fa-lg'
    appendTag(deleteIconContainer, deleteIcon)

}

function makeBottomToolbar(parentNode) {
    /*각 항목마다 하단 툴바를 만드는 함수*/

     // bottom toolbar container - footer
     const footer = createNode('footer')
     footer.className = 'footer'
     appendTag(parentNode, footer)
 
     const itemActionsContainer = createNode('div')
     itemActionsContainer.className = 'i18uycg6 actions'
     appendTag(footer, itemActionsContainer)
 
     const itemActions = createNode('div')
     itemActions.className = 'item-actions'
     appendTag(itemActionsContainer, itemActions)
 
     // bottom toolbar - favorite
     makeFavoriteInToolBar(itemActions)
    
     // bottom toolbar - category
     makeCategoryInToolBar(itemActions)
 
     // bottom toolbar - tag
     makeTagInToolBar(itemActions)
 
     // bottom toolbar - delete
     makeDeleteInToolBar(itemActions)
}

export {
    getElement,
    getElements,
    offElement,
    onElement, 
    removeElement,
    createNode, 
    appendTag, 
    makeBottomToolbar
};