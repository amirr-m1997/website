from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .forms import *
from django.shortcuts import render
from jdatetime import datetime as jdatetime


# Indexدریافت اطلاعات فرم صفحه اول مربوط ب مدل
def index(request):
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        description = request.POST['description']

        person = Index(name=name, email=email, description=description)
        person.save()
    blogs = Blog.objects.all()
    persons = Person.objects.all()
    context = {
        'persons': persons,
        'blogs': blogs,
    }
    # now = jdatetime.now()
    return render(request, 'index.html', context)





#  قسمت وبلاگ --->ارسال از ديتابيس ب فرانت مربوط به مدل Blog
def blogs(request):
    blogs = Blog.objects.all()
    return render(request, 'blogs-page.html', {'blogs': blogs})



# Person دریافت از فرانت و ذخیره در دیتابیس مربوط به مدل

def single_blog(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        description = request.POST['description']
        approved = False
        published = jdatetime.now().strftime('%Y-%m-%d %H:%M:%S')
        parent_id = request.POST.get('parent_id')
        person = Person(name=name, email=email, description=description, published=published, blog=blog,parent_id=parent_id)
        try:
            parent_id = int(request.POST.get('parent_id'))
        except:
            parent_id = None
        if parent_id:
            parent = Person.objects.get(id=parent_id)
            person.parent = parent
        person.save()
        return redirect('index')
    persons = Person.objects.filter(approved=True, blog=blog)

    context = {
        'persons': persons,
        'blog': blog,
    }

    now = jdatetime.now()
    return render(request, 'single-blog.html', context)




