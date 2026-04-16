from django.contrib import admin
from .models import Product, Category, Contact, Order, Customer
from django.utils.html import format_html
import json


# ✅ PRODUCT ADMIN
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'created_at')
    search_fields = ('name',)
    list_filter = ('category',)


# ✅ CATEGORY ADMIN
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


# ✅ CUSTOMER ADMIN (IMPORTANT)
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

    def has_add_permission(self, request):
        return False  # ❌ no add button

    def has_delete_permission(self, request, obj=None):
        return False

# # ✅ ORDER ADMIN (IMPORTANT)
# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'email', 'total', 'created_at')

#     def has_add_permission(self, request):
#         return False

#     def has_delete_permission(self, request, obj=None):
#         return False

# ✅ CONTACT ADMIN

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message','created_at')

    def has_add_permission(self, request):
        return False
    


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'email',
        'phone',
        'total',
        'payment_method',
        'payment_status',
        'status',
        'show_items_with_images'
    )

    readonly_fields = ('show_items_with_images',)
    def save_model(self, request, obj, form, change):
        if change:
            old = Order.objects.get(pk=obj.pk)

            if old.status != obj.status and obj.status == "confirmed":
                from django.core.mail import send_mail
                from django.conf import settings

                send_mail(
                    subject="Order Confirmed ✅",
                    message=f"Hi {obj.name}, your order is confirmed!",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[obj.email],
                )

        super().save_model(request, obj, form, change)
    def show_items_with_images(self, obj):
        try:
            import ast

            items = obj.items

            if isinstance(items, str):
                items = ast.literal_eval(items)

        except:
            return "No items"

        html = ""
        for item in items:
            product = Product.objects.filter(id=item.get('id')).first()

            if product and product.image:
                html += f"""
                <div style="margin-bottom:10px;">
                    <img src="{product.image.url}" width="60" height="60"/>
                    <br>{product.name} (x{item.get('quantity')})
                </div>
                """

        from django.utils.safestring import mark_safe
        return mark_safe(html)