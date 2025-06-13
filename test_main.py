import pytest
import httpx
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "TDS Virtual TA API" in response.json()["message"]

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_gpt_model_question():
    """Test GPT model selection question"""
    response = client.post(
        "/api/",
        json={
            "question": "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "gpt-3.5-turbo-0125" in data["answer"]
    assert len(data["links"]) > 0

def test_ga4_dashboard_question():
    """Test GA4 dashboard scoring question"""
    response = client.post(
        "/api/",
        json={
            "question": "If a student scores 10/10 on GA4 as well as a bonus, how would it appear on the dashboard?"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "110" in data["answer"]
    assert len(data["links"]) > 0

def test_docker_podman_question():
    """Test Docker vs Podman question"""
    response = client.post(
        "/api/",
        json={
            "question": "I know Docker but have not used Podman before. Should I use Docker for this course?"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "Podman" in data["answer"]
    assert len(data["links"]) > 0

def test_future_exam_question():
    """Test future exam date question"""
    response = client.post(
        "/api/",
        json={
            "question": "When is the TDS Sep 2025 end-term exam?"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "don't have information" in data["answer"] or "not available" in data["answer"]

def test_unknown_question():
    """Test unknown question handling"""
    response = client.post(
        "/api/",
        json={
            "question": "What is the meaning of life?"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "don't have specific information" in data["answer"]
    assert len(data["links"]) > 0

def test_image_processing():
    """Test question with base64 image"""
    # Simple base64 encoded test data
    test_image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="

    response = client.post(
        "/api/",
        json={
            "question": "Should I use gpt-3.5-turbo?",
            "image": test_image
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "links" in data

def test_invalid_json():
    """Test invalid JSON handling"""
    response = client.post(
        "/api/",
        data="invalid json"
    )
    assert response.status_code == 422  # Unprocessable Entity

def test_missing_question():
    """Test missing question field"""
    response = client.post(
        "/api/",
        json={}
    )
    assert response.status_code == 422  # Unprocessable Entity

if __name__ == "__main__":
    pytest.main([__file__])
