import {appendTag, createNode, getElement, removeAllNode, setFetchData, redirctLogin} from './common.js';

// 전역 변수
const sideToggleButton                  = getElement('.side-toggle-button')
const sideBarArea                       = getElement('.side-area')
const highlightButton                   = getElement('.highlight-button')
let siteId                              = getElement('#siteid').value;

// 헤더 하이라이트 토글 버튼
highlightButton.addEventListener('click', sideToggleEvent)

// 사이드바 하이라이트 토글 버튼
sideToggleButton.addEventListener('click', sideToggleEvent)

// 사이드 토글 함수
function sideToggleEvent() {
    const sideArea = getElement('.side-area')
    const content = getElement('.content')

    sideArea.classList.toggle('on')
    sideToggleButton.classList.toggle('on')
    content.classList.toggle('on')
}

// 사이드바에 하이라이트 데이터와 html태그들을 렌더 해주는 함수
function renderSideEvent(highlight) {

    const div                           = createNode('div')
    div.className                       = 'svsqwlg'
    div.id                              = highlight.id
    appendTag(sideBarArea, div)

    const sideDiv                       = createNode('div')
    div.className                       = 'c8cfxg'
    appendTag(div, sideDiv)

    const contenText                    = createNode('p')
    contenText.className                = 'b5bft6'
    contenText.innerText                =  highlight.content_text
    appendTag(sideDiv, contenText)

    // 사이드바 하이라이트 목록 삭제 버튼과 버튼 클릭 시 해당 데이터가 삭제되는 함수
    const deleteButton                  = createNode('button')
    deleteButton.className              = 'ddfmkr3'
    deleteButton.innerText              = '삭제'
    deleteButton.onclick                = function(){
                                            if (confirm("해당 하이라이트를 삭제 하시겠습니까?")) {

                                                const data = setFetchData('DELETE',{})

                                                fetch(`/api/highlights/${highlight.id}`, data)        
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    (data)

                                                    alert("삭제 되었습니다.");

                                                    div.remove()

                                                    const root = getElement('#root')
                                                    const highlights = root.querySelectorAll('.highlight-selected')

                                                    // 하이라이트 강조 기능 css 삭제
                                                    highlights.forEach(element => {

                                                        if(element.classList.contains(highlight.id)) {
                                                            
                                                            const text = highlight.content_text
                                                            element.before(text)
                                                            element.remove()
                                                        }
                                                    });
                                                });
                                            }
                                        }
    appendTag(sideDiv, deleteButton)
}

// 각 데이터를 sidePost에 전달하여 rendering하는 함수
function sidePosts(data) {

    // sideBarArea 모든 요소 초기화
    removeAllNode(sideBarArea)
    
    const h6                                = createNode('h6')
    h6.className                            = 'hgdagzl'
    h6.innerText                            = '내 하이라이트'
    appendTag(sideBarArea, h6)

    return data.map(item => {
        renderSideEvent(item);
    })
}

// 하이라이트 API에서 데이터를 가져오는 함수
function getSideText() {

    const data = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',      
        },
    }

    fetch(`/api/highlights/${siteId}`, data)
        .then(response => redirctLogin(response))
        .then(data => {
            sidePosts(data)
        }) 
}

getSideText()

export {
    getSideText
}
