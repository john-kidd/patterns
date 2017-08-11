import unittest

import no_pattern
import patch_fund
from fund.common.pipeline import Result
from fund.domain_model import Fund, PatchFundDto


class PatchFundTests(unittest.TestCase):

    def test_no_pattern_should_set_fund_type_expected_value(self):
        # arrange
        patch_fund_dto_stub = PatchFundDto('replace', 'fund_type', DRAW_DOWN_VEHICLE_FUND_TYPE)
        instruction_stub = [patch_fund_dto_stub]
        expected = DRAW_DOWN_VEHICLE_FUND_TYPE
        target = no_pattern.patch_fund

        # act
        target(FUND_ID, instruction_stub, get_fund, update_fund)
        actual = get_fund(FUND_ID).fund_type

        # assert
        self.assertEqual(expected, actual)

    def test_with_pattern_should_set_fund_type_expected_value(self):
        # arrange
        patch_fund_dto_stub = PatchFundDto('replace', 'fund_type', DRAW_DOWN_VEHICLE_FUND_TYPE)
        instruction_stub = [patch_fund_dto_stub]
        expected = DRAW_DOWN_VEHICLE_FUND_TYPE
        target = patch_fund.patch_fund

        # act
        target(FUND_ID, instruction_stub, get_fund, update_fund)
        actual = get_fund(FUND_ID).fund_type

        # assert
        self.assertEqual(expected, actual)

""" fixture """

HEDGE_FUND_FUND_TYPE = 'Hedge Fund'
DRAW_DOWN_VEHICLE_FUND_TYPE = 'DrawDown Vehicle'
FUND_NAME = 'Cardano Fund A'
FUND_ID = 1

fund_in_dummy_db = {FUND_ID: Fund(FUND_NAME, HEDGE_FUND_FUND_TYPE, FUND_ID)}


def get_fund(fund_id):
    return fund_in_dummy_db[fund_id]


def write_to_dummy_db(fund_id, fund_to_update):
    fund_in_dummy_db[fund_id] = fund_to_update


def update_fund(edited_fund):
    existing = get_fund(edited_fund.fund_id)
    updated = Result(data=Fund(edited_fund.fund_name, edited_fund.fund_type, existing.fund_id))
    write_to_dummy_db(edited_fund.fund_id, updated.data)

    return updated
