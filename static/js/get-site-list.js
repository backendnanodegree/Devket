import {createNode, appendTag, getElement, getElements, removeAllNode, setFetchData} from './common.js';
import {makeBottomToolbar} from './bottom-toolbar.js';
import {makeModal} from './modal.js';
import {apiURL} from './api-url.js';

const root            = document.getElementById("root")
const url             = window.location.pathname.split('/');
const apiUrlKey       = url.filter((element) => element != "").pop();
let selected_articles = []

function renderItem(site) {
    /* 각 item의 tag를 rendering 하는 함수
       - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것 입니다.
    */

    const article               = createNode('article')
    article.className           = 'c18o9ext grid hiddenActions noExcerpt'
    article.onclick             = selectBulkIcon
    article.id                  = site.id 
    appendTag(root, article)

    const postId                = createNode('input')
    postId.className            = 'site-id'
    postId.value                = site.id
    postId.type                 = 'hidden'
    appendTag(article, postId)

    const selectedBack          = createNode('div')
    selectedBack.className      = 'selectedBack'
    appendTag(article, selectedBack)

    const item                  = createNode('div')
    item.className              = 'cardWrap'
    appendTag(article, item)

    const imgContainer          = createNode('div')
    imgContainer.className      = 'c97c5c media'
    appendTag(item, imgContainer)

    const itemLink              = createNode('a')
    itemLink.href               = `/mylist/detail/${site.id}/`           
    appendTag(imgContainer, itemLink)

    const img                   = createNode('img')
    img.src                     = site.thumbnail_url
    img.style                   = '--fallbackBackground:#1CB0A880; --fallbackColor:#1CB0A8; --fallbackLetter:&quot;T&quot;;">'
    appendTag(itemLink, img)

    const content               = createNode('div')
    content.className           = 'content'
    appendTag(item, content)

    const titleContainer        = createNode('h2')
    titleContainer.className    = 'title'
    appendTag(content, titleContainer)
    
    const title                 = createNode('a')
    title.innerText             = site.title
    title.href                  = `/mylist/detail/${site.id}/`  
    appendTag(titleContainer, title)

    const details               = createNode('cite')
    details.className           = 'details'
    appendTag(content, details)

    const publisher             = createNode('a')
    publisher.className         = 'publisher'
    publisher.href              = site.url == null ? '#' : site.url
    publisher.innerText         = site.host_name
    publisher.setAttribute('target', site.url == null ? '' : '_blank')
    appendTag(details, publisher)

    // 각 항목(item)의 하단 툴바
    makeBottomToolbar(article, site)
   
}

function renderTag(tags) {
    /* 항목에 포함된 tag를 rendering 하는 함수 
       - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것 입니다. 
    */

    const mainContainer      = getElement('.cmg9k0j')

    const allTagContiner     = createNode('div')
    allTagContiner.className = 'a1ciqz4q'
    appendTag(mainContainer, allTagContiner)
    
    const AllTagTitle        = createNode('h4')
    AllTagTitle.className    = 's1nxmcyz'
    AllTagTitle.innerText    = '모든 태그'
    AllTagTitle.style        = 'margin-top: 1.5rem;'
    appendTag(allTagContiner, AllTagTitle)

    const searchBox          = createNode('div')
    searchBox.className      = 'searchBlock'
    appendTag(allTagContiner, searchBox)

    const tagInput           = createNode('input')
    tagInput.type            = 'text'
    tagInput.placeholder     = '태그 검색'
    tagInput.value           = ''
    tagInput.setAttribute('data-cy', 'all-tags-input')
    appendTag(searchBox, tagInput)

    const tagWrap            = createNode('div')
    tagWrap.className        = 'p1s67rcg'
    appendTag(allTagContiner, tagWrap)

    const tagUl              = createNode('ul')
    tagUl.className          = 'list'
    appendTag(tagWrap, tagUl)

    let tagWideLi            = createNode('li')
    appendTag(tagUl, tagWideLi)

    let tagWideA             = createNode('a')
    tagWideA.setAttribute('data-cy', `all-tags-모두`)
    appendTag(tagWideLi, tagWideA)

    let tagButton            = createNode('button')
    tagButton.className      = 'p1mk9fki'
    tagButton.innerText      = '모두'
    tagButton.value          = ''
    appendTag(tagWideA, tagButton)

    // 태그 바인딩
    let tagArray = new Array()

    tags.map(tag => {
        tagArray.push(tag.id)

        const tagLi          = createNode('li')
        appendTag(tagUl, tagLi)

        const tagA           = createNode('a')
        tagA.setAttribute('data-cy', `all-tags-${tag.name}`)
        appendTag(tagLi, tagA)

        const tagButton      = createNode('button')
        tagButton.className  = 'p1mk9fki'
        tagButton.innerText  = tag.name
        tagButton.value      = tag.id
        tagButton.onclick    = () => {

            const data = {
                method: "GET",
                headers: {
                    'content-type': 'application/json',    
                },
            }
            fetch(`/api/sites/tags/${tag.id}`, data)
                .then(response => console.log(response))
                .then(data     => console.log(data))
                .catch(error   => console.log(error))
        }
        appendTag(tagA, tagButton)
    })
}

function selectBulkIcon(){
    /* bulk toolbar 활성화 시 사이트 항목 선택 이벤트  */

    const headerToolbar = getElement('.n27eiag')

    // toolbar가 bulk상태인지 확인 후 선택 이벤트 부여
    if (headerToolbar.classList.contains('bulk')) {
        this.classList.toggle('selected')
    
        let choiceIcon = this.querySelector('.select-dot-choice')
        choiceIcon.classList.toggle('off')
        
        // 선택 벌크 카운팅
        let selectedBulk = countSelectedBulk()

        // 선택 벌크 즐겨찾기 유무 확인
        checkSelectedBulkFavorite(selectedBulk)
    }
}

function countSelectedBulk() {
    /* 사이트 항목 선택 시 선택한 개수 toolbar에 표시하는 카운팅 함수 */

    const articles = getElements('.c18o9ext')
    selected_articles = new Array()

    articles.forEach(element => {
        
        if(element.classList.contains('selected'))
            selected_articles.push(element.querySelector('.site-id').value)
        
        })

    const selectedSite = getElement('.selected-site')
    selectedSite.textContent = selected_articles.length == 0 ? '항목선택' : `${selected_articles.length}개 항목`

    return selected_articles.length
}

function checkSelectedBulkFavorite(selectedBulk) {
    /*  사이트 항목 선택 시 선택한 항목의 즐겨찾기 유무를 확인!
        선택한 항목 중 하나라도 즐겨찾기에 포한되어 있지 않으면 favorite = Ture 설정하여 bulk처리 진행
    */

    let favoriteCount        = 0;
    const article  = getElements('.c18o9ext');

    // 선택 된 사이트 중 즐겨찾기에 추가된 항목 개수 확인
    article.forEach((element) => {
        if(element.classList.contains('selected')) {
            if(!element.querySelector('footer>.i18uycg6>.item-actions>span>.favorite').classList.contains('active')) {
                favoriteCount ++;
            }            
        }
    })
    
    // 별 아이콘 svg 내부 path 제거
    const favoriteSvg = getElement('.favorite-icon-svg')
    removeAllNode(favoriteSvg)

    if(selectedBulk > 0) {// 선택한 항목이 하나 이상인 경우
        
        if (favoriteCount == 0) {// 즐겨찾기 추가된 항목이 있는 경우 차있는 별

            changeFavoriteFalse(favoriteSvg)

        }else {// 즐겨찾기 추가되 항목이 없는 경우 비어있는 별

            changeFavoriteTrue(favoriteSvg)
        }
    }else{ //선택한 항목이 없으면 비어있는 별

        changeFavoriteTrue(favoriteSvg)
    }
}

function changeFavoriteFalse(favoriteSvg) {
    /* 즐겨찾기 svg favorite 꽉찬 별 추가 */

    const favoriteFalsePathHtml = `<path d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Z" class='false'></path>`
    
    favoriteSvg.insertAdjacentHTML('beforeend', favoriteFalsePathHtml)
}

function changeFavoriteTrue(favoriteSvg) {
    /* 즐겨찾기 svg favorite 빈 별 추가 */

    const favoriteTruePathHtml = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z" class='true'></path>`
    
    favoriteSvg.insertAdjacentHTML('beforeend', favoriteTruePathHtml)
}

function mapPosts(data) {
    /* 각 데이터를 renderPost에 전달하여 rendering하는 함수 */

    // root 모든 요소 초기화
    removeAllNode(root)

    return data.map(item => {
        renderItem(item);
    })
}

function mapTags(data) {
    /* 태그 화면 구현 함수 */

    renderTag(data);
}

function makeActive() {
    /* side bar의 각 탭을 클릭 시, 활성화하는 함수 
        - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
    */
    
    let i; 
    const sidebar       = document.querySelectorAll('.sv813dg')
    const url           = window.location.pathname.split('/');
    const idName        = url.filter((element) => element != "").pop();
    const tabName       = document.getElementById(idName);
    const pageTitle     = getElement('.pageTitle');
    const tabTitle      =   {
                            'mylist'     : '내 목록',
                            'categories' : '카테고리',
                            'favorites'  : '즐겨찾기',
                            'highlights' : '하이라이트',
                            'articles'   : '아티클',
                            'videos'     : '동영상',
                            'tags'       : '태그',
                            }
    
    // side bar의 각 탭 비활성화
    for (i = 0; i < sidebar.length; i++) {  
      sidebar[i].classList.remove('active');
    }
    
    // 선택한 태그만 활성화
    tabName.classList.add('active')

     // main header 의 title 바꾸기
     pageTitle.innerText = `${tabTitle[apiUrlKey]}`
   
  }

// 비동기로 조회 되면 앞의 생성되는 DOM을 읽지 못하므로 동기처리
async function getSiteList(word='') {
    /* 각 탭에 해당되는 모든 항목들을 조회하여 함수 */
    
    // 선택한 탭 활성화하기  
    makeActive()

    // 해당되는 항목들 조회하기  
    await fetch(`${apiURL[apiUrlKey]}?word=${word}`)
        .then(response => response.json())
        .then(data => {
            mapPosts(data)
        })
        .catch(err => {
            console.log(err);
        })
}


function getSiteByTagList(word='') {
    /* 모든 태그 화면을 조회하기 위한 함수 */

    // 선택 메뉴 활성화
    makeActive()

    const siteFetch = fetch(`/api/tags/sites?word=${word}`).then(response => response.json())
    const tagFetch  = fetch(`/api/tags`).then(response => response.json())
                        
    Promise.all([siteFetch, tagFetch])
                        .then(result => {
                            let siteData = result[0]
                            let tagData  = result[1]
                            
                            mapPosts(siteData)
                            mapTags(tagData)                           
                        })
                        .catch(error => console.log(error))
}

// '모든 태그'는 site, tag관련하여 api를 2번 호출하기 위해 분기
apiUrlKey === 'tags' ? getSiteByTagList() : getSiteList()

export {
    getSiteList,
    selected_articles,
};