from django.db import models
class User(models.Model):
    """ 노경민 : 사용자 모델 추가 """
    name = models.CharField(verbose_name='이름', max_length = 20)
    password = models.CharField(verbose_name='비밀번호', max_length = 15)
    introduce = models.TextField(verbose_name='자기소개', max_length = 200)
    profile_picture = models.ImageField(verbose_name='프로필사진', null=True, upload_to=f"profile/", blank=True)
    blog_url = models.CharField(verbose_name='블로그url', max_length = 250)

    # Payment_status choices
    PAYMENT_ON = '1'
    PAYMENT_OFF = '0'

    PAYMENT_CHOICES = [
        {PAYMENT_ON, '결제'},
        {PAYMENT_OFF, '미결제'}
    ]
    
    payment_status = models.CharField(max_length=1, choices=PAYMENT_CHOICES, default=PAYMENT_OFF)
    card_number = models.IntegerField(verbose_name='카드번호')
    cvc = models.IntegerField(verbose_name='cvc')
    expiration_date = models.IntegerField(verbose_name='카드유효기간')
    created_at = models.DateTimeField(verbose_name='생성일', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='갱신일', auto_now=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = '유저'
        verbose_name_plural = '유저 목록'


class Email(models.Model):
    """ 노경민 : 이메일 모델 추가 """

    email = models.EmailField(verbose_name='이메일', max_length=30, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저')

    # authentication_check choices
    CHECK = '1'
    NOT_CHECK = '0'

    AUTHENTICATION_CHOICES = [
        {CHECK, '인증'},
        {NOT_CHECK, '미인증'}
    ]

    authentication_check = models.CharField(max_length=1, choices=AUTHENTICATION_CHOICES, default=NOT_CHECK)
    signup_email = models.BooleanField(verbose_name='기본이메일', default=True)
    created_at = models.DateTimeField(verbose_name='생성일', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='갱신일', auto_now=True)

    def __str__(self):
        return f"{self.email} ({self.get_authentication_check_display()})"

    class Meta:
        verbose_name = '이메일'
        verbose_name_plural = '이메일 목록'


class List(models.Model):
    """ 노경민 : 리스트 모델 추가 """

    title = models.CharField(verbose_name='타이틀', max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저')
    thumbnail_url = models.CharField(verbose_name='썸네일주소', max_length='500')
    content = models.TextField(verbose_name='컨텐츠')

    # category choices
    CATEGORY_CHOICES = [(1, 'python'), (2, 'django'), (3, 'javascript'), (4, 'orm'), (5, 'mysql'), (6, 'drf'), (7, 'docker'), (8, 'os'), (9, 'aws'), (10, 'html'), (11, 'css'), (12, 'git'), (13, 'linux')]

    category = models.IntegerField(verbose_name='카테고리', choices=CATEGORY_CHOICES)
    favorite = models.TextField(verbose_name='즐겨찾기')
    video = models.BooleanField(verbose_name='비디오', default=False)
    created_at = models.DateTimeField(verbose_name='생성일', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='갱신일', auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"

    class Meta:
        verbose_name = '항목'
        verbose_name_plural = '항목 목록'


class Highlight(models.Model):
    """ 노경민 : 하이라이트 모델 추가 """

    list = models.ForeignKey(List, on_delete=models.CASCADE, verbose_name='리스트')
    content = models.TextField(verbose_name='컨텐츠')

    def __str__(self):
        return f"{self.content}"

    class Meta:
        verbose_name = '하이라이트'
        verbose_name_plural = '하이라이트 목록'


class Tag(models.Model):
    """ 노경민 : 태그 모델 추가 """
    name = models.CharField(verbose_name='이름', max_length=20)
    list = models.ManyToManyField(List, verbose_name='리스트')

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = '태그'
        verbose_name_plural = '태그 목록'


class Payment(models.Model):
    """ 노경민 : 결제 모델 추가 """

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저')
    phone_number = models.IntegerField(verbose_name='휴대폰번호')
    zip_code = models.IntegerField(verbose_name='우편번호')

    """ 노경민 : 향후 payment_method의 choice에 결제방식 추가 수정 작업이 필요함  """
    # payment_method choices
    CARD = '0'


    PAYMENT_METHOD_CHOICES = [
        {CARD, '신용카드'}
    ]

    payment_method = models.CharField(max_length=1, choices=PAYMENT_METHOD_CHOICES, verbose_name='결제방식')
    payment_code = models.CharField(verbose_name='결제코드', max_length=30, primary_key=True)
    merchandise = models.CharField(verbose_name='상품명', max_length=15)
    payment_amount = models.DecimalField(verbose_name='결제총금액', max_digits=4, decimal_place=0)
    price = models.DecimalField(verbose_name='상품가격', max_digits=4, decimal_place=0)

    # status choices
    IS_DONE ='2'
    IS_AWAITING ='1'
    IS_CANCELLED ='0'

    STATUS_CHOICES =[
        {IS_DONE, '결제완료'},
        {IS_AWAITING, '결제대기'},
        {IS_CANCELLED, '결제취소'}
    ]

    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=IS_AWAITING)
    payment_date = models.IntegerField(verbose_name='결제갱신일')


    """ 노경민 : self_status_display()가 제대로 작동하는 함수인지 확인이 필요함 """
    def __str__(self):
        return f"{self.payment_code} {self.get_status_display()}"

    class Meta:
        verbose_name = '결제'
        verbose_name_plural = '결제 목록'

