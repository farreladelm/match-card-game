cardArray = [
    {
    name: "donut",
    img: "/images/donut.png"
    },
    {
        name: "donut",
        img: "/images/donut.png"
    },
    {
        name: "grape",
        img: "/images/grape.png"
    },
    {
        name: "grape",
        img: "/images/grape.png"
    },
    {
        name: "lemon",
        img: "/images/lemon.png"
    },
    {
        name: "lemon",
        img: "/images/lemon.png"
    },
    {
        name: "pear",
        img: "/images/pear.png"
    },
    {
        name: "pear",
        img: "/images/pear.png"
    },
    {
        name: "pizza",
        img: "/images/pizza.png"
    },
    {
        name: "pizza",
        img: "/images/pizza.png"
    },
    {
        name: "steak",
        img: "/images/steak.png"
    },
    {
        name: "steak",
        img: "/images/steak.png"
    },
];

const grid = document.querySelector(".grid");
const score = document.querySelector(".score");
const rightAns = document.querySelector(".right-answer");
const time = document.querySelector(".timer");
const timeMin = document.querySelector(".minus");

let cardChosen = [];
let cardChosenId = [];
let cardsWon = [];

cardArray.sort(() => 0.5 - Math.random());

let gameOn = true;
let countdown = 60;

function timer(){
    const btn = document.createElement("div");
    btn.innerHTML = "Play Again?";
    btn.classList.add("btn");
    let timeRun = setInterval(() => {
        if(countdown > 0){
            countdown--;
        }else {
            countdown = 0;
            
            if(!(cardsWon.length === cardArray.length/2)){
                
                rightAns.innerHTML = "You Lose"
                rightAns.appendChild(btn);
                rightAns.classList.add("anim");
                btn.onclick = reloadPage;
            }
            
        }
        if(countdown <= 5){
            time.style.color = "rgb(223, 43, 43)";
            time.style.fontSize = "1.3em"
        }
        
        time.innerHTML = countdown;
        
    }, 1000)
    return timeRun;
}

function makeGrid() {
    for(let i = 0; i < cardArray.length; i++){
        let card = document.createElement("img");
        card.setAttribute("src", "/images/purple.png");
        card.setAttribute("id", i);
        grid.appendChild(card);
        card.addEventListener("click", flipCard);
        
    }
    
}

function removeAnim() {
    rightAns.classList.remove("anim");
    timeMin.classList.remove("anim-2");
}

function reloadPage() {
    location.reload();
}

function checkForMatch(){
    let cards = document.querySelectorAll("img");
    const cardOne = cardChosenId[0];
    const cardTwo = cardChosenId[1];
    const first = document.getElementById(cardOne)
    const second = document.getElementById(cardTwo)
    if(cardChosen[0] === cardChosen[1]){
        cards[cardOne].setAttribute("src", "/images/black.png");
        cards[cardTwo].setAttribute("src", "/images/black.png");
        cardsWon.push(cardChosen);
        score.innerHTML = cardsWon.length;
        
        first.style.pointerEvents = "none";
        second.style.pointerEvents = "none";
        if(cardsWon.length === cardArray.length/2){
            
            const btn = document.createElement("div");
            btn.innerHTML = "Play Again?";
            btn.classList.add("btn");
            rightAns.style.fontSize = "2rem";
            rightAns.innerHTML = "Congratulation! You Won!"
            rightAns.appendChild(btn);
            btn.onclick = reloadPage;
            
            
            
        }
        rightAns.classList.add("anim");
        if(!(cardsWon.length === cardArray.length/2)){
            setTimeout(removeAnim, 1000);
        }
        
    }else {
        cards[cardOne].setAttribute("src", "/images/purple.png");
        cards[cardTwo].setAttribute("src", "/images/purple.png");
        timeMin.classList.add("anim-2");
        setTimeout(removeAnim, 1000);
        countdown -= 5;
    }
    cardChosen = [];
    cardChosenId = [];
    for(let i = 0; i < cardArray.length; i++){
        if(cards[i].getAttribute("src") === "/images/black.png"){
            cards[i].style.pointerEvents = "none";

        }else {
            cards[i].style.pointerEvents = "auto";
        }
        
    }
}

function flipCard(){
    let cardId = this.getAttribute("id");
    if(gameOn){
        timer()
    }
    gameOn = false
    this.style.pointerEvents = "none";
    this.setAttribute("src", cardArray[cardId]);
    cardChosen.push(cardArray[cardId].name);
    cardChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if(cardChosenId.length === 2){
        let cards = document.querySelectorAll("img");
        for(let i = 0; i < cardArray.length; i++){     
            cards[i].style.pointerEvents = "none";
        }
        setTimeout(checkForMatch, 500);
    }
    return gameOn;
    
}


makeGrid();






