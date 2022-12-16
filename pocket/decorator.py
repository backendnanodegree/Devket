from rest_framework.response import Response
from rest_framework          import status
from django.shortcuts        import get_list_or_404, get_object_or_404
from django.conf             import settings
from pocket.models           import Site
from functools               import wraps

import urllib.robotparser
import re
import jwt

def bulk_decorator(func):

    @wraps(func)
    def exec_func(self, request) -> func:

        pk_ids: list = self.request.data.get('pk_ids')

        sites = validate_ids(pk_ids)

        return func(self, request, sites=sites)
    
    def get_list(pk_ids: list) -> Site:
        
        return get_list_or_404(Site, id__in=pk_ids)
    
    def validate_ids(pk_ids: list) -> Site:

        for id in pk_ids:
            get_object_or_404(Site,id=id)

        return get_list(pk_ids)

    return exec_func
    
def scrap_decorator(func):
    header = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    validation: object = re.compile('^(https|http)')

    @wraps(func)
    def exec_func(self, request, **kwards) -> func:
        # path 파라미터 -> request body 파라미터로 전달 변경
        url: str = self.request.data.get('url')

        if access(scheme(slash(url)), header):
            # Issue : scheme가 붙어있지 않으면 파싱 불가
            kwards['url'] = scheme(url)
            kwards['access'] = True  

            return func(self, request, **kwards)

        else:
            # Issue : 데코레이터에서 return 값을 http가 들어있지 않은 함수를 return 할 경우 에러 발생
            kwards['url'] = scheme(url)
            kwards['access'] = False  

            return func(self, request, **kwards)
    
    def scheme(url: str) -> str:
        ''' 
        프로토콜 추가
        '''

        url = f'https://{url}' if not validation.match(url) else url   
        return url

    def slash(url: str) -> str:
        ''' 
        Trailing slash 적용
        '''

        url = url if url[-1] == '/' else f'{url}/'
        return url

    # Issue : 접근 여부를 확인할때 try exception을 걸지않으면 어디서 에러가 났는지 찾기 어려움
    def access(url: str, header: dict) -> bool:
        '''
        robots.txt 검사
        '''
        
        result: dict = {}
        try: 
            robots: urllib.robotparser.RobotFileParser = urllib.robotparser.RobotFileParser(url + 'robots.txt')
            robots.read()  
            check: bool = robots.can_fetch(header['User-Agent'], url)
        except ValueError as e:
            raise ValueError(e.args)
        
        return check

    return exec_func

def login_decorator(func):
    """ login 이후 작업의 access토큰 확인하는 decorator"""

    @wraps(func)
    def exec_func(self, request, **kwards) -> func:
        token = request.COOKIES.get('access')

        if not token:
            return Response({'msg':'No Authentication'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # jwt decode함수를 이용하여 암호화된 access token 복호화
            # RefreshToken.for_user(user=user)를 이용하여 token발행 시 SIGNING_KEY와 발행 ALGORITHM을 사용하기 때문에 
            # decode시에도 해당 토큰을 SIGNING_KEY와 발생시 사용되었던 ALGORITHM으로 복화화 처리
            # 여기서 SIGNING_KEY는 Django의 SECRET KEY를 사용
            decodedPayload = jwt.decode(token, settings.SIMPLE_JWT['SIGNING_KEY'], algorithms=settings.SIMPLE_JWT['ALGORITHM'])
            kwards['user_id'] = decodedPayload['user_id']

        except jwt.ExpiredSignatureError:
            return Response({'msg':'No Authentication'}, status=status.HTTP_400_BAD_REQUEST)

        return func(self, request, **kwards)

    return exec_func