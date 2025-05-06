from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class CustomUser(AbstractUser):
    # Calse abstracta de User, para personalizar el modelo de usuario
    name = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.name or self.username
