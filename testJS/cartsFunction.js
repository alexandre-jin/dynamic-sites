async function addToCart(userId, productId, quantity) {
    const response = await fetch(`http://localhost:5000/carts/${userId}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId, quantity: quantity })
    });

    if (response.ok) {
        alert('Product added to cart');
        getCart(userId);
    } else {
        console.error('Failed to add to cart');
    }
}

async function getCart(userId) {
    const response = await fetch(`http://localhost:5000/carts/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const cartItems = await response.json();
        displayCartItems(cartItems);
    } else {
        console.error('Failed to fetch cart');
    }
}

async function removeFromCart(userId, productId) {
    const response = await fetch(`http://localhost:5000/carts/${userId}/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
    });

    if (response.ok) {
        alert('Product removed from cart');
        getCart(userId);
    } else {
        console.error('Failed to remove from cart');
    }
}

function displayCartItems(cartItems) {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.NameProduct} - ${item.Quantity} - $${item.Price}</p>
            <button onclick="removeFromCart(${item.CartId}, ${item.ProductId})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const userId = getUserIdFromCookie(); // Assure-toi de récupérer l'utilisateur connecté
    if (userId) {
        getCart(userId);
    }
});

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
