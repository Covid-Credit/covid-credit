import requests


class BearerAuth(requests.auth.AuthBase):
    def __init__(self, token, prefix=None):
        self.token = token
        self.prefix = prefix

    def __call__(self, r):
        prefix = "Bearer" if self.prefix is None else self.prefix
        r.headers["authorization"] = f"{prefix} {self.token}"
        return r
