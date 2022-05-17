const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectWord = getRandomWord();

function getRandomWord(){
    const words = ["javascrıpt", "java", "python", "html", "css", "react", "bootstrap", "angular", "taılwınd", "redux", "typescrıpt", "sass", "webpack", "ajax"];

    return words[Math.floor(Math.random() * words.length)];
}

function displayWord(){
    word_el.innerHTML = `
    ${selectWord.split('').map(letter => 
        `<div class="letter">
            ${correctLetters.includes(letter) ? letter: ''}
        </div>
        `).join('')
    }`;

    const w = word_el.innerText.replace(/\n/g, '');
    if(w === selectWord){
        popup.style.display = 'flex';
        message_el.innerHTML = '<p>Tebrikler, kazandınız &#128526;</p>';
    }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if(index < errorCount){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        message_el.innerHTML = '<p>Maalesef kaybettiniz &#128532;</p>';
    }
}

function displayMessage(){
    message.classList.add('show');

    setTimeout(function() {
        message.classList.remove('show');
    }, 2000)
}

PlayAgainBtn.addEventListener('click', function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});

window.addEventListener('keydown', function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
                message.classList.add('show');
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
});

displayWord();