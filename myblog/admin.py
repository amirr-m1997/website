from django.contrib import admin
from myblog.models import *

from django.contrib import admin


class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'published', 'approved', 'blog')
    list_filter = ('approved', 'blog')
    search_fields = ('name', 'email', 'description')
    actions = ['approve_comments', 'unapprove_comments']

    def approve_comments(self, request, queryset):
        queryset.update(approved=True)

    def unapprove_comments(self, request, queryset):
        queryset.update(approved=False)


admin.site.register(Person, CommentAdmin)
admin.site.register(Blog)
admin.site.register(Index)
