from django.apps import AppConfig


class WefundLoginConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'wefund_login'

    def ready(self):
        import wefund_login.signals  # Add this line to import the signals.py
