$(document).ready(function () {
    const links = document.querySelectorAll('#svg a');

    function addClickEventListener(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
        

           
            const textElement = link.querySelector('text');
            if(textElement ){
                document.getElementById('tool').innerHTML= textElement.textContent
                console.log("Text content:", textElement.textContent);
                document.getElementById('card').scrollIntoView();
      
                
            }
                            
            var arrOfpercentages = [];
            const queryString = link.getAttribute('href');
            console.log(queryString)
            const regex = /(?<=param=)[^&]+/;
            const match = queryString.match(regex);
            
            function clearDiv(div) {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
            }
                     


        

            if (!match) {
                console.error("No match found in URL");
                return;
            }else{
                const paramArray = match[0].split(',');
                console.log(paramArray);
                const myDiv = document.getElementById('mydiv');
                myDiv.style = 'display:none;'
                clearDiv(myDiv)
                if (paramArray.length>1){
                    document.getElementById('mydiv').style.padding = '20px'
                    const a = document.getElementById('myChart')
                    clearDiv(a)

                   
                    
                    for(let i=0 ; i<paramArray.length; i++){
                        const button = document.createElement('a');
                    
                    // Set the button text
                    button.innerText ='Partition-' + (i+1) ;
                    button.href = 'display-csv.html?param='+paramArray[i];
                    // Optionally, you can add an id or class to the button
                    button.id = 'button' + i;
                    button.className = 'btn btn-primary';
                    button.style.width = '100%'
                    
                    // Append the button to the div
                    myDiv.appendChild(button);
                    myDiv.style.display='block'
                    

                    addClickEventListener(button);



                    }
                }
            }

            const csvFileName = match[0];
            console.log("CSV file name:", csvFileName);

            const political_parties = {
                "ΣΥΡΙΖΑ": "#FF6666", // Light Red
                "Νέα Δημοκρατία": "#6666FF", // Light Blue
                "Λαϊκός Σύνδεσμος - Χρυσή Αυγή": "#FFDD77", // Light Gold
                "Κίνημα Αλλαγής": "#33CC33", // Light Green
                "Κ.Κ.Ε.": "#CC3333", // Light Dark Red
                "Ένωση Κεντρώων": "#FFB266", // Light Orange
                "Ο.Κ.Δ.Ε.": "#CC66CC", // Light Purple
                "ΑΝΤ.ΑΡ.ΣΥ.Α.": "#CC9999", // Light Brown
                "Ελλήνων Συνέλευσις": "#66FFFF", // Light Cyan
                "ΕΕΚ Τροτσκιστές - Εργ.Επ.Κόμμα": "#FF66FF", // Light Magenta
                "Ελληνική Λύση - Κ. Βελόπουλος": "#66FF66", // Light Lime
                "Κ.Κ.Ε. (μ-λ)": "#CC6666", // Light Maroon
                "Μ-Λ Κ.Κ.Ε.": "#CCCC66", // Light Olive
                "Ε.ΠΑ.Μ - Α.Κ.Κ.ΕΛ": "#FFCCCC", // Light Pink
                "Λαϊκή Ενότητα": "#66CCCC", // Light Teal
                "ΜέΡΑ25": "#6666CC", // Light Navy
                "Δημιουργία ξανά - Θ. Τζήμερος": "#CCCCCC", // Light Gray
                "Πλεύση Ελευθερίας - Ζωή Κωνστ.": "#666666", // Light Black
                "Ανεξάρτητοι Υποψήφιοι": "#D9D9D9" // Light Silver
            };

        

            $.ajax({
                url: csvFileName,
                dataType: 'text',
                success: function (data) {
                    const employee_data = data.split(/\r?\n|\r/);
                    let table_data = '<table id="customers" border="10" cellpadding="10">';
                    var valid_votes = null;

                    for (let count = 0; count < 1; count++) {
                        const cell_data = employee_data[count].split(',');
                        const cell_data_last_row = employee_data[employee_data.length - 2].split(',');
                        for (let cell_count = 0; cell_count < cell_data.length; cell_count++) {
                            if (cell_data[cell_count] === "ΕΓΚΥΡΑ") {
                                valid_votes = parseInt(cell_data_last_row[cell_count]);
                            }
                            if (political_parties.hasOwnProperty(cell_data[cell_count])) {
                                table_data += '<tr>';
                                table_data += '<th bgcolor=' + political_parties[cell_data[cell_count]] + '>' + cell_data[cell_count] + '</th>';
                                table_data += '<th>' + (parseFloat(cell_data_last_row[cell_count], 10) / valid_votes * 100).toFixed(2) + '%' + '</th>';
                                table_data += '</tr>';
                                arrOfpercentages[cell_data[cell_count]] = (parseFloat(cell_data_last_row[cell_count], 10) / valid_votes * 100).toFixed(2);
                            } else {
                                table_data += '<tr>';
                                table_data += '<td>' + cell_data[cell_count] + '</td>';
                                table_data += '<td>' + cell_data_last_row[cell_count] + '</td>';
                                table_data += '</tr>';
                            }
                        }
                    }
                    table_data += '</table>';
                    $('#csv-table').html(table_data);

                    const sortedEntries = Object.entries(arrOfpercentages)
                        .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

                    const sortedKeys = sortedEntries.map(entry => entry[0]);
                    const sortedValues = sortedEntries.map(entry => parseFloat(entry[1]));

                    const sortedColors = sortedKeys.map(key => political_parties[key]);
                    
                    const layout = 
                    {responsive: true
                    };

                      var w = window.innerWidth;
                      console.log(w)
                      if (w < 460) {
                        layout.showlegend = false
                        const data1 = [{ labels:sortedKeys,values: sortedValues, marker: { colors: sortedColors, showscale: false }, type: "pie" }];
                        Plotly.newPlot("myChart", data1, layout);
                      } else {
                        const data1 = [{ labels: sortedKeys, values: sortedValues, marker: { colors: sortedColors, showscale: true }, type: "pie" }];
                        Plotly.newPlot("myChart", data1, layout);
                      }
                    
                    
                }
                
            });
           
        });
    } 

    links.forEach(link => {
        addClickEventListener(link);
    });

});