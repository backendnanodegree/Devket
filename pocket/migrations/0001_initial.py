# Generated by Django 3.2.13 on 2022-11-02 07:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='타이틀')),
                ('thumbnail_url', models.CharField(max_length=500, verbose_name='썸네일주소')),
                ('content', models.TextField(verbose_name='컨텐츠')),
                ('category', models.IntegerField(choices=[(1, 'python'), (2, 'django'), (3, 'javascript'), (4, 'orm'), (5, 'mysql'), (6, 'drf'), (7, 'docker'), (8, 'os'), (9, 'aws'), (10, 'html'), (11, 'css'), (12, 'git'), (13, 'linux')], verbose_name='카테고리')),
                ('favorite', models.TextField(verbose_name='즐겨찾기')),
                ('video', models.BooleanField(default=False, verbose_name='비디오')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='생성일')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='갱신일')),
            ],
            options={
                'verbose_name': '항목',
                'verbose_name_plural': '항목 목록',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, verbose_name='이름')),
                ('password', models.CharField(max_length=15, verbose_name='비밀번호')),
                ('introduce', models.TextField(max_length=200, verbose_name='자기소개')),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile/', verbose_name='프로필사진')),
                ('blog_url', models.CharField(max_length=250, verbose_name='블로그url')),
                ('payment_status', models.CharField(choices=[{'결제', '1'}, {'0', '미결제'}], default='0', max_length=3)),
                ('card_number', models.IntegerField(verbose_name='카드번호')),
                ('cvc', models.IntegerField(verbose_name='cvc')),
                ('expiration_date', models.IntegerField(verbose_name='카드유효기간')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='생성일')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='갱신일')),
            ],
            options={
                'verbose_name': '유저',
                'verbose_name_plural': '유저 목록',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, verbose_name='이름')),
                ('list', models.ManyToManyField(to='pocket.List', verbose_name='리스트')),
            ],
            options={
                'verbose_name': '태그',
                'verbose_name_plural': '태그 목록',
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('phone_number', models.IntegerField(verbose_name='휴대폰번호')),
                ('zip_code', models.IntegerField(verbose_name='우편번호')),
                ('payment_method', models.CharField(choices=[{'0', '신용카드'}], max_length=4, verbose_name='결제방식')),
                ('payment_code', models.CharField(max_length=30, primary_key=True, serialize=False, verbose_name='결제코드')),
                ('merchandise', models.CharField(max_length=15, verbose_name='상품명')),
                ('payment_amount', models.DecimalField(decimal_places=0, max_digits=4, verbose_name='결제총금액')),
                ('price', models.DecimalField(decimal_places=0, max_digits=4, verbose_name='상품가격')),
                ('status', models.CharField(choices=[{'결제완료', '2'}, {'결제대기', '1'}, {'0', '결제취소'}], default='1', max_length=4)),
                ('payment_date', models.IntegerField(verbose_name='결제갱신일')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pocket.user', verbose_name='유저')),
            ],
            options={
                'verbose_name': '결제',
                'verbose_name_plural': '결제 목록',
            },
        ),
        migrations.AddField(
            model_name='list',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pocket.user', verbose_name='유저'),
        ),
        migrations.CreateModel(
            name='Highlight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(verbose_name='컨텐츠')),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pocket.list', verbose_name='리스트')),
            ],
            options={
                'verbose_name': '하이라이트',
                'verbose_name_plural': '하이라이트 목록',
            },
        ),
        migrations.CreateModel(
            name='Email',
            fields=[
                ('email', models.EmailField(max_length=30, primary_key=True, serialize=False, verbose_name='이메일')),
                ('authentication_check', models.CharField(choices=[{'인증', '1'}, {'0', '미인증'}], default='0', max_length=3)),
                ('signup_email', models.BooleanField(default=True, verbose_name='기본이메일')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='생성일')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='갱신일')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pocket.user', verbose_name='유저')),
            ],
            options={
                'verbose_name': '이메일',
                'verbose_name_plural': '이메일 목록',
            },
        ),
    ]
