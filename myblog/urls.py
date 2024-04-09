from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import my_custom_error_view

handler404 = 'myblog.views.my_custom_page_not_found_view'
handler500 = my_custom_error_view

urlpatterns = [
    path('', views.index, name='index'),
    path('blog/', views.blogs, name='blogs-list'),
    path('blog/<int:blog_id>/', views.single_blog, name='single-blog'),
]





if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        # استفاده از تابع lambda برای ارسال پارامتر exception به تابع مورد نظر
        path('test-404/', lambda request: views.my_custom_page_not_found_view(request, None)),
    ]



