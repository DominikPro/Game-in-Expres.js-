const goodAnswersSpan = document.querySelector('#good-answers');
const gameBoarde = document.querySelector('#game-board');
const h2 = document.querySelector('h2')


function handleAnswerFeedBack(data) {
    goodAnswersSpan.innerText = data.goodAnswers;
    console.log(data.goodAnswers)
    showNextQestion();
}

function filQestionElements(data) {
    if (data.winner === true) {
        gameBoarde.style.display = "none"
        h2.innerText = "Wygrałeś!"
        return
    }
    if (data.loser === true) {
        gameBoarde.style.display = "none"
        h2.innerText = "Niestetym nie poszło Ci najelpeiej spórbuj ponownie!"
        return
    }
    question.innerText = data.question;
    for (const i in data.answers) {
        const ansewrEl = document.querySelector(`#answer${Number(i)}`)
        ansewrEl.innerText = data.answers[i]
        goodAnswersSpan.innerText = data.goodAnswers;
    };
};

function showNextQestion() {
    fetch("/question", {
        method: 'GET',
    }).then(r => r.json())
        .then(data => {
            filQestionElements(data)
        })
}

showNextQestion();


function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    }).then(r => r.json())
        .then(data => {
            handleAnswerFeedBack(data)
        })
};

const buttons = document.querySelectorAll('.answer-btn');
for (const button of buttons) {
    button.addEventListener('click', (event) => {

        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);

    })
};

const tipDiv = document.querySelector('#tip')

function handleFriendsAnswer(data) {
    tipDiv.innerText = data.text;
    console.log(data.text)
}

function callToAFriend() {
    fetch(`/help/friend`, {
        method: 'GET',
    }).then(r => r.json())
        .then(data => {
            handleFriendsAnswer(data)
            // console.log(data.text)
        })
};
document.querySelector('#callToAFriend').addEventListener('click', callToAFriend)


function handleHalfOnHalf(data) {
    if (typeof data.text === "string") {
        tipDiv.innerText = data.text;
    } else {
        for (const button of buttons) {
            if (data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = ""
            }
        }
    }
}

function halfOnHalf() {
    fetch(`/help/halfOnHalf`, {
        method: 'GET',
    }).then(r => r.json())
        .then(data => {
            handleHalfOnHalf(data)
            // console.log(data.text)
        })
};
document.querySelector('#halfOnHalf').addEventListener('click', halfOnHalf)



function handleCrowdAnswer(data) {
    console.log(data)
    if (typeof data.text === "string") {
        tipDiv.innerText = data.text;
    } else {
        data.chart.forEach((percent, index) => {
            buttons[index].innerText = `${buttons[index].innerText}:  ${percent}% `
        });
    }
}

function questionToTheCrowd() {
    fetch(`/help/crowd`, {
        method: 'GET',
    }).then(r => r.json())
        .then(data => {
            handleCrowdAnswer(data)
            // console.log(data.text)
        })
};
document.querySelector('#questionToTheCrowd').addEventListener('click', questionToTheCrowd)
