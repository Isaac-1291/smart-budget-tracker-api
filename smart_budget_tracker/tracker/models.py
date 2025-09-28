from django.db import models
from django.contrib.auth.models import User

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    name = models.CharField(max_length=255)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.user.username}"

class Transaction(models.Model):
    TYPE_CHOICES = (
        ('income', 'Income'),
        ('expense', 'Expense'),
    )
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='transactions')
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} - {self.amount}"