from django import forms
from .models import *

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = '__all__'


class ReplyForm(forms.Form):
    name = forms.CharField(max_length=30, label='نام')
    email = forms.EmailField(label='ایمیل')
    description = forms.CharField(widget=forms.Textarea, label='پاسخ')

class BlogForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = '__all__'


