from django.db import models

# defining ToDo Model

class Todo(models.Model) :
    title = models.CharField(max_length=400)


    def __str__(self):
        return self.title

# The model represents a single task and stores it in the database.    

