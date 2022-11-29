import {createNode, appendTag, getElement, getCookie} from './common.js';

const root          = document.getElementById("root")

function renderDetail(site) {
/* 항목의 상새내용을 rendering 하는 함수 */

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
    appendTag(article, siteArticle)

    const siteText                      = createNode('div')
    siteText.innerHTML                  = site.content
    appendTag(siteArticle, siteText)   
}


function getSiteDetail() {

    let siteId = getElement('#siteid').value;

    // let csrftoken   = getCookie('csrftoken');

    const data = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            // 'X-CSRFToken' : csrftoken,        
        },
        // body: JSON.stringify({user : 'user'})
    }

    fetch(`/api/sites/detail/${siteId}`, data)
        .then(response => response.json())
        .then(data => {
            renderDetail(data)
        })

}
getSiteDetail()

