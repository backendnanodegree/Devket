import requests
from django.conf import settings


class Iamport():

    response_success            = 0
    iamport_api_url             = 'https://api.iamport.kr'

    def __init__(self): 
        
        self.imp_key            = settings.IMP_KEY
        self.imp_secret         = settings.IMP_SECRET


    def get_access_token(self): 
        """
        imp_key(API key) & imp_secret(API secret) 으로 access_token을 발급받기
        """

        access_data             = {
                                    'imp_key': self.imp_key, 
                                    'imp_secret': self.imp_secret
                                  }
        url                     = f'{Iamport.iamport_api_url}/users/getToken'
        response                = requests.post(url, data=access_data)
        res_json                = response.json()

        if res_json['code'] == Iamport.response_success: 
            access_token        = res_json['response']['access_token']
            return access_token
        
        elif response.status_code == 401:
            raise ValueError('imp_key, imp_secret 인증에 실패했습니다.')


    def prepare_payments(self, merchant_id, amount):
        """
        인증방식의 결제 진행 과정에서 결제금액 위변 시, 결제 진행 자체를 막기 위해 결제 예정금액을 사전등록하는 과정
        """
        
        access_token            = self.get_access_token()
        url                     = f'{Iamport.iamport_api_url}/payments/prepare'

        if access_token:
            access_data         = {
                                    'merchant_uid': merchant_id, 
                                    'amount': int(amount)
                                  }
            headers             = {'Authorization': access_token}
            response            = requests.post(url, data=access_data, headers=headers)
            res_json            = response.json()
            
            if res_json['code'] != self.response_success: 
                raise ValueError('merchant_id 또는 amount 정보가 잘못되었습니다.')
                
        else:
            raise ValueError('인증 토큰이 존재하지 않습니다.')


    def find_transaction(self, merchant_id):
        """
        주문번호로 아임 포트 내에 결제내역 확인
        """

        access_token            = self.get_access_token()

        if access_token:
            url                 = f"{Iamport.iamport_api_url}/payments/find/{merchant_id}"
            headers             = {'Authorization': access_token}
            response            = requests.post(url, headers=headers)
            res_json            = response.json()

            if res_json['code'] == Iamport.response_success:
                context         = {
                                    'imp_id': res_json['response']['imp_uid'],
                                    'merchant_id': res_json['response']['merchant_uid'],
                                    'amount': res_json['response']['amount'],
                                    'status': res_json['response']['status'],
                                    'type': res_json['response']['pay_method'],
                                    'receipt_url': res_json['response']['receipt_url']
                                  }
                return context
            
            elif response.status_code == 404:
                raise ValueError('거래건이 존재하지 않습니다.') 
                
        else:
            raise ValueError('인증 토큰이 존재하지 않습니다.')
