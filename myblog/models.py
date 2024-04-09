
from django.db import models
from jdatetime import datetime as jdatetime
from django.contrib.auth.models import User
from ckeditor_uploader.fields import RichTextUploadingField

# index page
class Index(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    description = RichTextUploadingField()

    # published = models.DateTimeField(default=timezone.now)
    # published = models.DateTimeField(default=jdatetime.now)

    def __str__(self):
        return self.name


# قسمت وبلاگ --->ارسال از ديتابيس ب فرانت
class Blog(models.Model):
    sub = models.CharField(max_length=45)
    Summary = models.CharField(max_length=100)
    image = models.ImageField(upload_to='media/')
    publisher = models.CharField(max_length=20, default='amir')
    description = RichTextUploadingField()
    published = models.DateTimeField(default=jdatetime.now)

    def __str__(self):
        return self.sub


# دریافت از فرانت و ذخیره در دیتابیس
class Person(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    description = RichTextUploadingField()
    published = models.DateTimeField(default=jdatetime.now)
    # published = models.DateTimeField(auto_now_add=True)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)  # اضافه شده
    approved = models.BooleanField(default=False)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
