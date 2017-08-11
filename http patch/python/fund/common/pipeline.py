
class Result:
    def __init__(self, error=None, data=None, compensate=None):
        self.error = error
        self.data = data
        self.compensate = compensate

    def should_compensate(self):
        return self.compensate is not None

    def success(self):
        return self.error is None


def run_all(data, funcs):
    errors = []
    compensators = []
    current_data = data
    for f in funcs:
        result = f(current_data)
        if not result.success():
            errors.append(result.error)
        current_data = result.data
        if result.should_compensate():
            compensators.append(result.compensate)
    for c in compensators:
        c()
    if len(errors):
        return Result('\n'.join(errors), current_data)
    return Result(data=current_data)


def run_until_first_fault(data, funcs):
    compensators = []
    current_data = data
    for f in funcs:
        result = f(current_data)
        if not result.success():
            return result
        if result.should_compensate():
            compensators.append(result.compensate)
        current_data = result.data
    for c in compensators:
        c()
    return Result(data=current_data)
