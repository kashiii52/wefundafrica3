# from django.core.mail import EmailMultiAlternatives
# from django.dispatch import receiver
# from django.template.loader import render_to_string
# from django.urls import reverse

# from django_rest_passwordreset.signals import reset_password_token_created


# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
#     # send an API request to your React app
#     reset_password_url = "{}?token={}".format(
#         instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
#         reset_password_token.key
#     )

#     # send an e-mail to the user
#     print(reset_password_url)
#     context = {
#         'current_user': reset_password_token.user,
#         'username': reset_password_token.user.username,
#         'email': reset_password_token.user.email,
#         'reset_password_url': reset_password_url,
#     }

#     # render email text
#     email_html_message = render_to_string('password_reset_email.html', context)
#     email_plaintext_message = render_to_string('password_reset_email.txt', context)

#     msg = EmailMultiAlternatives(
#         # title:
#         "Password Reset for {title}".format(title="WeFund Africa"),
#         # message:
#         email_plaintext_message,
#         # from:
#         "noreply@yourdomain.com",
#         # to:
#         [reset_password_token.user.email]
#     )
#     msg.attach_alternative(email_html_message, "text/html")
#     msg.send()







from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created
from .models import CustomUser  # Import your CustomUser model

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # send an API request to your React app
    reset_password_url = "{}?token={}".format(
        instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
        reset_password_token.key
    )

    # send an e-mail to the user
    print(reset_password_url)
    context = {
        # 'current_user': user,  # Use the retrieved user object
        # 'username': user.username,
        # 'email': user.email,
        # 'reset_password_url': reset_password_url,

        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': reset_password_url,

    }

    # render email text
    email_html_message = render_to_string('password_reset_email.html', context)
    email_plaintext_message = render_to_string('password_reset_email.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="WeFund Africa"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@yourdomain.com",
        # to:
        [reset_password_token.user.email]  # Use the retrieved user's email
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
