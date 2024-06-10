document.addEventListener('DOMContentLoaded', (event) => {
    checkUserLoggedIn();
    checkAdminCookie();
    fetchProducts();
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

function checkAdminCookie() {
    const userCookie = getCookie("userCookie");
    if (userCookie) {
        const user = JSON.parse(userCookie);
        if (user.admin) {
            document.getElementById('addProductButton').style.display = 'block';
        }
    }
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

async function addToCart(userId, productId, quantity = 1) {
    console.log(`Adding to cart: userId=${userId}, productId=${productId}, quantity=${quantity}`);
    const data = { product_id: productId, quantity: quantity };
    console.log('Body content:', JSON.stringify(data)); 
    try {
        const response = await fetch(`http://localhost:5000/carts/${userId}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            alert('Product added to cart');
        } else {
            const errorResult = await response.json();
            console.error('Failed to add to cart:', errorResult.message);
            alert("Echec ajout de produit: " + errorResult.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Une erreur est survenu');
    }
}

function handleAddToCart(productId) {
    const userId = getUserIdFromCookie();
    if (userId) {
        addToCart(userId, productId);
    } else {
        alert('Connectez-vous pour ajouter un produit dans votre panier');
    }
}

function fetchProducts() {
    fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => {
            window.products = data;
            displayProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    let wrapCards = document.querySelector('.wrap_cards');
    wrapCards.innerHTML = '';

    products.forEach(product => {
        let availability = product.StatusProduct == 1 ? 'Disponible' : 'Non disponible';
        let productCard = `
            <div class="card_item_main_page">
                <div class="product-image-wrapper">
                    <div class="single-products">
                        <div class="productinfo text-center">
                            <a href="./product-details.html?id=${product.ProductId}">
                                <img src="${product.Image}" alt="${product.NameProduct}" />
                            </a>
                            <h2>${product.Price}€</h2>
                            <p>${product.NameProduct}</p>
                            <p>${availability}</p>
                            <button onclick="handleAddToCart(${product.ProductId})" class="btn btn-default add-to-cart" ${product.StatusProduct == 1 ? '' : 'disabled'}>
                                <i class="fa fa-shopping-cart"></i>Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        wrapCards.innerHTML += productCard;
    });
}

function handleSearch() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = window.products.filter(product => {
        return product.NameProduct.toLowerCase().includes(query) || product.TypeProduct.toLowerCase().includes(query);
    });
    displayProducts(filteredProducts);
}

function getUserIdFromCookie() {
    const userCookie = getCookie("userCookie");
    if (userCookie) {
        const user = JSON.parse(userCookie);
        return user.userId;
    }
    return null;
}
