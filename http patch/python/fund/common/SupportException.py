class SupportException(Exception):
    def __init__(self, message, errors):
        super(SupportException, self).__init__(message)
        self.errors = errors
