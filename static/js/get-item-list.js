import {createNode, appendTag, makeBottomToolbar} from './common.js';

const root = document.getElementById("root")

function renderItem(post) {
    /* 각 item의 tag를 rendering 하는 함수 */

    const article = createNode('article')
    article.className = 'c18o9ext grid hiddenActions noExcerpt'
    appendTag(root, article)

    const item = createNode('div')
    item.className = 'cardWrap'
    appendTag(article, item)

    const imgContainer = createNode('div')
    imgContainer.className = 'c97c5c media'
    appendTag(item, imgContainer)

    const itemLink = createNode('a')
    itemLink.href = post.thumbnail_url
    appendTag(imgContainer, itemLink)

    const img = createNode('img')
    img.src = post.thumbnail_url
    img.style = '--fallbackBackground:#1CB0A880; --fallbackColor:#1CB0A8; --fallbackLetter:&quot;T&quot;;">'
    appendTag(itemLink, img)

    const content = createNode('div')
    content.className = 'content'
    appendTag(item, content)

    const titleContainer = createNode('h2')
    titleContainer.className = 'title'
    appendTag(content, titleContainer)

    const title = createNode('a')
    title.innerText = post.title
    appendTag(titleContainer, title)

    const details = createNode('cite')
    details.className = 'details'
    appendTag(content, details)

    const publisher = createNode('a')
    publisher.className = 'publisher'
    publisher.href = 'https://www.theatlantic.com/technology/archive/2022/10/phone-call-greeting-smartphone-technological-error/671910/?utm_source=pocket_saves'
    publisher.innerText = 'The Atlantic'
    appendTag(details, publisher)

    // 각 항목(item)의 하단 툴바
    makeBottomToolbar(article)
   
}

function mapPosts(data) {
    /* 각 데이터를 renderPost에 전달하여 rendering하는 함수 */

    return data.map(item => {
        renderItem(item);
    })
}


function getItemList() {
    /* mylist에 등록된 모든 항목들을 조회하여 함수 */
    
    fetch(`/api/list/`)
    .then(response => response.json())
    .then(data => {
        mapPosts(data)
    })
    .catch(err => {
        console.log(err);
    })
}

getItemList()