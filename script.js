const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTime = maxTime => {

    clearInterval(timer);
    timer = setInterval(() => {
         if(maxTime > 0 ){
            maxTime--; // decrement maxtime by -1
            return timeText.innerText = maxTime;
         }

         clearInterval(timer);
         alert (`Time off! ${correctWord.toUpperCase()} was the correct word `);
         initGame(); // calling initGame function, so the game resert
    },1000);
}

const initGame = () => {

    initTime(20); // calling initTime function with passing 30 as maxTime value

    let randomObj = words[Math.floor(Math.random() * words.length)];//getting random object from words

    let wordArray = randomObj.word.split("");//splitting each letter of random word

    for (let i = wordArray.length -1; i > 0; i--){

        let j = Math.floor(Math.random() * (i + 1)); //getting random number

       // shuffling and swiping wordArray letter randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]; 
    }
    
    wordText.innerText = wordArray.join(""); // passing shuffled word as word text

    hintText.innerText = randomObj.hint; // passing random object hint as hint text

    correctWord = randomObj.word.toLowerCase(); // passing random word to correctword

    inputField.value = ""; // making input field empty

    inputField.setAttribute("maxiength",correctWord.length); // setting input maxlength attr value to word length
    
   
}

initGame();

const checkWord  = () =>{

    let userWord = inputField.value.toLowerCase(); // getting user value

    if(!userWord) return alert ("please enter a word check"); // if user did't enter anything

    // if user word doesn't matched with the correct word 
    if(userWord !== correctWord) return alert (`Oop! ${userWord} is not a correct word `);

    // if above two if coditions are failed then show congrats alert because user word is correct
    alert (`Congrates! ${userWord.toLocaleUpperCase()} is a correct word `);
    initGame();
}


refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);