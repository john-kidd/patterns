import re


def is_valid_email_address(email_address):
    test = '[^@]+@[^@]+\.[^@]+'
    if not email_address or not re.match(test, email_address):
        return False
    return True
