# Generated by Django 3.2.13 on 2022-11-09 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocket', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='host_name',
            field=models.CharField(default=1, max_length=500, verbose_name='호스트명'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='list',
            name='url',
            field=models.CharField(max_length=2000, null=True, verbose_name='url'),
        ),
        migrations.AlterField(
            model_name='list',
            name='thumbnail_url',
            field=models.CharField(max_length=2000, verbose_name='썸네일주소'),
        ),
    ]
