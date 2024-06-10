document.addEventListener('DOMContentLoaded', (event) => {
    checkUserLoggedIn()
    const userId = getUserIdFromCookie();
    if (userId) {
        getCart(userId);
    } else {
        document.getElementById('cartItems').innerHTML = '<p>Please log in to view your cart.</p>';
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

async function getCart(userId) {
    try {
        const response = await fetch(`http://localhost:5000/carts/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const cartItems = await response.json();
            console.log(cartItems);
            displayCartItems(cartItems);
        } else {
            console.error('Failed to fetch cart');
            document.getElementById('cartItems').innerHTML = '<p>Failed to load cart items.</p>';
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        document.getElementById('cartItems').innerHTML = '<p>Failed to load cart items.</p>';
    }
}

async function removeFromCart(userId, productId) {
    try {
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
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

function displayCartItems(cartItems) {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    if (cartItems.length > 0) {
        let table = `
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        cartItems.forEach(item => {
            console.log(item);
            let total = item.Price * item.Quantity;
            table += `
                <tr>
                    <td><a href="./product-details.html?id=${item.ProductId}"><img src="${item.Image}" alt="${item.NameProduct}" width="100"></a></td>
                    <td>$${item.Price}</td>
                    <td>${item.Quantity}</td>
                    <td>$${total}</td>
                    <td><button onclick="removeFromCart(${item.CartId}, ${item.ProductId})">Remove</button></td>
                </tr>
            `;
        });

        table += `
                </tbody>
            </table>
        `;
        cartContainer.innerHTML = table;
    } else {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
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
