


// ***HAMBURGER-MENU***

const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener('click', function(){
    this.classList.toggle("close");
    
})


// ***THEME***

// To set theme on page load based on localStorage
document.addEventListener("DOMContentLoaded", function() {
  const themeSelector = document.getElementById('theme-selector');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.body.className = savedTheme; // Apply the saved theme class
    themeSelector.value = savedTheme; // Set the selector to match the saved theme
  }

  // Change theme when user selects a new one
  themeSelector.addEventListener('change', function() {
    const selectedTheme = themeSelector.value;
    document.body.className = selectedTheme; // Apply the theme class
    localStorage.setItem('theme', selectedTheme); // Save the selected theme to localStorage
  });
});





function loadSavedWords() {
          const savedList = document.getElementById('savedWordsList');
        
          // Tarkistetaan, että savedWordsList-elementti on olemassa tällä sivulla
          if (savedList) {
            const savedWords = JSON.parse(localStorage.getItem('savedWords')) || [];
            savedList.innerHTML = ''; // Tyhjennetään lista ennen lataamista
        
            // Käytetään Set-objektia estämään duplikaattien lisääminen
            const uniqueWords = new Set();
        
            savedWords.forEach(item => {
              const key = item.word.toUpperCase(); // Muutetaan sana isoiksi kirjaimiksi vertailua varten
              if (!uniqueWords.has(key)) { // Tarkistetaan, onko sana jo lisätty
                uniqueWords.add(key); // Lisätään sana Settiin
        
                // Luodaan listaelementti
                const listItem = document.createElement('li');
                listItem.textContent = `${item.word} = ${item.translation}`;
        

                savedList.appendChild(listItem);
              }
            });
          }
        }
    
  document.getElementById('delBtn').addEventListener('click', function() {
    localStorage.removeItem('savedWords')
    loadSavedWords()
  })
  
  

//***CHARACTER AND SPEECH BUBBLE***

const texts = [
    "Voit valita Topics -valikosta arvattavan sanan pituuden tai kaikki sanat. ",
    "Kirjaimen laatikko muuttuu keltaiseksi, jos arvattu kirjain on oikea mutta väärässä kohdassa.",
    "Kirjaimen laatikko muuttuu vihreäksi, jos arvattu kirjain on oikea ja oikeassa kohdassa.",
    "Kirjaimen laatikko sekä näppäimistön kirjain muuttuvat harmaaksi, jos arvattua kirjainta ei ole arvattavassa sanassa.",
    "Voit tallentaa sanan ja sen käännöksen myöhempää tarkastelua varten Saved words näkymän listaan arvattuasi oikein.",
    "Halutessasi tyhjentää tallennettujen sanojen listan, paina empty list- painiketta listan alla."
];

  // Reference to the text element
  const puheTeksti = document.getElementById('puheTeksti');

  // Counter to keep track of current text index
  let currentTextIndex = 0;
  let intervalId; // to hold the interval ID for pausing
  let isPaused = false; // to indicate if the carousel is paused

  // Function to update the text
  function updateText() {
      puheTeksti.textContent = texts[currentTextIndex];
  }

  // Function to start the carousel
  function startCarousel() {
      intervalId = setInterval(() => {
          currentTextIndex = (currentTextIndex + 1) % texts.length; // Loop through texts
          updateText();
      }, 4500); // Change text every 4.5 seconds
  }

  // Pause functionality
  document.getElementById('pauseButton').addEventListener('click', function() {
      if (!isPaused) {
          clearInterval(intervalId);
          intervalId = null; // Reset intervalId to indicate paused
          this.textContent = ">"; // Change icon to ">" when paused
      } else {
          startCarousel(); // Resume the carousel
          this.textContent = "||"; // Change icon back to "||" when running
      }
      isPaused = !isPaused; // Toggle the paused state
  });

  // Back button functionality
  document.getElementById('backButton').addEventListener('click', function() {
      currentTextIndex = (currentTextIndex - 1 + texts.length) % texts.length; // Go back
      updateText();
  });

  // Next button functionality
  document.getElementById('nextButton').addEventListener('click', function() {
      currentTextIndex = (currentTextIndex + 1) % texts.length; // Go forward
      updateText();
  });

  // Initialize the carousel on page load
  startCarousel();




  

// Kutsutaan loadSavedWords vain, jos olemme saved words -sivulla
window.onload = loadSavedWords;