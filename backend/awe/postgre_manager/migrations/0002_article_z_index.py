# Generated by Django 5.0.2 on 2024-03-16 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('postgre_manager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='z_index',
            field=models.IntegerField(default=0),
        ),
    ]