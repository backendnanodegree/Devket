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