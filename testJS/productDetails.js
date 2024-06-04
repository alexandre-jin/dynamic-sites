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
                    <button onclick="handleAddToCart(${product.ProductId})" class="btn btn-default add-to-cart">
                        <i class="fa fa-shopping-cart"></i>Add to cart
                    </button>
                    <button onclick="deleteProduct(${product.ProductId})" class="btn btn-danger">Delete Product</button>
                </div>
            `;
            document.getElementById('productDetails').innerHTML = productDetails;
        })
        .catch(error => console.error('Error fetching product details:', error));
}

async function deleteProduct(productId) {
    const apiUrl = `http://localhost:5000/products/${productId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            alert('Produit supprimé !');
            window.location.href = 'index.html';
        } else {
            const errorResult = await response.json();
            console.error('Erreur dans la suppression du produit :', errorResult.message);
            alert('Erreur dans la suppression du produit : ' + errorResult.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the product');
    }
}

async function addToCart(userId, productId, quantity = 1) {
    const response = await fetch(`http://localhost:5000/carts/${userId}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId, quantity: quantity })
    });

    if (response.ok) {
        alert('Product added to cart');
    } else {
        console.error('Failed to add to cart');
    }
}

function handleAddToCart(productId) {
    const userId = getUserIdFromCookie();
    if (userId) {
        addToCart(userId, productId);
    } else {
        alert('Please log in to add items to your cart.');
    }
}

function getUserIdFromCookie() {
    const userCookie = getCookie("userCookie");
    if (userCookie) {
        const user = JSON.parse(userCookie);
        return user.userId;
    }
    return null;
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
