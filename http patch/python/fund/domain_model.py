from common.pipeline import Result

INVALID_FUND_NAME_MESSAGE = 'Invalid fund name'
INVALID_FUND_TYPE_MESSAGE = 'Invalid fund type'


class PatchFundDto:
    def __init__(self, operation, path, value):
        self.operation = operation
        self.path = path
        self.value = value


class Fund:
    def __init__(self, fund_name, fund_type, fund_id):
        self.fund_name = fund_name
        self.fund_type = fund_type
        self.fund_id = fund_id


def validate_fund_name(fund):
    if not fund.fund_name:
        return Result(INVALID_FUND_NAME_MESSAGE, fund)
    return Result(data=fund)


def validate_fund_type(fund):
    if not fund.fund_type:
        return Result(INVALID_FUND_TYPE_MESSAGE, fund)
    return Result(data=fund)


def update_fund_name(fund_name):
    def apply(fund):
        return Result(data=Fund(fund_name, fund.fund_type, fund.fund_id))
    return apply


def update_fund_type(fund_type):
    def apply(fund):
        return Result(data=Fund(fund.fund_name, fund_type, fund.fund_id))
    return apply


def publish_update(fund_id, log_info):
    def compensate():
        log_info('message: revert fund [{}]'.format(fund_id))

    def apply(fund):
        log_info('message: updated fund [{}]'.format(fund_id))
        return Result(data=fund, compensate=compensate)

    return apply

