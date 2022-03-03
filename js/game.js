let level = 0;
let life = 3;
let magic = 0;
const levelId = document.querySelector("#level");
const levelsId = document.querySelector("#levels");
const magicId = document.querySelector("#magic");
const lifeId = document.querySelector("#life");
const questionId = document.querySelector("#question");
const button1Id = document.querySelector("#button1");
const button2Id = document.querySelector("#button2");
const logId = document.querySelector("#log");
const decisionId = document.querySelector("#decision");

// Array levels
//     - [0] Array (Turn description)
//         - [0] Description of the situation for the player and a question
//         - [1] Array (Answer 1)
//             - [0] Button description
//             - [1] Life consequences of choice (-1 equals loss of one life)
//             - [2] The amount of magic obtained (1 means one elixir)
//             - [3] Description of the consequences of the chosen decision
//             - [4] Information whether the choice means fight (0 - no fight, 1 - fight)
//         - [2] Array (Answer 2)
//     - [...] Array (Turn description)
const levels = [
    ["Do you want to start the game?",
        ["Yes", 0, 0, "", 0],
        ["No", -3, 0, "", 0]],
    ["You come to a fork in the road. Are you going left or right?",
        ["Left", 0, 1, "✨✨✨ You get one magic potion ✨✨✨", 0],
        ["Right", 0, 0, "🌳🌳🌳 You admire the beautiful surroundings 🌳🌳🌳", 0]],
    ["You meet a monster, are you fighting it or running away?",
        ["Fight", -1, 0, "⚔️⚔️⚔️ The fight was hard ⚔️⚔️⚔️", 1],
        ["Escape", -2, 0, "😨😨😨 You got scared and you ran away. Unfortunately you fell over and injured 😨😨😨", 0]],
    ["You see the cave, what might be in it?",
        ["Skip", -1, 0, "🐻🐻🐻 You meet a bear that attacks you 🐻🐻🐻", 0],
        ["Enter", 0, 1, "✨✨✨ You get one magic potion ✨✨✨", 0]],
    ["You meet a beautiful elven princess who wants to steal your heart. What are you doing?",
        ["Run away", -1, 0, "❤️❤️❤️ You get hurt, and if you had enough magic and life, you saved yourself. ❤️❤️❤️", 1],
        ["Talk", -2, 0, "🖤🖤🖤 Your heart is trapped, to free it you spend 2 lives. You may not survive this. 🖤🖤🖤", 1]],
    ["You found a treasure 🤑 However, it is guarded by a monster. What are you doing?",
        ["Fight", -1, 0, "🤔🤔🤔 Did you have the right amount of lives and magic? Now you know 🤔🤔🤔", 1],
        ["Go away", 0, 0, "😁😁😁 You leave without a treasure, but you live ... so you win too 😁😁😁", 0]],
];

levelId.innerText = level;
levelsId.innerText = levels.length - 1;
magicId.innerText = magic;
lifeId.innerText = life;
questionId.innerText = levels[level][0];
button1Id.innerText = levels[level][1][0];
button2Id.innerText = levels[level][2][0];

document.querySelector("#button1").addEventListener("click", () => answer("b1"));
document.querySelector("#button2").addEventListener("click", () => answer("b2"));

function game() {
    if (level < levels.length) level++;
    if (level < levels.length && life > 0) {
        levelId.innerText = level;
        questionId.innerText = levels[level][0];
        button1Id.innerText = levels[level][1][0];
        button2Id.innerText = levels[level][2][0];
    } else if ((level === levels.length) && (life > 0)) {
        levelId.innerText = level - 1;
        logId.innerHTML += `<p class="game-over">
        💰💰💰💰<br>YOU WIN<br>💰💰💰💰</p>`;
        newGame();
    } else if (life === 0 && level === 1) {
        logId.innerHTML += `<p>You quit the game before you started</p><p class="game-over">
        🐔🐔🐔<br>CHICKEN<br>🐔🐔🐔</p>`;
        newGame();
    } else if (life === 0) {
        logId.innerHTML += `<p>You've lost all your lives</p><p class="game-over">
        💀💀💀💀<br>GAME OVER<br>💀💀💀💀</p>`;
        newGame();
    } else {
        console.log("Unforeseen event <2>")
    }
    logId.scrollTop = logId.scrollHeight - logId.clientHeight;
}

function newGame() {
    decisionId.innerHTML = `<button class="new-game" onclick="location.reload()">Start New Game</button>`;
}

function answer(button) {
    if (button === "b1") {
        updateGame(button1Id, 1);
    } else if (button === "b2") {
        updateGame(button2Id, 2);
    }
    lifeId.innerText = life;
    magicId.innerText = magic;
    game();
}
function updateGame(button, answer) {
    if (level !== 0) {
        logId.innerHTML += `<p>${levels[level][0]}</p>`;
        logId.innerHTML += `<p class="log-answer">> ${button.innerText}</p>`;
        logId.innerHTML += levels[level][answer][3];
        calculateResult(answer);
        logId.innerHTML += `<p class="next-tour">
        (===||:::::::::::::::> ( Next Tour ) <:::::::::::::::||===)
        </p>`;
    } else if (level === 0 && answer === 2) {
        life = 0;
    } else {
        console.log("Unforeseen event <5>")
    }
    logId.scrollTop = logId.scrollHeight - logId.clientHeight;
}

function calculateResult(answer) {
    if (level !== 0) {
        if (levels[level][answer][4] === 0) {
            life += levels[level][answer][1];
            if (levels[level][answer][2] > 0) {
                magic += levels[level][answer][2];
                logId.innerHTML += `
                <ul>
                    <li>the power of magic: ${magic}</li>
                </ul>`;
            } else if (levels[level][answer][1] < 0) {
                logId.innerHTML += `
                <ul>
                    <li>you are losing ${levels[level][answer][1] * (-1)} your life</li>
                </ul>`;
            }
        } else if (levels[level][answer][4] === 1) {
            if (magic > 0) {
                life += levels[level][answer][1] + magic;
                logId.innerHTML += `<p>You used magic to fight the monster:
                <ul>
                    <li>the power of magic: ${magic}</li>
                    <li>the strength of the monster: ${levels[level][answer][1] * (-1)}</li>
                    <li>you haven't lost ${Math.abs(levels[level][answer][1] + magic)} life</p></li>
                </ul>`;
                magic = 0;
            } else if (magic === 0) {
                life += levels[level][answer][1];;
                logId.innerHTML += `<p>You used magic to fight the monster:
                <ul>
                    <li>the power of magic: ${magic}</li>
                    <li>the strength of the monster: ${levels[level][answer][1] * (-1)}</li>
                    <li>you have lost ${levels[level][answer][1] * (-1)} lifes</p></li>
                </ul>`;
            }
            else {
                console.log("Unforeseen event <3>")
            }
        } else {
            console.log("Unforeseen event <4>")
        }
    }
    logId.scrollTop = logId.scrollHeight - logId.clientHeight;
}