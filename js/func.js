// DOM-elements
const wordGrid = document.getElementById("wordGrid"); // Word grid for the game
const keyboard = document.getElementById("keyboard"); // Keyboard for the game

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet used in the game

//***DICTIONARIES***


// words in english

// HOX! NEEDS TO BE UPPER CASE TO WORK
const dictionary = [
    "ALGORITHM",
    "APPLICATION",
    "BANDWIDTH",
    "DATABASE",
    "DEBUGGING",
    "ENCRYPTION",
    "FRAMEWORK",
    "FUNCTION",
    "LIBRARY",
    "MARKUP",
    "NETWORK",
    "PROTOCOL",
    "REPOSITORY",
    "SERVER",
    "SOFTWARE",
    "STYLESHEET",
    "VARIABLE",
    "PROGRAMMING",
    // 4-letter ICT words
    "DATA",
    "CODE",
    "BYTE",
    "LINK",
    "NODE",
    "HTML",
    "FONT",
    "JAVA",
    // 5-letter ICT words
    "CACHE",
    "ARRAY",
    "INPUT",
    "LOGIN",
    "STACK",
    "VIRUS",
    "BOARD",
    "PATCH",
    "MOUSE",
    // 6-letter ICT words
    "DOMAIN",
    "CLIENT",
    "SCRIPT",
    "MEMORY",
    "DRIVER",
    "BACKUP",
    "EXPORT",
    "COOKIE",
    "KERNEL",
    "UPLOAD"
];

// translations in Finnish
const translations = {
    "algorithm": "algoritmi",
    "application": "sovellus",
    "bandwidth": "kaistanleveys",
    "database": "tietokanta",
    "debugging": "virheenkorjaus",
    "encryption": "salaus",
    "framework": "kehys",
    "function": "funktio",
    "library": "kirjasto",
    "markup": "merkkauskieli",
    "network": "verkko",
    "protocol": "protokolla",
    "repository": "varasto",
    "server": "palvelin",
    "software": "ohjelmisto",
    "stylesheet": "tyylitiedosto",
    "variable": "muuttuja",
    "programming": "ohjelmointi",
    "data": "data",
    "code": "koodi",
    "byte": "tavu",
    "link": "linkki",
    "node": "solmu",
    "html": "html",
    "font": "kirjasin",
    "java": "java",
    "cache": "välimuisti",
    "array": "taulukko",
    "input": "syöte",
    "login": "kirjautuminen",
    "stack": "pino",
    "virus": "virus",
    "board": "levy",
    "patch": "korjaus",
    "mouse": "hiiri",
    "domain": "verkkotunnus",
    "client": "asiakas",
    "script": "käsikirjoitus",
    "memory": "muisti",
    "driver": "ajuri",
    "backup": "varmuuskopio",
    "export": "vienti",
    "cookie": "eväste",
    "kernel": "ydin",
    "upload": "lähetys"
};



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


// ***TOPICS SELECT***

// *** DICTIONARY FILTERING BASED ON SELECTION FROM TOPICS ***
const allLetterWords = dictionary; // Use the full dictionary
const fourLetterWords = dictionary.filter(word => word.length === 4);
const fiveLetterWords = dictionary.filter(word => word.length === 5);
const sixLetterWords = dictionary.filter(word => word.length === 6);

// Elementti, johon asetetaan valitun aiheen nimi
const aiheOtsikko = document.querySelector('.aiheOtsikko h3');

// Add event listeners for the menu items
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('allWords').addEventListener('click', () => {
    updateDictionary(allLetterWords, "All Words");
  });
  document.getElementById('4letterWords').addEventListener('click', () => {
    updateDictionary(fourLetterWords, "4 Letter Words");
  });
  document.getElementById('5letterWords').addEventListener('click', () => {
    updateDictionary(fiveLetterWords, "5 Letter Words");
  });
  document.getElementById('6letterWords').addEventListener('click', () => {
    updateDictionary(sixLetterWords, "6 Letter Words");
  });

  // Initialize the game on page load with full dictionary by default
  window.onload = () => newGame(allLetterWords, "All Words");
});

// Function to update the game with the new word set and update the title
function updateDictionary(filteredWords, topicName) {
  currentWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  aiheOtsikko.textContent = ` ${topicName}`; // Update aiheOtsikko title
  newGame(filteredWords, topicName); // Start a new game with the chosen topic
}

// Start new game function, using full dictionary by default (all words)
const newGame = (filteredWords = allLetterWords, topicName = "All Words") => {
  currentWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  wordGrid.innerHTML = ""; // Clear previous grid
  currentGuess = "";
  currentLetterIndex = 0;
  currentRow = 0;
  aiheOtsikko.textContent = ` ${topicName}`; // Set aiheOtsikko title for new game
  createRows();
  createKeyboard();
};



// Create one row for the word grid
function createRows() {
    const newRow = document.createElement('div');
    newRow.classList.add('word-grid');
    for (let i = 0; i < currentWord.length; i++) {
        const box = document.createElement('div');
        box.classList.add('word-box');
        newRow.appendChild(box);
    }
    wordGrid.appendChild(newRow);
}

// Create keyboard
function createKeyboard() {
    keyboard.innerHTML = ""; // Clear previous keyboard
    alphabet.split('').forEach(letter => {
        const key = document.createElement('div');
        key.classList.add('key');
        key.textContent = letter;
        key.addEventListener('click', () => handleKeyPress(letter));
        keyboard.appendChild(key);
    });

    // Add delete and enter keys
    const deleteKey = document.createElement('div');
    deleteKey.classList.add('key', 'delete-key');
    deleteKey.textContent = String.fromCharCode(0x232B); // Unicode character for backspace
    deleteKey.addEventListener('click', handleDelete);
    keyboard.appendChild(deleteKey);

    const enterKey = document.createElement('div');
    enterKey.classList.add('key', 'enter-key');
    enterKey.textContent = String.fromCharCode(0x21B5); // Unicode character for enter
    enterKey.addEventListener('click', handleEnter);
    keyboard.appendChild(enterKey);
}

// Handle key press; add letter to guess when key is pressed
function handleKeyPress(letter) {
    if (currentLetterIndex < currentWord.length) {
        const currentRowElement = wordGrid.children[currentRow];
        const boxes = currentRowElement.getElementsByClassName('word-box');
        boxes[currentLetterIndex].textContent = letter;
        currentGuess += letter;
        currentLetterIndex++;
    }
}

//delete function
function handleDelete() {
    if (currentLetterIndex > 0) {
        currentLetterIndex--;
        const currentRowElement = wordGrid.children[currentRow];
        const boxes = currentRowElement.getElementsByClassName('word-box');
        boxes[currentLetterIndex].textContent = '';
        currentGuess = currentGuess.slice(0, -1);
    }
}

//enter function
function handleEnter() {
    if (currentGuess.length === currentWord.length) {
        checkGuess();
        if (currentGuess === currentWord) {
            win();
        } else {
            currentRow++;
            currentLetterIndex = 0;
            currentGuess = "";
            createRows();
        }
    }
}


// Check if guess is correct
function checkGuess() {
    const currentRowElement = wordGrid.children[currentRow];
    const boxes = currentRowElement.getElementsByClassName('word-box');
    let wordCopy = currentWord.split('');

    //correct letter and position
    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i] === currentWord[i]) {
            boxes[i].style.backgroundColor = 'lightgreen';
            wordCopy[i] = null;
        }
    }

    //correct letter but wrong position
    for (let i = 0; i < currentGuess.length; i++) {
        if (wordCopy.includes(currentGuess[i]) && boxes[i].style.backgroundColor !== 'lightgreen') {
            boxes[i].style.backgroundColor = 'yellow';
            wordCopy[wordCopy.indexOf(currentGuess[i])] = null;
        }
    }

    //wrong letter
    for (let i = 0; i < currentGuess.length; i++) {
        if (!currentWord.includes(currentGuess[i]) && boxes[i].style.backgroundColor !== 'lightgreen' && boxes[i].style.backgroundColor !== 'yellow') {
            boxes[i].style.backgroundColor = 'gray';
            disableKey(currentGuess[i], 'gray');
        }
    }
}

//keyboard key color change when wrong letter
function disableKey(letter, color) {
    const keys = document.getElementsByClassName('key');
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].textContent === letter) {
            keys[i].style.backgroundColor = color;
            break;
        }
    }
}

// Function to be called on win
function win() {
    const translation = translations[currentWord.toLowerCase()];
    const save = confirm(`You have guessed right! The word is "${currentWord}", which means "${translation}" in Finnish. Do you want to save the word?`);
    
    if (save) {
        addSavedList(currentWord, translation); // Save the word in localStorage
        alert('Word saved!');
    }
    
    newGame(); // Start a new game after winning
}

// Save the word in localStorage
function addSavedList(word, translation) {
    // get saved words or create empty array
    let savedWords = JSON.parse(localStorage.getItem('savedWords')) || [];
    
    // add new word and translation to array
    
    savedWords.push({ word, translation });
    
    // save array to localStorage
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
}


// Initialize the game on page load
window.onload = newGame;
