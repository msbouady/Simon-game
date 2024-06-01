var colors = ["blue", "green", "red", "yellow"];
var sounds = ["sounds/blue.mp3", "sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3"];
var gameStarted = false;
var gameSequence = [];
var playerSequence = [];
var level = 1; // Ajout de la variable de niveau

function generateSequence() {
    gameSequence = []; // Réinitialise la séquence du jeu
    for (var i = 0; i < level; i++) {
        var randomColorIndex = Math.floor(Math.random() * 4);
        gameSequence.push(colors[randomColorIndex]);
    }
}

function playSound(color) {
    var colorIndex = colors.indexOf(color);
    var sound = new Audio(sounds[colorIndex]);
    sound.play();
}

function removeText(text) {
    setTimeout(function () {
        text.style.display = "none";
    }, 2000);
}

function displaySequence() {
    var delay = 1000;
    gameSequence.forEach(function (color, index) {
        setTimeout(function () {
            playSound(color);
            animateButton(color);
        }, delay * index);
    });
}

function startGame() {
    var toast = document.getElementById("toast");
    toast.style.display = "block";
    removeText(toast);
    gameStarted = true;
    generateSequence(); // Génère la séquence du jeu
    displaySequence(); // Affiche la séquence du jeu
    playerSequence = []; // Réinitialise la séquence du joueur
}

function checkSequence() {
    for (var i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

function handleButtonClick(color) {
    if (gameStarted) {
        playerSequence.push(color);
        playSound(color);
        animateButton(color);
        if (!checkSequence()) {
            console.log("Mauvaise séquence !");
            endGame();
        } else if (playerSequence.length === gameSequence.length) {
            document.getElementById("level-title").textContent = "Niveau " + level;
            level++;
            playerSequence = [];
            setTimeout(startGame, 1000); // Commence le prochain niveau après un délai
        }
    } else {
        console.log("Le jeu n'a pas encore commencé !");
    }
}

function animateButton(color) {
    var button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(function () {
        button.classList.remove("pressed");
    }, 100);
}

function endGame() {
    gameStarted = false;
    gameSequence = [];
    playerSequence = [];
    level = 1;
    console.log("Fin du jeu !");
    document.querySelector("body").classList.add("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    // Réinitialiser le fond d'écran et le texte du niveau
    setTimeout(function() {
        document.querySelector("body").classList.remove("game-over"); 
    }, 700);
    document.getElementById("level-title").textContent = "Niveau 1";
    startGame();
}


colors.forEach(function (color) {
    var button = document.getElementById(color);
    button.addEventListener("click", function () {
        handleButtonClick(color);
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "a") {
        startGame();
    } else {
        var toast = document.getElementById("toast_2");
        toast.style.display = "block";
        removeText(toast);
    }
});
