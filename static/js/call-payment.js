import {getElement ,setFetchData} from './common.js';

window.onload = function () {
    const IMP = window.IMP;
    IMP.init('imp62676076');
    const paymentButton = getElement('.order')
    paymentButton.addEventListener('click', async (e) => {
        const type              = 'card';
        let buyer_name, buyer_email, merchant_id, amount, payment_info;
        payment_info            = await passPaymentInfo(e, type);
        [buyer_name, buyer_email, merchant_id, amount] = payment_info
        if (merchant_id !== '' && merchant_id !== undefined) {
            IMP.request_pay({
                pg: 'html5_inicis',
                merchant_uid: merchant_id,
                name: 'Devket Premium 서비스',
                pay_method: 'card',
                amount: amount,
                buyer_name : buyer_name,
                buyer_email : buyer_email
            },
            // 결제창 오픈
            function (response) {
                if (response.success) {
                    // 결제한 유저의 이름과 이메일 확인하고 결제 버튼 누른 후, 진행되는 로직 
                    let msg = '결제가 완료되었습니다.';
                    msg += '고유ID : ' + response.imp_uid;
                    msg += '상점 거래ID : ' + response.merchant_uid;
                    msg += '결제 금액 : ' + response.paid_amount;
                    storeImpIdInDB(e, response.merchant_uid, response.imp_uid, response.paid_amount, response.status);
                } else {
                    if (response.imp_uid) {
                        // 결제한 유저의 이름과 이메일 확인 후, 사용자 변심으로 결제 창을 닫아 결제 취소되는 로직
                        makeStatusFailure(e, response.merchant_uid, response.imp_uid);
                    }
                    let msg = '결제에 실패하였습니다. \n';
                    msg += '에러내용: ' + response.error_msg;
                    alert(msg)
                }
            });
        }
        return false;
    })
};

// IMP.request_pay를 호출하기 위한 merchant_id 반환
async function passPaymentInfo(e, type) {
    e.preventDefault(); 
    let merchant_id = ''
    let amount = 0
    let buyer_name = ''
    let buyer_email = ''
    const data = setFetchData('POST', {
        amount: amount, 
        type: type
    })
    const response = await fetch(`/api/payment/checkout`, data)
    const result   = await response.json() 
    if (result.works) {
        buyer_name = result.buyer_name 
        buyer_email = result.buyer_email
        merchant_id = result.merchant_id
        amount = result.amount
        return [buyer_name, buyer_email, merchant_id, amount]
    } else if (response.status === 401) {
        alert('로그인 해주세요.')
    } else {
        alert('문제가 발생했습니다. 다시 시도해주세요.')
    }};


// 결제 완료 후, 아임포트에서 보낸 결제번호를 DB에 저장
async function storeImpIdInDB(e, merchant_id, imp_id, amount, status) {
    e.preventDefault(); 
    const data = setFetchData('POST', {
        merchant_id: merchant_id,
        imp_id: imp_id,
        amount: amount,
        payment_status: status, 
    })
    const response = await fetch(`/api/payment/validation`, data)
    const result   = await response.json() 
    if (result.works) {
        alert('결제가 완료됐습니다.');
        window.location.href = location.origin+'/mylist/'
    } else {
        if (response.status === 404) {
            alert("페이지가 존재하지 않습니다.");
        } else if (response.status === 401) {
            alert("로그인 해주세요.");
        } else {
            alert("문제가 발생했습니다. 다시 시도해주세요.");
        }
    }
}

// transaction 실패 시, DB status 변경 요청하기
async function makeStatusFailure(e, merchant_id, imp_id) {
    e.preventDefault();
    const data      = setFetchData('POST', {merchant_id: merchant_id, imp_id: imp_id})
    const response  = await fetch(`/api/payment/failure`, data)
    const result    = await response.json() 
    if (result.works) {
        console.log('status 변경이 완료됐습니다.')
    } else {
        console.log('status 변경이 실패했습니다.')
    };
}