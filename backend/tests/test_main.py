from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_book():
    response = client.post(
        "/books",
        json={
            "title": "Test Book",
            "author": "Author",
            "isbn": "1234567890",
            "pages": 100,
            "rating": 5
        }
    )

    assert response.status_code == 200
    assert response.json()["title"] == "Test Book"

def test_invalid_isbn():
    response = client.post(
        "/books",
        json={
            "title": "Test",
            "author": "Author",
            "isbn": "123",  # invalid
            "pages": 100,
            "rating": 5
        }
    )

    assert response.status_code == 422