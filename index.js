'use strict';

let CaptchaValues = [
	{ question: 'un plus trois', codes: [49,187,51], answer:'quatre'},
	{ question: 'six divisé par deux', codes: [54,191,50], answer:'trois'},
	{ question: 'quatre multiplié par cinq', codes: [52,220,53], answer:'vingt'},
];

let questionDiv = document.querySelector('#question');
let resultDiv = document.querySelector('#result');
let answerDiv = document.querySelector('#answer');
let textResult = document.querySelector('#txtResult');

let nbAvailableQuestion = CaptchaValues.length;
let pickedQuestion = null;
let isHuman = false;
let pressedKeys = [];
let resultInLetters = [];

function choseQuestion() {
	const index = Math.floor(Math.random()*3);
	pickedQuestion = CaptchaValues[index];
	const text = `Veuillez saisir sur le clavier <strong>${pickedQuestion.question}</strong> (échap pour recommencer votre saisie)`;
	display(text, questionDiv);
}

function display(what, where) {
	where.innerHTML = what;
}

window.addEventListener('keydown', handleKeyboardEvent);
textResult.addEventListener('keydown', checkTextResult);


function handleKeyboardEvent(evt) {
	console.log(evt.keyCode);
	// if user press escape, allow him to restart trying to enter the right code
	if (evt.keyCode === 27) {
		console.log("saisie annulée");
		return;
	}

	// authorize to refresh or open console nav

	if (evt.keyCode === 116 || evt.keyCode === 123) {
		return;
	}

	if (evt.keyCode !== 16) {
	pressedKeys.push(evt.keyCode);
	}

	if (pressedKeys.length === 3) {
		console.log("3 saisies");
		isHuman = true;
		computeResult();
	}
}

function computeResult() {
	const isGoodpressedKeys = compareArrays(pressedKeys, pickedQuestion.codes);
	if (isHuman && !isGoodpressedKeys) {
		display('Vous êtes humain mais avez fait une erreur dans la saisie', resultDiv);
	} else if(isHuman && isGoodpressedKeys){
		display('Merci votre saisie est correcte. Veuillez indiquer votre résultat ci-dessous et appuyer sur Entrée', resultDiv);
	}
}

function compareArrays(a, b) {
	for (let i= 0; i<a.length; i++) {
		if(a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

function checkTextResult(evt) {
	if(evt.keyCode >= 65 && evt.keyCode <= 90) {
		resultInLetters.push(evt.key);
	} else if(evt.keyCode === 8) {
		resultInLetters.pop();
		console.log(resultInLetters);
	} else if(evt.keyCode === 13) {
		if(resultInLetters.join('') === pickedQuestion.answer) {
			display('Validation réussie :)',resultDiv);
		} else {
		display('Validation fausse', resultDiv);
		}
	} 
}

choseQuestion();
