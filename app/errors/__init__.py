"""Initialization of error handling."""

from ..errors import handlers
from ..errors.handlers import bp

_all = [bp, handlers]
