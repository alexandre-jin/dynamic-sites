document.addEventListener('DOMContentLoaded', (event) => {
    checkAdminCookie();
    fetchProducts();
});

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

function fetchProducts() {
    fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => {
            let wrapCards = document.querySelector('.wrap_cards');
            wrapCards.innerHTML = ''; // Clear existing content

            data.forEach(product => {
                let productCard = `
                    <div class="card_item_main_page">
                        <div class="product-image-wrapper">
                            <div class="single-products">
                                <div class="productinfo text-center">
                                    <a href="./product-details.html?id=${product.ProductId}">
                                        <img src="${product.Image}" alt="${product.NameProduct}" />
                                    </a>
                                    <h2>$${product.Price}</h2>
                                    <p>${product.NameProduct}</p>
                                    <a href="./php/product/add_to_cart.php?id=${product.ProductId}" class="btn btn-default add-to-cart">
                                        <i class="fa fa-shopping-cart"></i>Add to cart
                                    </a>
                                </div>
                            </div>
                            <div class="choose">
                                <ul class="nav nav-pills nav-justified">
                                    <li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                wrapCards.innerHTML += productCard;
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}
