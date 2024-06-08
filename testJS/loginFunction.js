async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();
        let userFound = false;
        let adminFound = false;
        let loggedInUser = null;

        users.forEach(user => {
            if (user.Email === email && user.Password === password) {
                if (email === "admin@gmail.com") {
                    adminFound = true;
                }
                userFound = true;
                loggedInUser = user;
            }
        });

        if (userFound) {
            const cookieValue = {
                userId: loggedInUser.UserId,
                admin: adminFound   
            };
            document.cookie = `userCookie=${JSON.stringify(cookieValue)}; path=/`;
            alert('Vous êtes connecté !');
        } else {
            alert("Ce compte n'est pas valide");
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;

    try {
        const responseGet = await fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!responseGet.ok) {
            throw new Error('Problem fetching users');
        }

        const users = await responseGet.json();
        const emailTaken = users.some(user => user.Email === email);

        if (emailTaken) {
            alert('Cet email est déjà pris.');
            return;
        }

        const data = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password
        };

        const responsePost = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!responsePost.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await responsePost.json();
        alert("Votre compte est bien enregistré");
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
