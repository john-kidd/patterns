from common.email_addresses import is_valid_email_address
from common.pipeline import Result

INVALID_NAME_MESSAGE = 'Invalid name'
EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE = 'Email address format is incorrect'


class Person:
    def __init__(self, name=None, email_address=None):
        self.name = name
        self.email_address = email_address


def validate_name(person):
    if not person.name:
        return Result(INVALID_NAME_MESSAGE, person)
    return Result(data=person)


def validate_email_address(person):
    if not is_valid_email_address(person.email_address):
        return Result(EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE, person)
    return Result(data=person)


def update_name(new_name):
    def partial(person):
        return Result(data=Person(new_name, person.email_address))
    return partial
