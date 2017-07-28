import unittest

from common.pipeline import run_all
from domain_model import *

NAME_STUB = 'John Kidd'
EMAIL_ADDRESS_STUB = 'john@test.com'
EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE = 'Email address format is incorrect'


class PipelineRunAllTestCase(unittest.TestCase):

    def test_validate_name_and_email_address_return_no_errors(self):
        # arrange
        person_stub = Person(NAME_STUB, EMAIL_ADDRESS_STUB)
        expected = None
        funcs = [validate_name, validate_email_address]

        # act
        result = run_all(person_stub, funcs)
        actual = result.error

        # assert
        self.assertEqual(expected, actual)

    def test_invalid_name_returns_expected_result(self):
        # arrange
        person_stub = Person(email_address=EMAIL_ADDRESS_STUB)
        expected = INVALID_NAME_MESSAGE
        funcs = [validate_name, validate_email_address]

        # act
        result = run_all(person_stub, funcs)
        actual = result.error

        # assert
        self.assertEqual(expected, actual)

    def test_null_email_address_returns_expected_result(self):
        # arrange
        person_stub = Person(name=NAME_STUB)
        expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE
        funcs = [validate_name, validate_email_address]

        # act
        result = run_all(person_stub, funcs)
        actual = result.error

        # assert
        self.assertEqual(expected, actual)

    def test_no_at_sign_email_address_returns_expected_result(self):
        # arrange
        person_stub = Person(NAME_STUB, 'jk.com')
        expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE
        funcs = [validate_name, validate_email_address]

        # act
        result = run_all(person_stub, funcs)
        actual = result.error

        # assert
        self.assertEqual(expected, actual)

    def test_no_dot_email_address_returns_expected_result(self):
        # arrange
        person_stub = Person(NAME_STUB, 'jk@com')
        expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE
        funcs = [validate_name, validate_email_address]

        # act
        result = run_all(person_stub, funcs)
        actual = result.error

        # assert
        self.assertEqual(expected, actual)

    def test_invalid_name_and_email_address_returns_expected_result(self):
        # arrange
        person_stub = Person()
        expected = INVALID_NAME_MESSAGE + '\n' + EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE
        funcs = [validate_name, validate_email_address]

        # act
        result = run_all(person_stub, funcs)
        actual = result.error

        # assert
        self.assertEqual(expected, actual)

    def test_update_name_returns_new_person(self):
        # arrange
        person_stub = Person(NAME_STUB, EMAIL_ADDRESS_STUB)
        expected = 'Jim Bob'
        funcs = [validate_name, validate_email_address, update_name(expected)]

        # act
        result = run_all(person_stub, funcs)
        actual = result.data.name

        # assert
        self.assertEqual(expected, actual)