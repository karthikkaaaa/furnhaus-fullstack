# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.core.mail import send_mail
# # from .views import get_products, get_product, create_contact, create_order
# from django.contrib.auth.hashers import make_password
# from .models import Product, Contact, Order, Customer
# from rest_framework.viewsets import ModelViewSet
# from .models import CartItem
# from rest_framework.viewsets import ModelViewSet
# # from .serializers import CartSerializer
# from .models import Product
# from .serializers import ProductSerializer
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.hashers import check_password
# from .serializers import (
#     ProductSerializer,
#     ContactSerializer,
#     OrderSerializer,
#     CustomerSerializer
# )

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password, check_password
from django.conf import settings
from .models import Product, Contact, Order, Customer, CartItem
import json
import razorpay

from .serializers import (
    ProductSerializer,
    ContactSerializer,
    OrderSerializer,
    CustomerSerializer,
    CartSerializer   # ✅ IMPORTANT
)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = Customer.objects.get(email=email)

        if check_password(password, user.password):
            return Response({
                "message": "Login success",
                "user": {
                    "name": user.name,
                    "email": user.email,
                    "id": user.id
                }
            })
        else:
            return Response({"error": "Invalid password"}, status=400)

    except Customer.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

@api_view(['GET'])
def get_products(request):
    category = request.GET.get('category')

    if category:
        products = Product.objects.filter(
            # category__name__icontains=category.lower()
            # category__name__iexact=category
            category__name__icontains=category
        )
    else:
        products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
@api_view(['GET'])
def get_products(request):
    category = request.GET.get('category')
    
    if category:
        products = Product.objects.filter(category__name__iexact=category)
    else:
        products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)    
@api_view(['POST'])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        send_mail(
            subject='New Contact Message',
                message=f"""

From: {request.data['email']}
Name: {request.data['name']}
Phone: {request.data.get('phone', 'N/A')}
Message: {request.data['message']}
""",
            # message=request.data['message'],
            # from_email=request.data['email'],
            from_email=settings.EMAIL_HOST_USER, 
            recipient_list=['karthikakunnummal123@gmail.com'],
            fail_silently=False,
        )
        return Response({"message": "Saved"})
    return Response(serializer.errors,status=400)


# @api_view(['POST'])
# def create_order(request):
#     serializer = OrderSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Order placed"})
#     return Response(serializer.errors,status=400)


@api_view(['POST'])
def signup(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(password=make_password(request.data['password']) )
        return Response({"message": "User created"})
    return Response(serializer.errors,status=400)    



class CartViewSet(ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    # ✅ Show only current user's cart
    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    # ✅ Save user automatically
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # ✅ 🔥 PUT YOUR CODE HERE (IMPORTANT)
    def create(self, request, *args, **kwargs):
        product_id = request.data.get("product")

        item = CartItem.objects.filter(
            user=request.user,
            product_id=product_id
        ).first()

        if item:
            item.quantity += 1
            item.save()
            serializer = self.get_serializer(item)
            return Response(serializer.data)

        return super().create(request, *args, **kwargs)  # ✅ CORRECT
    





@api_view(['POST'])
def create_order(request):
    try:
        data = request.data

        items = data.get('items', [])
        if isinstance(items, str):
            import json
            items = json.loads(items)

        Order.objects.create(
    name=data.get('name'),
    email=data.get('email'),
    phone=data.get('phone'),
    address=data.get('address'),
    total=data.get('total'),
    items=str(items),
    customer=Customer.objects.first(),   # ✅ comma added

    payment_method=data.get('payment'),
    payment_status="pending" if data.get('payment') == "cod" else "paid"
)

        # ✅ Format items
        items_text = ""
        for item in items:
            items_text += f"{item.get('name')} - {item.get('quantity')}\n"

        # 📧 1. ADMIN EMAIL
        send_mail(
            subject="🛒 New Order Received",
            message=f"""
Customer: {data.get('name')}
Phone: {data.get('phone')}
Address: {data.get('address')}

Items:
{items_text}

Total: ₹{data.get('total')}
""",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=['karthikakunnummal123@gmail.com'],
        )

        # 📧 2. CUSTOMER EMAIL ✅ ADD HERE
        send_mail(
            subject="✅ Order Confirmation",
            message=f"""
Hi {data.get('name')},

Your order has been placed successfully 🎉

Items:
{items_text}

Total: ₹{data.get('total')}

We will contact you soon!
""",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[data.get('email')],
        )

        return Response({"message": "Order placed"})

    except Exception as e:
        print("ERROR:", e)
        return Response({"error": str(e)}, status=500)
    


@api_view(['POST'])
def create_payment(request):
    

    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

    amount = int(request.data.get('amount')) * 100

    order = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1
    })

    return Response(order)



@api_view(['POST'])
def verify_payment(request):
    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

    client.utility.verify_payment_signature({
        'razorpay_order_id': request.data['razorpay_order_id'],
        'razorpay_payment_id': request.data['razorpay_payment_id'],
        'razorpay_signature': request.data['razorpay_signature']
    })

    return Response({"status": "Payment verified"})