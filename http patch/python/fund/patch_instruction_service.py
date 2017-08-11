from domain_model import update_fund_name, update_fund_type


FUND_TYPE_KEY = 'fund_type'
FUND_NAME_KEY = 'fund_name'


def patch_fund_name(instruction):
    if instruction.operation == 'replace':
        return update_fund_name(instruction.value)


def patch_fund_type(instruction):
    if instruction.operation == 'replace':
        return update_fund_type(instruction.value)
