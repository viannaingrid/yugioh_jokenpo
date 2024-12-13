const state = {
    score: {
        playerScore: 0,
        ComputerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playersSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards"),
        player2: "computer-cards", // Adicionado
    },
    actions: {
        button: document.getElementById("next-duel"),
    }
};

const pathImages = "./src/assets/icons/";

const cardData = [
    { id: 0, name: "Blue Eyes White Dragon", type: "Paper", img: `${pathImages}dragon.png`, WinOf: [1], LoseOf: [2] },
    { id: 1, name: "Dark Magician", type: "Rock", img: `${pathImages}magician.png`, WinOf: [2], LoseOf: [0] },
    { id: 2, name: "Exodia", type: "Scissors", img: `${pathImages}exodia.png`, WinOf: [0], LoseOf: [1] },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playersSides.player1) {
        cardImage.addEventListener("mouseover", () => drawSelectCard(IdCard));
        cardImage.addEventListener("click", () => setCardsField(cardImage.getAttribute("data-id")));
    }

    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImage();

    const computerCardId = await getRandomCardId();
    if (!cardData[cardId] || !cardData[computerCardId]) return;

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

function removeAllCardsImage() {
    const { computerBox, player1Box } = state.playersSides;
    computerBox.querySelectorAll("img").forEach((img) => img.remove());
    player1Box.querySelectorAll("img").forEach((img) => img.remove());
}

function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "atribute: " + cardData[index].type;
}

function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = getRandomCardId();
        const cardImage = createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, state.playersSides.player1);
    drawCards(5, state.playersSides.computer);
}

init();
