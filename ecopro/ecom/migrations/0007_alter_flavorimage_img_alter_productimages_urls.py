# Generated by Django 5.0 on 2024-01-10 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecom', '0006_remove_producttoimage_image_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flavorimage',
            name='img',
            field=models.ImageField(upload_to='media/flavors/%y/%m/%d'),
        ),
        migrations.AlterField(
            model_name='productimages',
            name='urls',
            field=models.ImageField(upload_to='media/products/%y/%m/%d'),
        ),
    ]
