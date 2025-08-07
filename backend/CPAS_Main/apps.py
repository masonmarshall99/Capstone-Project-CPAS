from django.apps import AppConfig
from django.db.models.signals import post_migrate


class CpasMainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CPAS_Main'

    # Connect post_migrate signal to automatically populate database after migrations.
    def ready(self):
        from .signals import fill_database
        post_migrate.connect(fill_database, sender=self)