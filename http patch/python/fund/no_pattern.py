from domain_model import validate_fund_type, validate_fund_name, publish_update
from patch_instruction_service import patch_fund_type, FUND_TYPE_KEY, FUND_NAME_KEY, patch_fund_name


def patch_fund(fund_id, instructions, get, update):
    current_data = get(fund_id)

    for instruction in instructions:
        if instruction.path == FUND_TYPE_KEY:
            patch_fund_type_result = patch_fund_type(instruction)(current_data)
            if not patch_fund_type_result.success():
                return patch_fund_type_result.error
            current_data = patch_fund_type_result.data

        if instruction.path == FUND_NAME_KEY:
            patch_fund_name_result = patch_fund_name(instruction)(current_data)
            if not patch_fund_name_result.success():
                return patch_fund_name_result.error
            current_data = patch_fund_name_result.data

    validate_fund_type_result = validate_fund_type(current_data)
    if not validate_fund_type_result.success():
        return validate_fund_type_result.error
    current_data = validate_fund_type_result.data

    validate_fund_name_result = validate_fund_name(current_data)
    if not validate_fund_name_result.success():
        return validate_fund_name_result.error
    current_data = validate_fund_name_result.data

    publish_update_result = publish_update(current_data.fund_id, print)(current_data)
    if not publish_update_result.success():
        return publish_update_result.error
    current_data = publish_update_result.data

    update(current_data)
