from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    get_products,
    get_product_detail,
    create_contact,
    create_order,
    signup,
    login,
    create_payment,
    CartViewSet
)

# ✅ Router for cart
router = DefaultRouter()
router.register("cart", CartViewSet)

# ✅ Normal APIs
urlpatterns = [
    path('products/', get_products),
    path('products/<int:id>/', get_product_detail),
    path('contact/', create_contact),
    path('order/', create_order),
    path('signup/', signup),
    path('login/', login),
    path('create-payment/', create_payment),

    # ✅ Add this (IMPORTANT)
    path('', include(router.urls)),
]