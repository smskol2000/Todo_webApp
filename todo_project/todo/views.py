from django.shortcuts import render , redirect , get_object_or_404
from django.http import HttpRequest, HttpResponse , JsonResponse
from .models import Todo

def todo_list(request: HttpRequest) -> HttpResponse :

    todos = Todo.objects.all()

    if request.method == "POST":

        # add_task
        if request.POST.get("request") == "add_task":
            
            title = request.POST.get("title")
            
            todo = Todo.objects.create(title=title)
            
            return JsonResponse({
                "id": todo.id,
                "title": todo.title,
                "count": Todo.objects.count()
            })

        # edit_task
        if request.POST.get("request") == "edit_task":
            task_id = request.POST.get("task_id")

            new_title = request.POST.get("new_title")

            todo = get_object_or_404(Todo, id=task_id)
            
            todo.title = new_title
            todo.save()

            return JsonResponse({
                        "id": todo.id,
                        "title": todo.title,
            })

            

        # delete_task
        if request.POST.get("request") == "delete_task":
            task_id = request.POST.get("task_id")

            todo = get_object_or_404(Todo, id=task_id)

            todo.delete()
            
            return JsonResponse({
                            "id": task_id,
                            "count": Todo.objects.count()
                        })

        # clear_all
        if request.POST.get("request") == "clear all":
            
            Todo.objects.all().delete()

            return JsonResponse({
                            "count": 0
                        })

    todos = Todo.objects.all() 
        

    return render(
        request, 
        "todo/list.html", 
        {
            "todos": todos,
            "task_count": todos.count()

        }
        
    )


        






