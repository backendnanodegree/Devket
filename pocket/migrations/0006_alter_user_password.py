# Generated by Django 3.2.13 on 2022-12-11 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocket', '0005_auto_20221209_1745'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=128, unique=True, verbose_name='비밀번호'),
        ),
    ]
