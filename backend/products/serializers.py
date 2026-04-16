from rest_framework import serializers
from .models import Product
from .models import Category
from .models import CartItem
from .models import Product, Contact, Order, Customer
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    price = serializers.IntegerField(source="product.price", read_only=True)
    image = serializers.ImageField(source="product.image", read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'price', 'image', 'quantity']        