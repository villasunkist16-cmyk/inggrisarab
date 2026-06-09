let questions = [];
let currentQuestion = 0;
let score = 0;

/* ========================= */
/* ELEMENT */
/* ========================= */

const questionEl =
document.getElementById("question");

const optionsEl =
document.getElementById("options");

const scoreEl =
document.getElementById("score");

const questionNumberEl =
document.getElementById("question-number");

const actionBtn =
document.getElementById("actionBtn");

const actionBtnImg =
document.getElementById("actionBtnImg");

function setButtonImage(imageName){

    actionBtnImg.src = imageName;

}

const startBtn =
document.getElementById("startBtn");

const startScreen =
document.getElementById("startScreen");

const gameScreen =
document.getElementById("gameScreen");

const bgMusic =
document.getElementById("bgMusic");

const openingMusic =
document.getElementById("openingMusic");
let currentAudio = null;

function playAudio(src, callback = null){

    if(currentAudio){

        currentAudio.pause();
        currentAudio.currentTime = 0;

    }

    currentAudio = new Audio(src);

    currentAudio.onended = () => {

        if(callback){

            callback();

        }

    };

    currentAudio.play();

}

window.addEventListener("load", () => {

   setTimeout(() => {

    actionBtn.style.display = "block";

    setButtonImage("next.png");

    actionBtn.onclick = () => {

        nextQuestion();

    };

}, 3000);
});

/* ========================= */
/* START */
/* ========================= */

startBtn.addEventListener("click", async () => {

    try {

        openingMusic.pause();
        openingMusic.currentTime = 0;

        bgMusic.volume = 0.15;
        bgMusic.play();

    } catch (e) {}

    startScreen.style.display = "none";

    gameScreen.style.display = "block";

    await loadQuestions();

});

/* ========================= */
/* LOAD QUESTIONS */
/* ========================= */

async function loadQuestions() {

    const response =
    await fetch("questions.json");

    questions =
    await response.json();

    currentQuestion = 0;
    score = 0;

    scoreEl.textContent = score;

    showQuestion();
    setButtonImage("ulangi-soal.png");
}

/* ========================= */
/* SHOW QUESTION */
/* ========================= */

function showQuestion() {

    const q =
    questions[currentQuestion];

    questionNumberEl.textContent =
    `Soal ${currentQuestion + 1} dari ${questions.length}`;

    questionEl.textContent =
    q.question;
    if(q.image){

    questionImage.src =
    q.image;

    questionImage.style.display =
    "block";

}else{

    questionImage.style.display =
    "none";

}

    optionsEl.innerHTML = "";

    const letters =
    ["A","B","C"];

    q.options.forEach((option,index)=>{

        const button =
        document.createElement("button");

        button.classList.add("option-btn");

        button.textContent =
        `${letters[index]}. ${option}`;

        button.onclick = () =>
        checkAnswer(option, button);

        optionsEl.appendChild(button);

    });

    actionBtn.style.display = "block";

    setButtonImage("ulangi-soal.png");

actionBtn.onclick = () => {

    let audioSoal;

    if(q.questionAudio){

        audioSoal = q.questionAudio;

    }else{

        const nomor =
        String(currentQuestion + 1)
        .padStart(3,"0");

        audioSoal =
        `audio/soal/${nomor}.mp3`;

    }

    playAudio(audioSoal);

};
    setTimeout(() => {

    let audioSoal;

    if(q.questionAudio){

        audioSoal = q.questionAudio;

    }else{

        const nomor =
        String(currentQuestion + 1)
        .padStart(3,"0");

        audioSoal =
        `audio/soal/${nomor}.mp3`;

    }

    playAudio(audioSoal);

}, 700);
}

/* ========================= */
/* CHECK ANSWER */
/* ========================= */

function checkAnswer(selectedAnswer, button) {

    const q =
    questions[currentQuestion];

    let answerAudio;

if(answerAudio){

    answerAudio =
    answerAudio;

}else{

    const nomor =
    String(currentQuestion + 1)
    .padStart(3,"0");

    answerAudio =
    `audio/jawaban/${nomor}.mp3`;

}

    const buttons =
    document.querySelectorAll(".option-btn");

    actionBtn.style.display = "none";


    buttons.forEach(btn => {

        btn.disabled = true;

    });

    if(selectedAnswer === q.answer){

        button.classList.add("correct");

        score += 500;

        scoreEl.textContent = score;

        playAudio(
            "audio/sistem/benar.mp3",
            () => {

                playAudio(
                    answerAudio,
                    () => {
                        actionBtn.style.display = "block";

                        setButtonImage("next.png");

                        actionBtn.onclick =
                        nextQuestion;

                    }
                );

            }
        );

    }else{

        button.classList.add("wrong");

        buttons.forEach(btn => {

            if(
                btn.textContent.includes(q.answer)
            ){
                btn.classList.add("correct");
            }

        });

        playAudio(
            "audio/sistem/salah.mp3",
            () => {

                playAudio(
                    answerAudio,
                    () => {

                        actionBtn.style.display = "block";

                        setButtonImage("next.png");

                        actionBtn.onclick =
                        nextQuestion;

                    }
                );

            }
        );

    }

}

/* ========================= */
/* NEXT QUESTION */
/* ========================= */

function nextQuestion() {

    if(currentAudio){

    currentAudio.pause();
    currentAudio.currentTime = 0;

}
    actionBtn.style.display = "none";

    currentQuestion++;

    if(currentQuestion < questions.length){

        showQuestion();

    }else{

        gameFinished();

    }

}

/* ========================= */
/* GAME FINISHED */
/* ========================= */

function gameFinished() {

    questionNumberEl.textContent =
    "🎉 Permainan Selesai";

    questionEl.innerHTML =
    `Selamat!<br><br>Skor Kamu: ${score}`;

    optionsEl.innerHTML = "";

    setButtonImage("main-lagi.png");

    actionBtn.onclick =
    restartGame;

    const scoreAudio =
    new Audio(`audio/score/${score}.mp3`);

    scoreAudio.play();

}

/* ========================= */
/* RESTART */
/* ========================= */

function restartGame() {

    
    bgMusic.pause();

    bgMusic.currentTime = 0;

    openingMusic.currentTime = 0;

    openingMusic.play();

    gameScreen.style.display =
    "none";

    startScreen.style.display =
    "flex";

}
