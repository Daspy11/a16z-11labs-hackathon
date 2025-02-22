def test_hello_endpoint(test_client):
    """Test the basic hello endpoint works"""
    response = test_client.get('/')
    assert response.status_code == 200
    assert response.json['message'] == 'Hello, World!'