from django.urls import path
from . import views

app_name = 'demo_app'
urlpatterns = [
    path('', views.todos, name='todos'),
    path('data', views.todo_data, name='todo_data'),
    path('notedata', views.note_data, name='note_data'),
    path('notes/', views.notes, name='notes'),
]
