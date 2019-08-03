"""Tests the routes for the Errors module."""


def test_404(app, client):
    """Check if the application can route to a 404."""
    with app.app_context():
        response = client.get('/unknown_page')
        assert response.status_code == 404
        assert 'Page Not Found' in str(response.data)


def test_500(app, client):
    """Check if the application can route to a 500."""
    with app.app_context():
        response = client.get('/err500')
        assert response.status_code == 500
        assert 'An Error Has Occurred' in str(response.data)
