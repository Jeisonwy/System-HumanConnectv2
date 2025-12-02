
import pytest
import app  
@pytest.fixture()
def client():
    app.app.config["TESTING"] = True
    return app.app.test_client()

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()
