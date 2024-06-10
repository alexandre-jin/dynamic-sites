function updatePreview() {
    document.getElementById('previewName').textContent = document.getElementById('nameProduct').value;
    document.getElementById('previewType').textContent = document.getElementById('typeProduct').value;
    document.getElementById('previewDescription').textContent = document.getElementById('descriptionProduct').value;
    document.getElementById('previewPrice').textContent = document.getElementById('price').value;
    document.getElementById('previewStatus').textContent = document.getElementById('statusProduct').value;
    document.getElementById('previewImage').src = document.getElementById('image').value;
}

function createProduct() {
    var nameProduct = document.getElementById('nameProduct').value;
    var typeProduct = document.getElementById('typeProduct').value;
    var descriptionProduct = document.getElementById('descriptionProduct').value;
    var price = document.getElementById('price').value;
    var statusProduct = document.getElementById('statusProduct').value;
    var image = document.getElementById('image').value;

    var data = {
        NameProduct: nameProduct,
        TypeProduct: typeProduct,
        DescriptionProduct: descriptionProduct,
        Price: price,
        StatusProduct: statusProduct,
        Image: image
    };

    fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(result) {
        alert(result.message);
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}