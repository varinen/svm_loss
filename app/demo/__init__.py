"""Initializes the Demo package."""

from app.demo.blueprint import bp
from app.demo import routes

_all = [bp, routes]
