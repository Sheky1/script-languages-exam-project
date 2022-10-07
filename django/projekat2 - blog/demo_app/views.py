from django.shortcuts import render
from .models import Todo, Note
from django.http import JsonResponse
from django.core import serializers

def todo_data(request):
    dataset = Todo.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)

def note_data(request):
    dataset = Note.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)

def todos(request):
    return render(request, 'todos.html', {})

def notes(request):
    return render(request, 'notes.html', {})
