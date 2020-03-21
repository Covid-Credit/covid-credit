from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class AuthUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The email must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, username):
        """Makes login flow case insensitive for emails"""
        return self.get(**{"{}__iexact".format(self.model.USERNAME_FIELD): username})

    def create_superuser(self, email, password, **kwargs):
        kwargs.update(
            {
                "email": email,
                "password": password,
                "is_superuser": True,
                "is_staff": True,
                "is_active": True,
            }
        )
        return self._create_user(**kwargs)

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        # TODO
        if "email_verified" in extra_fields:
            extra_fields.pop("email_verified")
        return self._create_user(email, password, **extra_fields)


class AuthUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="Email")

    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    objects = AuthUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email).lower()


class CreditKudosProfile(models.Model):
    user = models.ForeignKey(AuthUser, on_delete=models.CASCADE, related_name="+")

    access_token = models.TextField()
    token_type = models.TextField()
    expires_at = models.DateTimeField()
    refresh_token = models.TextField()
    scope = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
