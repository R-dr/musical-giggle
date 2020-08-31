const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}


const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 12;
const HEAL_VALUE = 15;
let battleLog = [];

const PLAYER_ATTACK_EVENT = "ATTACK";
const PLAYER_STRONG_ATTACK_EVENT = "STRONG_ATTACK";
const MONSTER_ATTACK_EVENT = "MONSTER_ATTACK";
const PLAYER_HEAL_EVENT = "PLAYER_HEAL";
const GAME_OVER_EVENT = "GAME_OVER";

const enteredValue = prompt(
	"like eminem once said ' you've only got one life, so choose it. ",
	"100"
);

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
	alert("look at you so smart with numbers, your life is a straight 100.");
	chosenMaxLife = 100;
}

let monsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);

function reset() {
	monsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}
let hasBonusLife = true;

function writeToLog(ev, val, monsterHealth, PlayerHealth,target ) {
	let logEntries;
	if (ev === PLAYER_ATTACK_EVENT)
		logEntries = {
			event: ev,
			value: val,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: PlayerHealth,
			"MONSTER": target,
		}; 
	else if (ev === PLAYER_STRONG_ATTACK_EVENT) {
		logEntries = {
			event: ev,
			value: val,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: PlayerHealth,
			"MONSTER":target,
		};
	} else if (ev === MONSTER_ATTACK_EVENT) {
		logEntries = {
			event: ev,
			value: val,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: PlayerHealth,
			"MONSTER":target,
		};
	} else if (ev === PLAYER_HEAL_EVENT) {
		logEntries = {
			event: ev,
			value: val,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: PlayerHealth,
			"PLAYER":target
			};
	} else if (ev = GAME_OVER_EVENT)
	logEntries = {
		event: ev,
		value: val,
		finalMonsterHealth: monsterHealth,
		finalPlayerHealth: PlayerHealth,}

	battleLog.push(logEntries);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;
	writeToLog(
		MONSTER_ATTACK_EVENT,
		playerDamage,
		monsterHealth,
		currentPlayerHealth
	);

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert("oh wow, black lives DO matter. Once.");
	}
	if (monsterHealth <= 0 && currentPlayerHealth > 0) {
		alert(
			"after a hard fight you kill the monster congrats you're a murderer. I BET YOU FEEL GREAT!"
		);
		writeToLog(
			GAME_OVER_EVENT,
			"YOU WIN THIS TIME.....",
			monsterHealth,
			currentPlayerHealth
		);
	} else if (currentPlayerHealth <= 0 && monsterHealth > 0) {
		alert(
			"Ya dead cunt, did you really think it was a good idea to fight a monster?"
		);
		writeToLog(
			MONSTER_ATTACK_EVENT,
			"Itold you it this was a bad idea....",
			monsterHealth,
			currentPlayerHealth
		);
	} else if (currentPlayerHealth <= 0 && monsterHealth <= 0) {
		alert(
			"i dont know how you did it, but somehow you're both dead, what was the point dumbass?"
		);
		writeToLog(
			MONSTER_ATTACK_EVENT,
			"Would you like some tea and crumpets?",
			monsterHealth,
			currentPlayerHealth
		);
	}
	if (currentPlayerHealth <= 0 || monsterHealth <= 0) {
		reset();
	}
}
function attackMonster(mode) {
	let damageDealt;
	let logEvent;

	if (mode === "ATTACK") {
		damageDealt = ATTACK_VALUE;
		logEvent = PLAYER_ATTACK_EVENT;
	} else if (mode === "STRONG_ATTACK") {
		damageDealt = STRONG_ATTACK_VALUE;
		logevent = PLAYER_STRONG_ATTACK_EVENT;
	}
	const damage = dealMonsterDamage(damageDealt);
	monsterHealth -= damage;
	writeToLog(logEvent, damage, monsterHealth, currentPlayerHealth);
	endRound();
}

function attackMove() {
	attackMonster("ATTACK");
}
function strongAttackMove() {
	attackMonster("STRONG_ATTACK");
}
function healPlayer() {
	let healValue;
	if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
		//this basically gives it
		alert("thoughts and prayers for your dumbass trying to over heal"); //
		healValue = chosenMaxLife - currentPlayerHealth; //the logic of only healing
	} else {
		//you to the max hp you set then letting the monster attack
		healValue = HEAL_VALUE;
	}

	increasePlayerHealth(HEAL_VALUE);
	currentPlayerHealth += HEAL_VALUE;
	writeToLog(PLAYER_HEAL_EVENT, healValue, monsterHealth, currentPlayerHealth);
	endRound();
}
function printLogHandler() {
	for( let i=0; i < 3 ; i ++){
		console.log('-------------')

	}
	let i=0
	// for(const logentry of battleLog){

	// 	console.log(logentry)
	// 	console.log(i)
	// 	i++
	// 
for(const logEntry of battleLog){

		console.log(`#${i}`);
		for(const key in logEntry){
			console.log(key);
			console.log(logEntry[key]);
		}
	}
	console.log(battleLog);
} 

attackBtn.addEventListener("click", attackMove);
strongAttackBtn.addEventListener("click", strongAttackMove);
healBtn.addEventListener("click", healPlayer);
logBtn.addEventListener("click", printLogHandler);

