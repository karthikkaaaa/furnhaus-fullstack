# from django.db import models
# import json

# class Order(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     address = models.TextField()
#     total = models.DecimalField(max_digits=10, decimal_places=2)

#     items = models.JSONField()  # 🔥 ADD THIS

#     created_at = models.DateTimeField(auto_now_add=True)
# class Category(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name


# class Product(models.Model):
#     name = models.CharField(max_length=200)
#     # price = models.FloatField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     description = models.TextField()
#     image = models.ImageField(upload_to='products/')
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)
#     in_stock = models.BooleanField(default=True)
#     rating = models.FloatField(default=4.5)
#     original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     def __str__(self):
#         return self.name

# class Contact(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     message = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name    

# class Order(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     address = models.TextField()
#     total = models.DecimalField(max_digits=10, decimal_places=2)
#     items = models.JSONField()  # 🔥 ADD THIS
#     phone = models.CharField(max_length=15, null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     def __str__(self):
#         return self.name    
    
# class Customer(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=100)

#     def __str__(self):
#         return self.email    
from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    in_stock = models.BooleanField(default=True)
    rating = models.FloatField(default=4.5)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,null=True, blank=True)     
   

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField()

    total = models.DecimalField(max_digits=10, decimal_places=2)

    items = models.JSONField()  # cart items
    payment_method = models.CharField(max_length=20, default='cod')
    payment_status = models.CharField(max_length=20, default='pending')

    status = models.CharField(
        max_length=20,
        default='pending',
        choices=[
            ('pending', 'Pending'),
            ('confirmed', 'Confirmed'),
            ('shipped', 'Shipped'),
            ('delivered', 'Delivered'),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.name}"


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

# class CartItem(models.Model):
#     product = models.ForeignKey('Product', on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=1)

#     def __str__(self):
#         return self.product.name  
    
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return self.product.name 
    
# class CartViewSet(ModelViewSet):
#     queryset = CartItem.objects.all()
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]   