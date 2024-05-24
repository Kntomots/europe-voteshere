const europeanCountries = {
  "Albania": "https://en.wikipedia.org/wiki/2021_Albanian_parliamentary_election",
  "Andorra": "https://en.wikipedia.org/wiki/2023_Andorran_parliamentary_election",
  "Armenia": "https://en.wikipedia.org/wiki/2021_Armenian_parliamentary_election",
  "Austria": "https://en.wikipedia.org/wiki/2024_Austrian_legislative_election",
  "Azerbaijan": "https://en.wikipedia.org/wiki/2024_Azerbaijani_presidential_election",
  "Belarus": "https://en.wikipedia.org/wiki/2024_Belarusian_parliamentary_election",
  "Belgium": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election",
  "Bosnia and Herzegovina": "https://en.wikipedia.org/wiki/2022_Bosnian_general_election",
  "Bulgaria": "https://en.wikipedia.org/wiki/2024_Bulgarian_parliamentary_election",
  "Croatia": "https://en.wikipedia.org/wiki/2024_Croatian_parliamentary_election",
  "Cyprus": "https://en.wikipedia.org/wiki/2023_Cypriot_presidential_election",
  "Czech Republic": "https://en.wikipedia.org/wiki/2021_Czech_parliamentary_election",
  "Denmark": "https://en.wikipedia.org/wiki/2022_Danish_general_election",
  "Estonia": "https://en.wikipedia.org/wiki/2023_Estonian_parliamentary_election",
  "Finland": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election",
  "France": "https://en.wikipedia.org/wiki/2022_French_legislative_election",
  "Georgia": "https://en.wikipedia.org/wiki/2024_Georgian_parliamentary_election",
  "Germany": "https://en.wikipedia.org/wiki/2021_German_federal_election",
  "Greece": "https://en.wikipedia.org/wiki/June_2023_Greek_legislative_election",
  "Hungary": "https://en.wikipedia.org/wiki/2022_Hungarian_parliamentary_election",
  "Iceland": "https://en.wikipedia.org/wiki/2021_Icelandic_parliamentary_election",
  "Ireland": "https://en.wikipedia.org/wiki/2020_Irish_general_election",
  "Italy": "https://en.wikipedia.org/wiki/2022_Italian_general_election",
  "Kazakhstan": "https://en.wikipedia.org/wiki/2023_Kazakh_legislative_election",
  "Kosovo": "https://en.wikipedia.org/wiki/2021_Kosovan_parliamentary_election",
  "Latvia": "https://en.wikipedia.org/wiki/2022_Latvian_parliamentary_election",
  "Liechtenstein": "https://en.wikipedia.org/wiki/2021_Liechtenstein_general_election",
  "Lithuania": "https://en.wikipedia.org/wiki/2024_Lithuanian_parliamentary_election",
  "Luxembourg": "https://en.wikipedia.org/wiki/2023_Luxembourg_general_election",
  "Malta": "https://en.wikipedia.org/wiki/2022_Maltese_general_election",
  "Moldova": "https://en.wikipedia.org/wiki/2021_Moldovan_parliamentary_election",
  "Monaco": "https://en.wikipedia.org/wiki/2023_Monegasque_general_election",
  "Montenegro": "https://en.wikipedia.org/wiki/2023_Montenegrin_parliamentary_election",
  "Netherlands": "https://en.wikipedia.org/wiki/2023_Dutch_general_election",
  "North Macedonia": "https://en.wikipedia.org/wiki/2024_North_Macedonian_parliamentary_election",
  "Norway": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election",
  "Poland": "https://en.wikipedia.org/wiki/2023_Polish_parliamentary_election",
  "Portugal": "https://en.wikipedia.org/wiki/2024_Portuguese_legislative_election",
  "Romania": "https://en.wikipedia.org/wiki/2020_Romanian_parliamentary_election",
  "Russia": "https://en.wikipedia.org/wiki/2024_Russian_presidential_election",
  "San Marino": "https://en.wikipedia.org/wiki/2019_San_Marino_general_election",
  "Serbia": "https://en.wikipedia.org/wiki/2023_Serbian_parliamentary_election",
  "Slovakia": "https://en.wikipedia.org/wiki/2023_Slovak_parliamentary_election",
  "Slovenia": "https://en.wikipedia.org/wiki/2022_Slovenian_parliamentary_election",
  "Spain": "https://en.wikipedia.org/wiki/2023_Spanish_general_election",
  "Sweden": "https://en.wikipedia.org/wiki/2022_Swedish_general_election",
  "Switzerland": "https://en.wikipedia.org/wiki/2023_Swiss_federal_election",
  "Turkey": "https://en.wikipedia.org/wiki/2024_Turkish_local_elections",
  "Ukraine": "https://en.wikipedia.org/wiki/2019_Ukrainian_presidential_election",
  "United Kingdom": "https://en.wikipedia.org/wiki/2019_United_Kingdom_general_election",
  "Vatican City": ""
};



document.addEventListener('DOMContentLoaded', async function () {
  document.getElementById('Greece-map').style.display = "none";

  const tooltip = document.getElementById('tooltip');

  document.querySelectorAll('path').forEach(path => {
      path.addEventListener('click', function(event) {
          const name = event.target.getAttribute('name');
          console.log(event.target.id);
          if (Object.keys(europeanCountries).includes(name)) {
              var html_string = europeanCountries[name];
              document.getElementById('frameId').src = html_string;
              if (name == 'Greece') {
                  document.getElementById('Greece-map').style.display = "inline";
              } else {
                  document.getElementById('Greece-map').style.display = "none";
              }
          }
          document.getElementById('tool').innerHTML = name;
      });

      path.addEventListener('mousemove', function(event) {
          // Your mousemove logic here
      });

      path.addEventListener('mouseleave', function() {
          // Your mouseleave logic here
      });
  });

  
});
