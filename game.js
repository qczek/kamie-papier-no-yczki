const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: null,
    aiHand: null

}

const hands = document.querySelectorAll('.select img');
function handSelection() {

    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = "")
    this.style.boxShadow = '0 0 0 4px yellow';


}
function checkResult(player, ai) {
    console.log(player)
    console.log(ai)
    if (player === ai) {
        return "remis"
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "wygrałeś"
    } else {
        return "przegrałeś"
    }


}

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return aiHand;
}
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    gameSummary.numbers++;
    document.querySelector('p.numbers span').textContent = gameSummary.numbers;
    if (result === 'wygrałeś') {
        gameSummary.wins++;
        document.querySelector('p.wins span').textContent = gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "Ty wygrałeś";
        document.querySelector('[data-summary="who-win"]').style.color = "green"
    } else if (result === "przegrałeś") {
        gameSummary.losses++;
        document.querySelector('p.losses span').textContent = gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "Przegrałeś";
        document.querySelector('[data-summary="who-win"]').style.color = "red"
    } else {
        gameSummary.draws++;
        document.querySelector('p.draws span').textContent = gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "remis";
        document.querySelector('[data-summary="who-win"]').style.color = "yellow"
    }
}
function endGame() {
    document.querySelector(`[data-option = ${game.playerHand}]`).style.boxShadow = "";
}
function startGame() {
    if (!game.playerHand) {
        return alert('nie wybrałeś')
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand)
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();

}
hands.forEach(hand => hand.addEventListener('click', handSelection));
document.querySelector('.start').addEventListener('click', startGame)