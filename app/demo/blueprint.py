"""Defines the blueprint for the Demo package."""

from flask import Blueprint

bp = Blueprint('demo', __name__, template_folder='../templates/demo', )
