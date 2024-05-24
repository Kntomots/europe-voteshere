document.addEventListener('DOMContentLoaded', function () {
    const languagesData = {
        labels: ['', '', '', '', ''],
        datasets: [{
            data: [25, 20, 15, 10, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
        }],
    };

    const config = {
        type: 'doughnut',
        data: languagesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '',
                },
            },
        },
    };

    const ctx = document.getElementById('programmingLanguagesPieChart').getContext('2d');
    new Chart(ctx, config);
});
