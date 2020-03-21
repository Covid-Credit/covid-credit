import random

import pytz
from django.conf import settings
from django.utils import timezone


def tz_now(tz=None):
    if tz is None:
        tz = pytz.timezone(settings.TIME_ZONE)
    return timezone.now().astimezone(tz)


def generate_alphanumeric_key(length, string=None):
    """
    Generate a referral code made up of:
      - upper case letters only
      - numbers that aren't zero

    Hat tip to Hashids: avoid swearwords by not putting any
    of `CSFHUIT` next to each other.
    """
    choices = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
    naughty_letters = "CFHISTU"
    tame_letters = "".join(set(choices) - set(naughty_letters))

    if string is None:
        string = ""
    if len(string) == length:
        return string
    if len(string) > 0 and string[-1] in naughty_letters:
        new_string = string + random.choice(tame_letters)
        return generate_alphanumeric_key(length, string=new_string)

    new_string = string + random.choice(choices)
    return generate_alphanumeric_key(length, string=new_string)
