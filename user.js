document.addEventListener('DOMContentLoaded', function() {
    const labels = [
        'Strongly support government intervention (e.g., more regulations, higher taxes on the wealthy)',
        'Support some government intervention (e.g., moderate regulations, progressive taxes)',
        'Neutral (e.g., balanced approach between free market and regulation)',
        'Oppose government intervention (e.g., fewer regulations, lower taxes)',
        'Strongly oppose government intervention (e.g., minimal regulations, flat taxes)'
    ];
    function calculateSimilarity(userAnswer, partyAnswer) {
        const maxDifference = 4; // Maximum possible difference (5 - 1)
        const difference = Math.abs(userAnswer - partyAnswer);
        const similarity = 1 - (difference / maxDifference);
        return similarity;
    }
    function calculateMatchPercentage(userAnswers, partyAnswers) {
        let totalSimilarity = 0;
        let totalQuestions = userAnswers.length;
    
        userAnswers.forEach(userAnswer => {
            const partyAnswer = partyAnswers.find(Answer => Answer.questionId === userAnswer.questionId);
            if (partyAnswer) {
                const similarity = calculateSimilarity(userAnswer.answer, partyAnswer.answer);
                totalSimilarity += similarity;
            }
        });
    
        // Calculate the percentage of alignment
        const matchPercentage = (totalSimilarity / totalQuestions) * 100;
        return matchPercentage.toFixed(2); // Return percentage with two decimal points
    }
    
    function calculateAllPartyPercentages(userAnswers, parties) {
        return parties.map(party => {
            console.log('dsddsa',party.Answers)
            const percentage = calculateMatchPercentage(userAnswers, party.Answers);
            return { partyName: party.party_name, matchPercentage: percentage };
        });
    }

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
    
        // Append card body to card container
        card.appendChild(cardBody);
    
        return card;
    }
    

    const container = document.getElementById('container');
    fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
            console.log('Data from MongoDB:', data);
            data.forEach((element, index) => {
                container.appendChild(createCard(element['questionId'], element['question'], index));
            });

            

            const submitBtn = document.createElement('button');
            submitBtn.className = 'btn btn-primary submit-btn';
            submitBtn.innerText = 'Submit';
            document.getElementById('content').appendChild(submitBtn);

            submitBtn.addEventListener('click', function() {
                const cards = container.querySelectorAll('.card-body');
                let allAnswered = true;
                const answers = [];


                cards.forEach(card => {
                    const radioButtons = card.querySelectorAll('input[type="radio"]');
                    const isChecked = Array.from(radioButtons).find(rb => rb.checked);
                    if (!isChecked) {
                        allAnswered = false;
                        card.querySelector('.card-title').style.color = 'red'; // Highlight unanswered questions
                    } else {
                        card.querySelector('.card-title').style.color = ''; // Reset color if answered
                        answers.push({questionId: card.querySelector('.card-title').innerText, answer: isChecked.id[isChecked.id.length-1]});

                    }
                });

                if (allAnswered) {
                    console.log(answers) 
                    fetch('/api/parties')
                    .then(response => response.json())
                    .then(data => {
                        console.log('Data from MongoDB:', data);
                        const matchPercentages = calculateAllPartyPercentages(answers, data);
                        container.style.display = "none";
                        submitBtn.style.display = "none";

                        matchPercentages.forEach((e) => {
                            console.log(e['partyName'],e['matchPercentage'])

                        
                        const resultDiv = document.createElement('div');
                        resultDiv.className = 'result-item';
                        resultDiv.style.padding = '10px';
                        resultDiv.style.margin = '10px';
                        resultDiv.style.backgroundColor = 'white'
                        resultDiv.style.border = '1px solid #ccc';
                        resultDiv.style.borderRadius = '5px';
                        resultDiv.style.textAlign = 'center';

                        // Create an element for the party name
                        const partyNameElem = document.createElement('h4');
                        partyNameElem.innerText = e['partyName'];
                        resultDiv.appendChild(partyNameElem);

                        // Create an element for the match percentage
                        const matchPercentageElem = document.createElement('p');
                        matchPercentageElem.innerText = `Match Percentage: ${e['matchPercentage']}%`;
                        resultDiv.appendChild(matchPercentageElem);

                        // Append the result div to the container
                        document.getElementById('content').appendChild(resultDiv);


                    })
                        
                    });                    
                } else {
                    alert('Please answer all questions before submitting.');
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

