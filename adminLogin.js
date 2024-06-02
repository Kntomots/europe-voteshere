document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('sbm-btn');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('typeEmailX').value;
        const password = document.getElementById('typePasswordX').value;

        if (username && password) {
            fetch('/api/admin')
                .then(response => response.json())
                .then(data => {
                    console.log('Data from MongoDB admin:', data);

                    let flagLoggedIn = false;

                    data.forEach(element => {
                        if (element['password'] === password && element['user'] === username) {
                            flagLoggedIn = true;
                            window.location.href = 'adminPage.html'; // Use href instead of open
                        }
                    });

                    if (!flagLoggedIn) {
                        alert('User does not exist or incorrect credentials');
                    }
                })
                .catch(error => {
                    console.error('Error fetching admin data:', error);
                    alert('An error occurred while logging in. Please try again later.');
                });
        } else {
            alert('Please enter both username and password');
        }
    });
});
