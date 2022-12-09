import {getElement, setFetchData} from './common.js';
import {getSideText} from './detail-side-bar.js'

// 전역 변수
let siteId                              = getElement('#siteid').value;

// 하이라이트 클릭 적용 이벤트
function highlighClickEvent() {
    const text                          = getElement('#root');
    let start;
    let end;
    let startX;
    let startY;
    let targetX;

    // 하이라이트 버튼 위치값 설정
    text.addEventListener('mousedown', (e) => {
        console.log('startX - ', e.clientX, 'startY - ', e.clientY)
        startX                          = e.clientX
        startY                          = e.clientY
        })
 
    text.addEventListener('mouseup', (e) => {

        if (e.target.name === 'highbtn') return;
        
        console.log('endX - ', e.clientX, 'endY - ', e.clientY)
        let endX                        = e.clientX
        let endY                        = e.clientY
        
        targetX                         = (startX + endX) / 2;

        btn.style.cssText = `display:block; position:fixed; left: ${targetX}px; top: ${endY-50}px; z-index: 5;`
        })

        let btn = document.querySelector('.btn');
    
    // 버튼 클릭시 이벤트 적용
    btn.addEventListener('click', (e) => {

        const selection                 = window.getSelection()
        let hightext                    = selection.toString()
        let siteId                      = getElement('#siteid').value;
        start                           = selection.anchorOffset
        end                             = selection.focusOffset

        highlightPost()
        
        // 사용자 결제 상태에 따라 항목당 하이라이트 데이터 저장 제한을 두는 함수
        function highlightPost() {

            // 항목 값을 pk로 전달하는 함수
            const data = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',      
                },
            }
        
            fetch(`/api/highlights/premium/${siteId}`, data)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    
                    // 전달 받은 값이 True 값이면 데이터를 저장한다.
                    if (data) {
                        const data = setFetchData('POST', {

                            content_text : hightext,
                            content_location: {start: start, end: end},
                            site: siteId,

                        })
        
                        fetch('/api/highlights', data)        
                            .then((response) => response.json())
                            .then((data) => {

                                console.log(data)
                                highlightRetrieve()  
                                getSideText()       
                                btn.style.display = 'none'

                            });
                        } else {
                            // False 값을 반환 받으면 하이라이트를 저장 할 수 없다.
                            alert("더 이상 하이라이트를 저장하실 수 없습니다.")
                        }
                    })
                }
            })
        }

// Detail뷰 진입시 해당 목록에 저장되어 있는 하이라이트를 불러오는 함수
function highlightRetrieve() {

    const text = getElement('#root');

        const data = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',      
            },
        }

        fetch(`/api/highlights/${siteId}`, data)
            .then((response) => response.json())  
            .then((data) => {
                data.forEach(({id ,content_text}) => {
                    text.innerHTML = text.innerHTML.replace(content_text, `<span class='highlight-selected ${id}'>${content_text}</span>`)
                });
            });
}

export {
    highlighClickEvent,
    highlightRetrieve
};



