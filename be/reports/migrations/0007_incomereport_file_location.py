# Generated by Django 3.0.4 on 2020-03-22 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0006_incomereport_credit_kudos_report_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='incomereport',
            name='file_location',
            field=models.TextField(blank=True),
        ),
    ]
