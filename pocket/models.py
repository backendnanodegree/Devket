from django.db import models
class User(models.Model):
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
