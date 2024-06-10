document.addEventListener('DOMContentLoaded', (event) => {
    checkUserLoggedIn();
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.log("Product ID is missing");
    }
});

function checkUserLoggedIn() {
    const userCookie = getCookie("userCookie");
    if (userCookie) {
        const user = JSON.parse(userCookie);
        document.getElementById('logoutButton').style.display = 'block';
    }
}

function logout() {
    document.cookie = "userCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert('Vous êtes déconnecté !');
    location.reload();
}

function redirectToEditPage() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    window.location.href = `edit_product.html?id=${productId}`;
}

function fetchProductDetails(productId) {
    fetch(`http://localhost:5000/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            let isAdmin = checkAdminCookie();
            let availability = product.StatusProduct == 1 ? 'Disponible' : 'Non disponible';
            let productDetails = `
                <div class="product-details">
                    <img src="${product.Image}" alt="${product.NameProduct}"/>
                    <h2>${product.NameProduct}</h2>
                    <p>Type: ${product.TypeProduct}</p>
                    <p>Description: ${product.DescriptionProduct}</p>
                    <p>Price: ${product.Price}€</p>
                    <p>Status: ${availability}</p>
                    <button onclick="handleAddToCart(${product.ProductId})" class="btn btn-default add-to-cart" ${product.StatusProduct == 1 ? '' : 'disabled'}>
                        <i class="fa fa-shopping-cart"></i>Ajouter au panier
                    </button>
            `;
            if (isAdmin) {
                productDetails += `
                    <button onclick="deleteProduct(${product.ProductId})" class="btn btn-danger">Supprimer</button>
                `;
                document.getElementById('editProductButton').style.display = 'block';
            }
            productDetails += `</div>`;
            document.getElementById('productDetails').innerHTML = productDetails;
        })
        .catch(error => console.error('Error fetching product details:', error));
}

function checkAdminCookie() {
    const userCookie = getCookie("userCookie");
    if (userCookie) {
        const user = JSON.parse(userCookie);
        return user.admin;
    }
    return false;
}

function deleteProduct(productId) {
    const apiUrl = `http://localhost:5000/products/${productId}`;

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorResult => {
                throw new Error(errorResult.message);
            });
        }
        return response.json();
    })
    .then(result => {
        console.log(result.message);
        alert('Produit supprimé !');
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Erreur dans la suppression du produit :', error.message);
        alert('Erreur dans la suppression du produit : ' + error.message);
    });
}

function addToCart(userId, productId, quantity = 1) {
    console.log(`Adding to cart: userId=${userId}, productId=${productId}, quantity=${quantity}`);
    const data = {
        product_id: productId,
        quantity: quantity
    };
    console.log('Body content:', JSON.stringify(data)); 

    fetch(`http://localhost:5000/carts/${userId}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorResult => {
                throw new Error(errorResult.message);
            });
        }
        return response.json();
    })
    .then(result => {
        console.log(result.message);
        alert('Produit ajouté au panier');
    })
    .catch(error => {
        console.error('Echec ajout de produit:', error.message);
        alert('Echec ajout de produit: ' + error.message);
    });
}

function handleAddToCart(productId) {
    const userId = getUserIdFromCookie();
    if (userId) {
        addToCart(userId, productId);
    } else {
        alert('Connectez-vous pour ajouter un produit dans votre panier');
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
