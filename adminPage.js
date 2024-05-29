document.addEventListener('DOMContentLoaded', async function () {
    const labels = [
        'Strongly support government intervention (e.g., more regulations, higher taxes on the wealthy)',
        'Support some government intervention (e.g., moderate regulations, progressive taxes)',
        'Neutral (e.g., balanced approach between free market and regulation)',
        'Oppose government intervention (e.g., fewer regulations, lower taxes)',
        'Strongly oppose government intervention (e.g., minimal regulations, flat taxes)'
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
                container.appendChild(createCard(element.questionId, element.question, index));
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
                        body: JSON.stringify({ questionId, question: questionText }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('eoeoe',data)
                            const index = container.childElementCount; // Use the current number of cards as the index
                            container.appendChild(createCard(data.questionId, data.question, index));
                            title.value = ''; // Clear the input fields after submission
                            question.value = '';
                            modal.style.display = 'none'; // Close the modal
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
