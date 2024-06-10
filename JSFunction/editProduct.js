document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.log("Product ID is missing")
    }

    document.getElementById('nameProduct').addEventListener('input', updatePreview);
    document.getElementById('typeProduct').addEventListener('input', updatePreview);
    document.getElementById('descriptionProduct').addEventListener('input', updatePreview);
    document.getElementById('price').addEventListener('input', updatePreview);
    document.getElementById('statusProduct').addEventListener('input', updatePreview);
    document.getElementById('image').addEventListener('input', updatePreview);
});

let originalProductDetails = {};

function updatePreview() {
    const name = document.getElementById('nameProduct').value || originalProductDetails.NameProduct;
    const type = document.getElementById('typeProduct').value || originalProductDetails.TypeProduct;
    const description = document.getElementById('descriptionProduct').value || originalProductDetails.DescriptionProduct;
    const price = document.getElementById('price').value || originalProductDetails.Price;
    const status = document.getElementById('statusProduct').value || originalProductDetails.StatusProduct;
    const image = document.getElementById('image').value || originalProductDetails.Image;

    document.getElementById('previewName').innerText = `Name: ${name}`;
    document.getElementById('previewType').innerText = `Type: ${type}`;
    document.getElementById('previewDescription').innerText = `Description: ${description}`;
    document.getElementById('previewPrice').innerText = `Price: ${price}€`;
    document.getElementById('previewStatus').innerText = `Status: ${status}`;
    document.getElementById('previewImage').src = image;
}

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const productDetails = await response.json();
        originalProductDetails = productDetails;

        document.getElementById('nameProduct').value = productDetails.NameProduct;
        document.getElementById('typeProduct').value = productDetails.TypeProduct;
        document.getElementById('descriptionProduct').value = productDetails.DescriptionProduct;
        document.getElementById('price').value = productDetails.Price;
        document.getElementById('statusProduct').value = productDetails.StatusProduct;
        document.getElementById('image').value = productDetails.Image;

        updatePreview();

        document.getElementById('productInfo').innerHTML = `
            <p><strong>Product ID:</strong> ${productDetails.ProductId}</p>
        `;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('productInfo').innerHTML = '<p>Echec de chargement du produit</p>';
    }
}

async function updateProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const name = document.getElementById('nameProduct').value || originalProductDetails.NameProduct;
    const type = document.getElementById('typeProduct').value || originalProductDetails.TypeProduct;
    const description = document.getElementById('descriptionProduct').value || originalProductDetails.DescriptionProduct;
    const price = document.getElementById('price').value || originalProductDetails.Price;
    const status = document.getElementById('statusProduct').value || originalProductDetails.StatusProduct;
    const image = document.getElementById('image').value || originalProductDetails.Image;

    const data = {
        NameProduct: name,
        TypeProduct: type,
        DescriptionProduct: description,
        Price: price,
        StatusProduct: status,
        Image: image
    };

    try {
        const response = await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Echec de mise à jour du produit');
    }
}
