# Generated by Django 5.0 on 2024-01-10 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecom', '0010_flavor_flavorimage_flavortoproduct_delete_test_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullnam', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.TextField()),
            ],
        ),
    ]
