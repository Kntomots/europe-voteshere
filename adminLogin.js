document.addEventListener('DOMContentLoaded', function () {
    
    const submit_btn = document.getElementById('sbm-btn')
    submit_btn.addEventListener('click',function() {

        const username = document.getElementById('typeEmailX')
        const password = document.getElementById('typePasswordX')
        console.log(password.value)
        var flag_logged_in = false
        fetch('/api/admin')
        .then(response => response.json())
        .then(data => {
            console.log('Data from MongoDB admin:', data);
            data.forEach(element => {

                if(element['password'] == password.value && element['user']==username.value){
                    window.open('adminPage.html')
                    flag_logged_in = true
                }
            });
            if(!flag_logged_in){
                alert('User not exist')
            }
        
        })






    })


})