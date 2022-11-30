from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from .iamport import Iamport
import hashlib
import time

class User(models.Model):
    """ 사용자 계정에 대한 정보 모델 """

    name                        = models.CharField(verbose_name='이름', max_length = 20)
    password                    = models.CharField(verbose_name='비밀번호', max_length = 15)
    introduce                   = models.TextField(verbose_name='자기소개', max_length = 200)
    profile_picture             = models.ImageField(verbose_name='프로필사진', null=True, upload_to=f"profile/", blank=True)
    blog_url                    = models.CharField(verbose_name='블로그url', max_length = 250)

    # Payment_status choices
    PAYMENT_ON                  = 1
    PAYMENT_OFF                 = 0

    PAYMENT_CHOICES             = [
                                    {PAYMENT_ON, '결제'},
                                    {PAYMENT_OFF, '미결제'}
                                  ]
    
    payment_status              = models.IntegerField(choices=PAYMENT_CHOICES, default=PAYMENT_OFF, verbose_name='결제상태')
    card_number                 = models.IntegerField(verbose_name='카드번호')
    cvc                         = models.IntegerField(verbose_name='cvc')
    expiration_date             = models.IntegerField(verbose_name='카드유효기간')
    created_at                  = models.DateTimeField(verbose_name='생성일', auto_now_add=True)
    updated_at                  = models.DateTimeField(verbose_name='갱신일', auto_now=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name            = '유저'
        verbose_name_plural     = '유저 목록'


class Email(models.Model):
    """ 사용자 이메일과 관련된 모델 """

    email                       = models.EmailField(verbose_name='이메일', max_length=30, primary_key=True)
    user                        = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저')

    # authentication_check choices
    CHECK                       = 1
    NOT_CHECK                   = 0

    AUTHENTICATION_CHOICES      = [
                                    {CHECK, '인증'},
                                    {NOT_CHECK, '미인증'}
                                 ]

    authentication_check        = models.IntegerField(choices=AUTHENTICATION_CHOICES, default=NOT_CHECK, verbose_name='이메일 인증 여부')
    signup_email                = models.BooleanField(verbose_name='기본이메일', default=True)
    created_at                  = models.DateTimeField(verbose_name='생성일', auto_now_add=True)
    updated_at                  = models.DateTimeField(verbose_name='갱신일', auto_now=True)

    def __str__(self):
        return f"{self.email} ({self.get_authentication_check_display()})"

    class Meta:
        verbose_name            = '이메일'
        verbose_name_plural     = '이메일 목록'


class Site(models.Model):
    """ 항목에 관한 데이터 모델 """

    title                       = models.CharField(verbose_name='타이틀', max_length=100)
    user                        = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저')
    url                         = models.CharField(verbose_name='url', max_length=2000, null=True)
    thumbnail_url               = models.CharField(verbose_name='썸네일주소', max_length=2000)
    host_name                   = models.CharField(verbose_name='호스트명', max_length=500)
    content                     = models.TextField(verbose_name='컨텐츠')

    # category choices
    CATEGORY_CHOICES            = [(1, 'python'), (2, 'django'), (3, 'javascript'), (4, 'orm'), (5, 'mysql'), (6, 'drf'), (7, 'docker'), (8, 'os'), (9, 'aws'), (10, 'html'), (11, 'css'), (12, 'git'), (13, 'linux')]

    category                    = models.IntegerField(verbose_name='카테고리', choices=CATEGORY_CHOICES)
    favorite                    = models.BooleanField(verbose_name='즐겨찾기', default=False)
    video                       = models.BooleanField(verbose_name='비디오', default=False)
    created_at                  = models.DateTimeField(verbose_name='생성일', auto_now_add=True)
    updated_at                  = models.DateTimeField(verbose_name='갱신일', auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"

    class Meta:
        verbose_name            = '항목'
        verbose_name_plural     = '항목 목록'


class Highlight(models.Model):
    """ 항목 하이라이트 기능 모델 """

    site                        = models.ForeignKey(Site, on_delete=models.CASCADE, verbose_name='리스트')
    content_text                = models.TextField(verbose_name='컨텐츠문구')
    content_location            = models.JSONField(verbose_name='컨텐츠위치', default=dict)

    def __str__(self):
        return f"{self.content}"

    class Meta:
        verbose_name            = '하이라이트'
        verbose_name_plural     = '하이라이트 목록'


class Tag(models.Model):
    """ 웹 항목 태그 목록 모델  """
    name                        = models.CharField(verbose_name='이름', max_length=20)
    site                        = models.ManyToManyField(Site, verbose_name='리스트')

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name            = '태그'
        verbose_name_plural     = '태그 목록'



class PaymentManager(models.Manager):

    imp = Iamport()

    def create_new(self, user, amount, type):
        """
        새로운 결제 모델 인스턴스 생성하기
        """
        if not user: 
            raise ValueError("Can't find user")
        
        # merchant_id 암호화하기
        user_hash               = hashlib.sha1(str(user.id).encode('utf-8')).hexdigest()[:5]
        time_hash               = hashlib.sha1(str(int(time.time())).encode('utf-8')).hexdigest()[-5:]
        merchant_id             = hashlib.sha1((user_hash + time_hash).encode('utf-8')).hexdigest()[:10]

        # 아임 포트에 통보
        PaymentManager.imp.prepare_payments(merchant_id, amount)

        new_payment             = self.model(
                                    user        =user, 
                                    merchant_id =merchant_id,
                                    amount      =int(amount),
                                    type        =type
                                 )
        
        try:
            new_payment.save() 
        
        except Exception as e:
            print(f'save error: {e}')
        
        return new_payment.merchant_id

    
    def get_transaction(self, merchant_id):
        """
        주문번호와 결제 상태로 아임 포트로부터 원하는 주문내역 조회하기
        """

        result                  = PaymentManager.imp.find_transaction(merchant_id)

        if result['status'] == 'paid' or 'failed':
            return result
        else:
            return None
    

    def all_for_user(self, user):
        """
        해당 유저에 대한 모든 결제 정보 가져오기
        """

        return super(PaymentManager, self).filter(user=user)

class Payment(models.Model):
    """ 결제 정보 모델 """

    user                        = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저')
    payment_id                  = models.CharField(verbose_name='결제번호', max_length=120, null=True, blank=True, unique=True)
    merchant_id                 = models.CharField(verbose_name='주문번호' , max_length=120, unique=True)
    amount                      = models.PositiveIntegerField(verbose_name='결제 금액', default=100)
    payment_date                = models.DateTimeField(verbose_name='결제갱신일', auto_now_add=True)
    
    PAYMENT_TYPE_CHOICES        = [{'card', '신용카드'}]
    type                        = models.CharField(verbose_name='결제 수단', max_length=10, choices=PAYMENT_TYPE_CHOICES, default='card')
    
    STATUS_CHOICES              =[
                                  {'await', '결제대기'},
                                  {'paid', '결제성공'},
                                  {'failed', '결제실패'},
                                  {'cancelled', '결제취소'}
                                 ]
    status                      = models.CharField(verbose_name='결제상태', default='await', choices=STATUS_CHOICES, max_length=10)

    objects                     = PaymentManager()

    def __str__(self):
        return f"{self.merchant_id} {self.get_status_display()}"
        
    class Meta:
        verbose_name            = '결제'
        verbose_name_plural     = '결제 목록'



def payment_validation(sender, instance, created, *args, **kwargs):
    """
    Payment 객체 추가 후, 결제 검증하기
    """

    if instance.payment_id:
        iamport_transaction     = Payment.objects.get_transaction(merchant_id=instance.merchant_id)
        merchant_id             = iamport_transaction['merchant_id']
        imp_id                  = iamport_transaction['imp_id']
        amount                  = iamport_transaction['amount']

        local_transaction       = Payment.objects.filter(merchant_id=merchant_id,
                                                         payment_id=imp_id,
                                                         amount=amount
                                                         ).exists()
        
        # DB와 iamport 둘 중 한 곳에라도 없으면 비정상 거래
        if not iamport_transaction or not local_transaction:
            raise ValueError("비정상 거래입니다.")


# 결제 정보가 생성된 후, payment_validation 호출  
post_save.connect(payment_validation, sender=Payment)