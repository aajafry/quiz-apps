//  dummy JSON dataset.
const questions = [
    {
        question: "Which is the correct answer of 2 / 0 ?",
        answers: [
            { text: "Undefined", correct: false},
            { text: "0", correct: false},
            { text: "Error", correct: false},
            { text: "Infinity", correct: true},
        ]
    },
    {
        question: "Which is the correct answer of 0 / 0 ?",
        answers: [
            { text: "Undefined", correct: false},
            { text: "Error", correct: true},
            { text: "0", correct: false},
            { text: "Infinity", correct: true},
        ]
    },
    {
        question: "How many vertices a cube has?",
        answers: [
            { text: "9", correct: false},
            { text: "12", correct: false},
            { text: "8", correct: true},
            { text: "6", correct: false},
        ]
    },
]

// DOM Selection. 
let question = document.querySelector(".quiz-app_quation");
let answers = document.querySelector(".quiz-app_answers");
let nextBtn = document.querySelector(".nextBtn");

// variable declaretion.
let currentQuestionIndex;
let score;

// quiz initialization.
let StartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next"; // change the buttons' value.
    showQuestion(); // invoke the showQuestion for shown the all question.
}

// shown the Questions.
let showQuestion = () => { 
    resetState();   // invoke the resetState function for reset the pevious values.
    // local variable declaretion.
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    // shown of the quiz question.
    question.innerHTML = questionNo + ". " + currentQuestion.question;
    // shown of the possible answers.
    currentQuestion.answers.map((answer) => {
        const answerBtn = document.createElement("button");
        answerBtn.innerHTML = answer.text;
        answerBtn.classList.add("ansBtn");
        answers.appendChild(answerBtn);
        //  assain the value of button dataset.
        answer.correct ? answerBtn.dataset.correct = answer.correct : "";
        // invoke the click event listener.
        answerBtn.addEventListener("click", selectAnswer);
    })
}

// Reset the HTML elements.
let resetState = () => {
    nextBtn.style.display = "none"; // CSS customization(hide the next button).
    //  remove the default HTML value.
    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    }
}

// choose the answer is Correct or not.
let selectAnswer = (event) => {
    const selectBtn = event.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answers.children).map((button) => {
        button.dataset.correct === "true" ? selectBtn.classList.add("correct") 
                                          : selectBtn.classList.add("incorrect");
        button.disabled = true; // disabled the others button which isn't selected.
    })
    nextBtn.style.display = "block"; // CSS customization(shown the next button).
}

// click even listener of the next button.
nextBtn.addEventListener("click", () => {
    currentQuestionIndex < questions.length ? handleNextButton() : StartQuiz();
})

// handle the next button oparetion.
let handleNextButton = () => {
    currentQuestionIndex++;
    currentQuestionIndex < questions.length ? showQuestion() : showScore();
}

// shown the quiz score.
let showScore = () => {
    resetState(); // reset the DOM.
    // SHOWN THE quiz score and manupulating the DOM.
    question.innerHTML = `Your Score ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
    question.style.textAlign = "center";
}

// invoke the start quiz function.
StartQuiz();