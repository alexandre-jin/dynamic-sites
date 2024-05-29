document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        fetchProductDetails(productId);
    } else {
        document.getElementById('productDetails').innerHTML = '<p>Product ID is missing.</p>';
    }
});

function fetchProductDetails(productId) {
    fetch(`http://localhost:5000/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            let productDetails = `
                <div class="product-details">
                    <img src="${product.Image}" alt="${product.NameProduct}" />
                    <h2>${product.NameProduct}</h2>
                    <p>Type: ${product.TypeProduct}</p>
                    <p>Description: ${product.DescriptionProduct}</p>
                    <p>Price: $${product.Price}</p>
                    <p>Status: ${product.StatusProduct}</p>
                    <a href="./php/product/add_to_cart.php?id=${product.ProductId}" class="btn btn-default add-to-cart">
                        <i class="fa fa-shopping-cart"></i>Add to cart
                    </a>
                </div>
            `;
            document.getElementById('productDetails').innerHTML = productDetails;
        })
        .catch(error => console.error('Error fetching product details:', error));
}