from rest_framework.response import Response
from functools import wraps
import urllib.robotparser
import re

def scrap_decorator(func):
    header = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    validation: object = re.compile('^(https|http)')

    @wraps(func)
    def exec_func(self, request) -> func:
        url: str = request.GET.get('url')

        if access(scheme(slash(url)), header): 
            # Issue : scheme가 붙어있지 않으면 파싱 불가
            return func(self, request, url=scheme(url), access=True)
        else:
            # Issue : 데코레이터에서 return 값을 http가 들어있지 않은 함수를 return 할 경우 에러 발생
            return func(self, request, url=scheme(url), access=False)
    
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