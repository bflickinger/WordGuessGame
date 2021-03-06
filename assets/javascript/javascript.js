
var hangManGame = {
    hasStarted: false,
    gameWins: 0,
    gameLosses: 0,
    guessesLeft: 0,
    lettersGuessed: [],
    initialWord: "",
    tempArray: [],
    currentWord: "",
    hiddenWord: "",
    currentAsArray: [],
    hiddenAsArray: [],
    wordArray: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    wordIndex: [],


    resetGame: function() {
        this.lettersGuessed = [];
        this.wordIndex = Math.floor(Math.random() * 50);	
        this.currentWord = this.wordArray[this.wordIndex].toLowerCase();
        this.guessesLeft = this.currentWord.length + 2;
        this.hiddenAsArray = [];
        hangManGame.hideWord(this.currentWord);
        this.currentAsArray = this.currentWord.split('');
        // document.getElementById("hiddenWord").innerHTML = this.hiddenAsArray;
        hangManGame.updateHidden();
        document.getElementById("lettersGuessed").innerHTML = "--";
        document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
    },

    hideWord: function(word) {
       for (i = 0; i < word.length; i++) {
            if (word.charAt(i) == " ") {
                this.hiddenAsArray.push(' ');
            }
            else {
                this.hiddenAsArray.push('_');
            }           
        }
        console.log(this.hiddenAsArray);
        console.log(this.hiddenAsArray.toString());
    },

    processInput: function(key) {
        var key = key.toLowerCase();
        if (this.alphabet.indexOf(key) > -1) {
            if (this.currentAsArray.indexOf(key) > -1) {
                hangManGame.showLetter(key);
            }
            else {
                if (this.lettersGuessed.indexOf(key) > -1) {
                    return;
                }
                else {
                    this.guessesLeft--;
                    document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
                    this.lettersGuessed.push(key);
                    document.getElementById("lettersGuessed").innerHTML = this.lettersGuessed.join(' ');
                    if (this.guessesLeft == 0) {
                        alert("I'm sorry, the correct answer is: " + this.currentWord);
                        hangManGame.resetGame();
                        this.gameLosses++;
                        document.getElementById("gameLosses").innerHTML = this.gameLosses;
                    }
                }
            }
        }
    },

    showLetter: function(key) {
        for (i = 0; i < this.currentWord.length; i++) {
            if (key == this.currentAsArray[i]) {
                this.hiddenAsArray[i] = key;
            }
        }
        hangManGame.updateHidden();
        hangManGame.isWinner();
    },

    updateHidden: function() {
        document.getElementById("hiddenWord").innerHTML = "";
        for (var i = 0; i < this.hiddenAsArray.length; i++) {
            document.getElementById("hiddenWord").innerText += this.hiddenAsArray[i];
        }
        document.getElementById("hiddenWord").innerHTML = this.hiddenAsArray.toString().replace(/,/g, "");
    },

    isWinner: function() {
        if (this.hiddenAsArray.indexOf("_") === -1) {
            alert("Well done!  The correct answer is " + this.currentWord);
            this.gameWins++;
            document.getElementById("gameWins").innerHTML = this.gameWins;
            hangManGame.resetGame();
        }
    }

}

document.onkeypress = function (event) {
	if (!hangManGame.hasStarted) {
        document.getElementById("hiddenWord").innerHTML = "";
        hangManGame.resetGame();
		hangManGame.processInput(event.key);
        hangManGame.hasStarted = true;
	}
	else {
		hangManGame.processInput(event.key);
	}
}