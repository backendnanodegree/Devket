from django.shortcuts     import get_object_or_404, redirect, render
from django.views.generic import TemplateView
from django.db            import transaction
from django.db.models     import Q, Count

from rest_framework.views    import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework          import status

from pocket.decorator   import bulk_decorator, login_decorator, scrap_decorator
from pocket.serializers import  LoginSerializer, SiteSerializer, TagSerializer, HighlightSerializer
from pocket.models      import Email, Site, Tag, User, Payment, Highlight

from urllib.parse import urlparse
from bs4          import BeautifulSoup

import requests

class SignupAPIView(APIView):
    """ 회원가입 등록을 위한 api """

    def post(self, request): 
        """
            User 데이터 저장 후 Email을 저장
            - 하나의 User 데이터에 다중 Email 정보가 들어가기 때문에 Email 모델이 분리되어 있음
        """

        try:
            # 클라이언트단에서 request body 파라미터로 보내줘야 하기 때문에 변경
            # request.GET['email']방식 => self.request.data.get('email') 방식
            email    : str = self.request.data.get('email')
            password : str = self.request.data.get('password')

            with transaction.atomic():
                userModel  = User.objects.create_user(password=password)
                emailModel = Email.objects.create(user=userModel, email=email)

            return Response({'msg':'Success signup'}, status=status.HTTP_200_OK)

        except KeyError as k:
            return Response({'msg':f'ERROR: Signup process KeyError that Class SignupAPIView : {k.args}'}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(GenericAPIView):
    serializer_class       = LoginSerializer
    
    def post(self, request):
        serializer         = self.get_serializer(data=request.data)
        
        serializer.is_valid(raise_exception = True)
        token              = serializer.validated_data
        
        res                = Response()
        res.set_cookie("access",  token["access_token"],  httponly=True)
        res.set_cookie("refresh", token["refresh_token"], httponly=True)
        res.data           = {
                             "jwt": token["access_token"]
        }

        return res


class LogoutAPIView(APIView):
    """ 로그아웃 관련 api """

    def get(self, request):
        res                = Response()
        try:
            res.delete_cookie('access')
            res.delete_cookie('refresh')

            res.data    = ({'msg':'Success logout'})
            res.status  = status.HTTP_200_OK 

        except:
            res.data    = ({'msg':'Failure logout'})
            res.status  = status.HTTP_400_BAD_REQUEST

        return res

# template view
def site_detail_view(request, pk):
    """
    mylist/base.html에 각 항목들에 대한 조회 view_url 연결
    """

    if request.method == 'GET': 

        return render(request, 'mylist/detail/detail.html', {'pk' : pk})


def mylist_view(request):
    """
    mylist/base.html과 모든 항목에 대한 조회 view_url을 연결
    """
    
    if request.method == 'GET': 

        return render(request, 'mylist/base.html')

class HomeView(TemplateView):
    template_name = "common/home.html"

    def get(self, request, *args, **kwargs):

        # 로그인 전 후 header를 분기하기 위한 키워드인자 전달  
        kwargs['login'] = request.COOKIES.get('access')
        return super().get(request, *args, **kwargs)


class SignUpView(TemplateView):
    template_name = "user/signup.html"


class LogInView(TemplateView):
    template_name = "user/login.html"

    def get(self, request, **kwargs):

        access_token = request.COOKIES.get('access')

        # 토큰 존재 시 로그인 화면 접근 불가(홈화면 이동)
        if access_token:
            return redirect('home')
        else:
            # 토큰 존재하지 않은경우 로그인 화면 접근
            context = self.get_context_data(**kwargs)
            return self.render_to_response(context)


class PwdHelpView(TemplateView):
    template_name = 'user/password.html'


class PremiumView(TemplateView):
    template_name = 'premium/base.html'


class PaymentView(TemplateView):
    template_name = 'premium/payment.html'


# api view
class SiteAPIView(APIView):
    """
    저장한 모든 항목 데이터 api
    """

    @login_decorator
    def get(self, request, **kwards): 
        word: str = request.GET['word']              
        list_qs   = Site.objects.filter(
                        Q(user=kwards['user_id'])&(
                        Q(title__contains=word)|
                        Q(host_name__contains=word)))
        
        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)

class SiteDetailViewAPIView(APIView):
    """
    항목 상세화면 조회 api
    """

    def get_object(self, pk):
        
        return get_object_or_404(Site, pk=pk)

    @login_decorator
    def get(self, request, **kwards): 

        site = self.get_object(pk=kwards['pk'])
        serializer  = SiteSerializer(site)

        return Response(serializer.data)

class HighlightAPIView(APIView):
    """
    하이라이트 조회, 저장, 삭제 API
    """

    @login_decorator
    def get(self, request, **kwards):

        queryset   = Highlight.objects.filter(site=kwards['pk'])
        serializer = HighlightSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):

        serializer                  = HighlightSerializer(data=request.data)

        serializer.is_valid()

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        
        highlight                   = Highlight.objects.filter(id=pk)  
        
        highlight.delete()

        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_200_OK)



class HighlightListAPIView(APIView):
    """
    mylist 화면 하이라이트 탭에서 하이라이트가 적용된 항목들을 불러오는 API
    """

    @login_decorator
    def get(self, request, **kwards):
        word: str        = request.GET['word'] 
        custom_highlight = Site.objects.annotate(count=Count('highlight'))
        highlight_qs     = custom_highlight.filter(
                                        (Q(user=kwards['user_id'])&
                                         Q(count__gt=0))&(
                                         Q(title__contains=word)|
                                         Q(host_name__contains=word))).order_by('created_at').distinct()

        serializer = SiteSerializer(highlight_qs, many=True)

        return Response(serializer.data)


class HighlightPremiumAPIView(APIView):
    """ 
    결제 상태를 확인받아 하이라이트 기능 제한을 두는 API
    """
    complete_payment = 1
    limit = 3

    @login_decorator
    def get(self, request, **kwards):
        """ 
        사용자 모델에서 결제 상태 값을 가져오는 변수 
        """
        
        user_info = User.objects.filter(id=kwards['user_id']).values('payment_status').last()
        highlight = Highlight.objects.filter(site=kwards['pk'])
        highlight_object = highlight.count()

        if user_info['payment_status'] == self.complete_payment:
            return Response(True)

        elif highlight_object < self.limit :
            return Response(True)

        else :
            return Response(False)


class SiteDetailAPIView(APIView):
    """
    세부 항목 조회, 수정, 삭제 api
    """

    def get_object(self, pk):
        
        return get_object_or_404(Site, pk=pk)


    def get(self, request, pk): 

        site = self.get_object(pk)

        serializer  = SiteSerializer(site)

        return Response(serializer.data)
    

    def put(self, request, pk):
        
        site = self.get_object(pk)

        serializer = SiteSerializer(site, data=request.data, partial=True)
    
        if serializer.is_valid(raise_exception=True):
     
            serializer.save()
            
            return Response({'msg':'Updated successfully'}, status=status.HTTP_202_ACCEPTED)
      
        return Response({'msg': f'{serializer.errors}'})


    def delete(self, request, pk):

        site = self.get_object(pk)
        
        site.delete()
    
        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_200_OK)


class SiteBulkAPIView(APIView):
    """
    벌크 항목 즐겨찾기, 삭제 api
    """

    @bulk_decorator
    def put(self, request, **kwards):
        """
        Site 벌크 즐겨찾기 추가
        """ 
        try:
            with transaction.atomic():
                '''트랜젝션 시작'''

                for site in kwards['sites']:
                    site.favorite = self.request.data.get('favorite')
                    site.save()
        except:
            raise Response({'msg':'Updated failed'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'msg':'Updated successfully'}, status=status.HTTP_200_OK)

    @bulk_decorator
    def delete(self, request, **kwards):
        """
        Site 벌크 삭제
        """        
        with transaction.atomic():
            '''트랜젝션 시작'''

            for site in kwards['sites']:
                site.delete()
    
        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_200_OK)  


class SiteTagsAPIView(APIView):
    """
    벌크 태그 api
    """

    @login_decorator
    def get(self, request, **kwards):
        """
        Site 태그 선택으로 조회
        """ 

        sites =  Site.objects.filter(
                            user=kwards['user_id'],
                            tag=kwards['pk'])
        
        serializer = SiteSerializer(sites, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
 
    @bulk_decorator
    def post(self, request, **kwards):
        """
        Site 태그 추가
        """ 
        sites = kwards['sites']
        tags  = self.request.data.get('tags')

        with transaction.atomic():
            '''트랜젝션 시작'''
            
            created_tags = [Tag.objects.get_or_create(name=tag)[0] for tag in tags]

            [tag.site.add(site.id) for tag in created_tags for site in sites]
        
        return Response({'msg':'Add tag successfully'}, status=status.HTTP_200_OK)

class FavoriteAPIView(APIView):
    """
    각 항목의 즐겨찾기 값 수정 api
    """

    @login_decorator
    def get(self, request, **kwards): 
        word: str  = request.GET['word']
        list_qs    = Site.objects.filter(
                                    (Q(user=kwards['user_id'])&
                                     Q(favorite=True))&(
                                     Q(title__contains=word)|
                                     Q(host_name__contains=word)))  

        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ArticleAPIView(APIView):
    """
    video가 아닌 항목 조회 api
    """

    @login_decorator
    def get(self, request, **kwards): 
        word: str  = request.GET['word']   
        list_qs    = Site.objects.filter((
                            Q(user=kwards['user_id'])& 
                            Q(video=False))&(
                            Q(title__contains=word)|
                            Q(host_name__contains=word)))

        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class VideoAPIView(APIView):
    """
     video가 포함된 항목 조회 api
    """
    
    @login_decorator
    def get(self, request, **kwards):
        word: str  = request.GET['word'] 
        list_qs    = Site.objects.filter((
                        Q(user=kwards['user_id'])&
                        Q(video=True))&(
                        Q(title__contains=word)|
                        Q(host_name__contains=word)))

        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class TagsAPIView(APIView):
    """
     Site model에 Tag model값이 존재하는 것만 조회
    """

    @login_decorator
    def get(self, request, **kwards):
        """
        Site 태그 조회
        """ 

        # 사용자에 등록된 모든 site 조회
        sites = Site.objects.filter(user=kwards['user_id'])
        
        # 해당 사이트에 걸려있는 모든 tag 조회 단, 중복제거를 위해 set 변경
        tags = set([tag for site in sites for tag in site.tag_set.all()])

        serializer = TagSerializer(tags, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class SiteByTagAPIView(APIView):
    """
     Site model에 Tag model값이 존재하는 것만 조회
    """

    @login_decorator
    def get(self, request, **kwards):
        word: str  = request.GET['word']

        custom_list = Site.objects.annotate(cnt=Count('tag'))
        list_qs     = custom_list.filter(
                                    (Q(user=kwards['user_id'])&
                                    Q(cnt__gt=0))&(
                                    Q(title__contains=word)|
                                    Q(host_name__contains=word))).order_by('created_at').distinct()

        serializer = SiteSerializer(list_qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

        
class ParseAPIView(APIView):
    @login_decorator
    @scrap_decorator
    def post(self, request, **kwards):
        video_type, title, image, url = '', '', '', ''
        try:
            # 접근 여부(데코레이터를 통해 반환)
            if kwards['access']:

                request_url: Response   = requests.get(kwards['url'], allow_redirects=False)
                request_url.encoding    = request_url.apparent_encoding
        
                # html 객체로 변환  
                web: BeautifulSoup      = BeautifulSoup(request_url.text, 'html.parser')    
                if web.find("meta", property="og:type"):
                    video_type = web.find("meta", property="og:type")['content']

                if web.find("meta", property="og:url"):
                    url = web.find("meta", property="og:url")['content']

                if web.find("meta", property="og:title"):
                    title = web.find("meta", property="og:title")['content']
                elif web.find("meta", property="og:site_name"):
                    title = web.find("meta", property="og:site_name")['content']

                if web.find("meta", property="og:image"):
                    image = web.find("meta", property="og:image")['content']
                else:
                    image = ''
                
                # title과 url이 없으면 저장 불가
                if title != '' and url != '':
                    content: str = self.parse(web)

                    with transaction.atomic():
                        '''트랜젝션 시작'''

                        user: User = User.objects.filter(id=kwards['user_id'])
                        
                        if user.exists():
                            user = user.last()

                        site = Site.objects.create(
                            title           = title,
                            user            = user,
                            category        = 0,
                            url             = url,
                            host_name       = urlparse(url).hostname,
                            thumbnail_url   = image,
                            favorite        = False,
                            video           = True if 'video' in video_type else False,
                            content         = content,
                        )

                    return Response({'msg':'Success save that web site'}, status=status.HTTP_200_OK)

                else:
                    return Response({'msg':'Do not save that web site'}, status=status.HTTP_202_ACCEPTED)

            else:
                return Response({'msg':'Do not access that web site'}, status=status.HTTP_202_ACCEPTED)
                                
        except SyntaxError as s:
            return Response({'msg':f'Save list process SyntaxError that Class ParseAPIView: {s.args}'}, status=status.HTTP_400_BAD_REQUEST)

        except NameError as n:
            return Response({'msg':f'Save list process NameError that Class ParseAPIView : {n.args}'}, status=status.HTTP_400_BAD_REQUEST)
            
        except KeyError as k:
            return Response({'msg':f'Save list process KeyError that Class ParseAPIView : {k.args}'}, status=status.HTTP_400_BAD_REQUEST)

    def parse(self, web: object) -> str:
        ''' 
        html 파싱 
        '''

        try:
            html: str = str(web.main)

        except Exception as e:       
            raise RuntimeError(f'Function parse Exception error that Class ParseAPIView : {e.args}')
        
        return html


###### payment #####
class PaymentPassView(APIView):
    """
    생성한 주문번호를 아임포트 결제 창에 전달하는 api
    """

    def post(self, request):

        if not request.user.is_authenticated: 
            return Response({"authenticated": False}, status=401)
        
        amount                  = 100 
        user                    = request.user 
        payment_type            = request.data['type']

        try: 
            merchant_id         = Payment.objects.create_new(
                                    user=user, 
                                    amount=amount,
                                    type=payment_type,
                                  )
        
        except ValueError:
            merchant_id         = None
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if merchant_id is not None:
            data                = {
                                    "works": True, 
                                    "merchant_id": merchant_id,
                                    "amount": amount, 
                                  }
            return Response(data, status=status.HTTP_200_OK)

class PaymentImpStoreView(APIView):
    """
    아임포트에서 보낸 결제번호를 DB에 저장하는 api
    """
    
    def post(self, request):

        if not request.user.is_authenticated: 
            return Response({"authenticated": False}, status=401)

        user                    = request.user
        imp_id                  = request.data['imp_id']
        amount                  = request.data['amount']
        merchant_id             = request.data['merchant_id']
        payment_status          = request.data['payment_status']
        
        payment                 = Payment.objects.get(
                                    user=user,
                                    merchant_id=merchant_id,
                                    amount=amount
                                  )
        
        if payment is not None:
            payment.payment_id  = imp_id 
            payment.status      = payment_status
            payment.save()
            data                = {'works': True}

            return Response(data, status=status.HTTP_200_OK)
        
        else: 
            payment.status      = 'failed'
            payment.save()
            data                = {'works': False}

            return Response(data, {'msg':"Can't find a payment object with merchant_id passed"}, status=status.HTTP_400_BAD_REQUEST)


class MakeStatusFailed(APIView):
    """
    사용자 변심으로 결제 취소 시, payment의 status를 failed로 변경하는 api
    """

    def post(self, request):

        imp_id                      = request.data['imp_id']
        merchant_id                 = request.data['merchant_id']
        payment                     = Payment.objects.get(merchant_id=merchant_id)
        
        if payment is not None: 
            payment.payment_id      = imp_id
            payment.status          = 'failed'
            payment.save()
            data                    = {'works': True}

            return Response(data, status=status.HTTP_200_OK)
        
        else:
            data                    = {'works': False}
            
            return Response(data, {'msg':"Can't find a payment object with merchant_id passed"}, status=status.HTTP_400_BAD_REQUEST)
