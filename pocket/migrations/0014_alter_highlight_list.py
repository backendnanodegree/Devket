# Generated by Django 3.2.13 on 2022-11-10 13:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pocket', '0013_rename_content_highlight_content_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='highlight',
            name='list',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pocket.list', verbose_name='리스트'),
        ),
    ]
