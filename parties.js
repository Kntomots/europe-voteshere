document.addEventListener('DOMContentLoaded', async function () {
    function createCard(party, text, cardIndex, partyId) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardParty = document.createElement('h5');
        cardParty.className = 'card-party';
        cardParty.innerText = party;
        cardBody.appendChild(cardParty);

        const div = document.createElement('div');
        div.className = 'flex-container';

        text.forEach((data) => {
            const labelQuestionId = document.createElement('label');
            labelQuestionId.innerHTML = `Question Id: ${data['questionId']}  Answer = ${data['answer']}`;
            labelQuestionId.className = 'inline-label';
            div.appendChild(labelQuestionId);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.innerHTML = 'Delete';

        deleteBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this party?')) {
                fetch(`/api/parties/${partyId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        card.remove(); 
                    } else {
                        alert('Failed to delete the party');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while trying to delete the party');
                });
            }
        });

        cardBody.appendChild(div);
        cardBody.appendChild(deleteBtn);

        card.appendChild(cardBody);

        return card;
    }

    const container = document.getElementById('container');
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementsByClassName("closeBtn")[0];

    btn.style.display = 'flex';
    btn.style.width = '100%';
    btn.className = 'btn btn-primary';
    btn.style.justifyContent = 'center';

    btn.onclick = function () {
        modal.style.display = "block";
        const div = document.getElementById('test');
        div.className = 'test';
        div.innerHTML = ''; 

        const questionIdLabel = document.createElement('label');
        questionIdLabel.innerHTML = 'Party Name ';
        const partyNameInput = document.createElement('input');
        partyNameInput.id = 'partyName';
        partyNameInput.required = true; 
        div.appendChild(questionIdLabel);
        div.appendChild(partyNameInput);

        fetch('/api/questions')
            .then(response => response.json())
            .then(data => {
                data.forEach((e) => {
                    const label = document.createElement('label');
                    label.innerHTML = e.questionId;
                    const inputId = document.createElement('input');
                    inputId.id = `question_${e.questionId}`;
                    inputId.type = 'number';
                    inputId.min = '0';
                    inputId.max = '4';
                    inputId.required = true; 
                    inputId.addEventListener('input', function () {
                        if (inputId.value < 0) {
                            alert('Based on possible answers we can accept only inputs from 0 to 4');
                            inputId.value = 0;
                        }
                        if (inputId.value > 4) {
                            alert('Based on possible answers we can accept only inputs from 0 to 4');
                            inputId.value = 4;
                        }
                    });

                    div.appendChild(label);
                    div.appendChild(inputId);
                });

                const submitBtn = document.createElement('button');
                submitBtn.className = 'btn btn-success';
                submitBtn.innerHTML = 'Submit';
                submitBtn.style.marginTop = '10px';
                submitBtn.addEventListener('click', function () {
                    if (!partyNameInput.checkValidity()) {
                        alert("Please fill out the party name.");
                        return;
                    }

                    const inputElements = div.querySelectorAll('input[type="number"]');
                    for (let inputElement of inputElements) {
                        if (!inputElement.checkValidity()) {
                            alert("Please enter valid answers between 0 and 4 for all questions.");
                            return;
                        }
                    }

                    const partyName = partyNameInput.value;
                    const answers = data.map(e => ({
                        questionId: e.questionId,
                        answer: document.getElementById(`question_${e.questionId}`).value
                    }));

                    const payload = {
                        party_name: partyName,
                        Answers: answers
                    };

                    fetch('/api/parties', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log('Success:', result);
                        modal.style.display = "none";
                        document.getElementById('test').innerHTML = '';
                        loadParties();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });

                div.appendChild(submitBtn);
            });
    };

    span.onclick = function () {
        modal.style.display = "none";
        document.getElementById('test').innerHTML = '';
    };

    function loadParties() {
        fetch('/api/parties')
            .then(response => response.json())
            .then(data => {
                container.innerHTML = ''; 
                data.forEach((element, index) => {
                    container.appendChild(createCard(element.party_name, element.Answers, index, element._id));
                });
            });
    }

    loadParties();
});
