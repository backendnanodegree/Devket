import {createNode, appendTag, getElement, getCookie, removeAllNode} from './common.js';
import {highlighClickEvent, highlightRetrieve} from './highlight.js';

// 전역 변수
const root                              = document.getElementById("root")
const sideArea                          = document.getElementById('sidearea')
const favoriteButtonA                   = getElement('.favorite-button')
const favoriteButtonSvg                 = favoriteButtonA.querySelector('.favorite-button-svg')

// 상세화면 헤더 즐겨찾기 버튼 svg <path>태그 변수
const noneFavoritePath                  = '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"></path>'
const favoritePath                      = '<path d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Z"></path>'

const detailButton                      = getElement('.delete-button')


function renderDetail(site) {
/* 항목의 상새내용을 rendering 하는 함수 
    - 특정 문자열로 className에 할당되는 값들은 클론코딩으로 가져오는 css를 반영하기 위한 것입니다.
*/

    const article                       = createNode('article')
    article.className                   = 'article'
    appendTag(root, article)

    const header                        = createNode('header')
    header.className                    = 'h15ky94r'
    appendTag(article, header)

    const siteTitle                     = createNode('h1')
    siteTitle.className                 = 'agrq4zn'
    siteTitle.innerText                 = site.title
    appendTag(header, siteTitle)

    const writerDiv                     = createNode('div')
    writerDiv.className                 = 'a1ryita6'
    appendTag(header, writerDiv)

    const writer                        = createNode('div')
    writer.className                    = 'a5fas5x'
    writer.innerText                    = '작성자'
    appendTag(writerDiv, writer)

    const hostName                      = createNode('span')
    hostName.className                  = 'awkz85z'
    hostName.innerText                  = site.host_name
    appendTag(writer, hostName)

    const originalContainer             = createNode('div')
    originalContainer.className         = 'p1kdv8ol'
    appendTag(header, originalContainer)

    const viewOriginal                  = createNode('a')
    viewOriginal.id                     = 'reader.external-link.view-original'
    viewOriginal.className              = 'vvqu6of'
    viewOriginal.href                   = site.url
    viewOriginal.innerText              = '원본 보기'
    viewOriginal.setAttribute('data-cy', 'view-original')
    viewOriginal.setAttribute('target', '_blank')
    viewOriginal.setAttribute('rel', 'noopener noreferrer')
    appendTag(originalContainer, viewOriginal)

    const listDiv                       = createNode('div')
    listDiv.className                   = 't17jcppz'
    appendTag(originalContainer, listDiv)

    const list                          = createNode('ul')
    list.className                      = 'list'
    appendTag(listDiv, list)

    const siteArticle                   = createNode('article')
    siteArticle.className               = 'c3dczqn'
    siteArticle.id                      = 'text'
    appendTag(article, siteArticle)

    const siteText                      = createNode('div')
    siteText.innerHTML                  = site.content
    appendTag(siteArticle, siteText)

    // Detail 뷰에서 목록을 렌더하고 하이라이트 기능 함수 선언
    highlighClickEvent()

    // 저장된 하이라이트를 화면에 보여주는 함수
    highlightRetrieve()

    // 헤더 즐겨찾기 버튼 이미지를 교체하는 함수
    const favoriteButton                = getElement('.favorite-button')

    favoriteButton.classList.add(site.favorite == true ? 'active':'deactive')

    let favoriteData = favoriteButtonA.classList.contains('active') ? true : false

    removeAllNode(favoriteButtonSvg)
    
    let path                            = favoriteData == true ? favoritePath : noneFavoritePath
    favoriteButtonSvg.insertAdjacentHTML('beforeend', path)
}

// site API에서 항목을 가져오는 함수
function getSiteDetail() {

    let siteId                          = getElement('#siteid').value;

    const data  = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',      
        },
    }

    fetch(`/api/sites/detail/${siteId}`, data)
    .then(response => response.json())
    .then(data => {
        renderDetail(data)
    }) 
}

getSiteDetail()

// Detail 헤더 툴바 즐겨찾기 추가/삭제 함수
favoriteButtonA.addEventListener('click', (e) => {

    let siteId = getElement('#siteid').value;

    const csrftoken                     = getCookie('csrftoken')

    console.log(favoriteButtonA.classList.contains('active'))

    let favoriteData = favoriteButtonA.classList.contains('active') ? false : true

    // 즐겨찾기 업데이트
    const data                          = {
                                            method: 'PUT',
                                            headers: {
                                                'content-type': 'application/json',
                                                'X-CSRFToken' : csrftoken,
                                            },
                                            body: JSON.stringify({
                                                favorite: favoriteData
                                            })
                                        }
    
    fetch(`/api/sites/${siteId}`, data)
    .then(response => {
        let status = response.status

        if (status === 202) {

            let path = renderFavoriteSvg()

            if (path == noneFavoritePath) {
                favoriteButtonA.classList.replace('active', 'deactive')
            } else {
                favoriteButtonA.classList.replace('deactive', 'active')
            }

        } return response.json() })
        .catch(error => console.error('Error', error))
    }
)

// 헤더 툴바 즐겨찾기 버튼 svg 이미지를 교체 해주는 함수
function renderFavoriteSvg() {

    let favoriteData = favoriteButtonA.classList.contains('active') ? false : true

    removeAllNode(favoriteButtonSvg)
    
    let path                            = favoriteData == true ? favoritePath : noneFavoritePath
    favoriteButtonSvg.insertAdjacentHTML('beforeend', path)

    return path
}

// 헤더 항목 삭제 버튼
detailButton.addEventListener('click', () => {

    let siteId = getElement('#siteid').value;

    const csrftoken         = getCookie('csrftoken')

    const data              = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken' : csrftoken,
        }
    }

    fetch(`/api/sites/${siteId}`, data)
    .then(response => {
        const status        = response.status
        
        if (status === 200) {
            console.log('삭제 완료했습니다.')
        } else if (status === 400) {
            console.log('해당 항목이 존재하지 않습니다.')
        } return response.json()
    })
    .catch(error => console.log('Error:', error))

})


export {
    getSiteDetail,
}

