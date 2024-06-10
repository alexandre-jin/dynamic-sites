document.addEventListener('DOMContentLoaded', (event) => {
    displayUserInfo();
});

async function displayUserInfo() {
    const userCookie = getCookie("userCookie");
    const userStatusDiv = document.getElementById('userStatus');
    const userInfoDiv = document.getElementById('userInfo');
    const editFormContainer = document.getElementById('editFormContainer');

    if (userCookie) {
        const user = JSON.parse(userCookie);
        const userId = user.userId;

        try {
            const response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }   
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const userDetails = await response.json();
            userStatusDiv.innerHTML = `<p class="alert alert-success">Vous êtes connecté en tant que ${user.admin ? 'admin' : 'utilisateur'}.</p>`;
            userInfoDiv.innerHTML = `
                <p><strong>First Name:</strong> ${userDetails.FirstName}</p>
                <p><strong>Last Name:</strong> ${userDetails.LastName}</p>
                <p><strong>Email:</strong> ${userDetails.Email}</p>
            `;

            document.getElementById('firstName').value = userDetails.FirstName || '';
            document.getElementById('lastName').value = userDetails.LastName || '';
            document.getElementById('email').value = userDetails.Email || '';

            document.getElementById('logoutButton').style.display = 'block';
            editFormContainer.style.display = 'block';
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    } else {
        userStatusDiv.innerHTML = `<p class="alert alert-warning">Vous n'êtes pas connecté.</p>`;
        userInfoDiv.innerHTML = '';
    }
}

function logout() {
    document.cookie = "userCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert('Vous êtes déconnecté !');
    location.reload();
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
