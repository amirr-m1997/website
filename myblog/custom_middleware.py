from django.http import HttpResponseNotFound
from myblog.views import my_custom_page_not_found_view

class CustomPageNotFoundMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response.status_code == 404:
            return my_custom_page_not_found_view(request, None)
        return response