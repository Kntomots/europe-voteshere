document.addEventListener('DOMContentLoaded', async function () {
    const labels = [
        'Strongly support',
        'Support',
        'Neutral',
        'Oppose ',
        'Strongly oppose'
    ];

    function createCard(title, text, cardIndex) {
        // Create card container
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create and append card title
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.innerText = title;
        cardBody.appendChild(cardTitle);

        // Create and append card text
        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.innerText = text;
        cardBody.appendChild(cardText);

        // Create and append radio buttons
        labels.forEach((labelText, index) => {
            const div = document.createElement('div');
            div.className = 'form-check';

            const cardRadioBtn = document.createElement('input');
            cardRadioBtn.className = 'form-check-input';
            cardRadioBtn.type = 'radio';
            cardRadioBtn.id = `radio-${cardIndex}-${index}`;
            cardRadioBtn.name = `economic-policy-${cardIndex}`; // Unique name for each card

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.setAttribute('for', `radio-${cardIndex}-${index}`);
            label.innerHTML = labelText;

            div.appendChild(cardRadioBtn);
            div.appendChild(label);

            // Append the div to the card body
            cardBody.appendChild(div);
        });

        // Adding delete Button
        const delete_btn = document.createElement('button');
        delete_btn.className = 'btn btn-danger';
        delete_btn.innerHTML = 'Delete';

        delete_btn.addEventListener('click', function () {
            fetch(`/api/questions/${title}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    card.remove(); // Remove the card from the DOM
                } else {
                    console.error('Error deleting question:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting question:', error);
            });
        });
        cardBody.appendChild(delete_btn);

        // Append card body to card container
        card.appendChild(cardBody);

        return card;
    }

    // Get the modal
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementsByClassName("closeBtn")[0];
    var btn_parties = document.createElement('button')
    var btn_container = document.createElement('div')

    btn_parties.style.display = 'flex'
    btn_parties.style.width= '50%'
    btn_parties.justifyContent = 'center'
    btn_parties.style.float = 'right'
    btn_parties.className = 'btn btn-primary button-item'
    btn_parties.innerHTML = 'Go to Parties'
    btn_container.appendChild(btn_parties)

    btn_parties.addEventListener('click' , function(){



        window.location.href='parties.html'




    })
    

   btn.className = 'btn btn-primary button-item'
    btn_container.appendChild(btn)

    document.getElementById('content').appendChild(btn_container)




    btn.onclick = function () {
        modal.style.display = "block";

    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    const container = document.getElementById('container');

    fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
            console.log('Data from MongoDB:', data);
            data.forEach((element, index) => {
                container.appendChild(createCard(element.questionId, element.questionText, index));
            });

            const submitBtn = document.getElementById('submit1');
            submitBtn.addEventListener('click', function () {
                let allAnswered = false;
                const title = document.getElementById('title');
                const question = document.getElementById('question');
                if (title.value !== '' && question.value !== '') {
                    allAnswered = true;
                }

                if (allAnswered) {
                    const questionId = title.value;
                    const questionText = question.value;
                    console.log(questionId, questionText);

                    fetch('/api/questions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ questionId, questionText }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            const index = container.childElementCount; 
                            container.appendChild(createCard(data.questionId, data.questionText, index));
                            title.value = ''; 
                            question.value = '';
                            modal.style.display = 'none'; 
                        })
                        .catch(error => {
                            console.error('Error adding question:', error);
                        });
                } else {
                    alert('Please fill all inputs before submitting.');
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
