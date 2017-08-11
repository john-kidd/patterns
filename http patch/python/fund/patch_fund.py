from common.SupportException import SupportException
from common.pipeline import run_until_first_fault
from domain_model import validate_fund_name, validate_fund_type, publish_update
from patch_instruction_service import patch_fund_name, patch_fund_type


def patch_fund(fund_id, instructions, get, update):
    fund = get(fund_id)
    funcs = [validate_fund_name, validate_fund_type]

    for instruction in instructions:
        if instruction.path == 'fund_name':
            funcs.append(patch_fund_name(instruction))

        if instruction.path == 'fund_type':
            funcs.append((patch_fund_type(instruction)))

    funcs.append(publish_update(fund, print))

    result = run_until_first_fault(fund, funcs)
    if result.success():
        update(result.data)
    else:
        raise SupportException(result.error)