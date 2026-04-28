const quests = {
  easy: [
    "5 Liegestütze",
    "Spring 5x auf der Stelle",
    "Klatsche 10x in die Hände"
  ],
  medium: [
    "Sag das Alphabet rückwärts",
    "Balanciere 15 Sekunden auf einem Bein",
    "Dreh dich 10x im Kreis"
  ],
  hard: [
    "Halte 30 Sekunden Plank",
    "Mach 15 Squats schnell",
    "Spring 20x ohne Pause"
  ]
};

let coins = 0;
let time = 30;
let interval;
let currentDifficulty = "";

function getRandomQuest(type) {
  const list = quests[type];
  return list[Math.floor(Math.random() * list.length)];
}

function startGame(type) {
  clearInterval(interval);

  currentDifficulty = type;
  const quest = getRandomQuest(type);

  document.getElementById("quest").innerText =
    type.toUpperCase() + ": " + quest;

  time = 30;

  interval = setInterval(() => {
    time--;

    document.getElementById("timerText").innerText =
      time + " Sekunden";

    document.getElementById("timerBar").style.width =
      (time / 30 * 100) + "%";

    if (time <= 0) {
      clearInterval(interval);
      document.getElementById("timerText").innerText =
        "⏰ Zeit vorbei!";
    }
  }, 1000);
}

function vote(up) {
  if (!currentDifficulty) return;

  let reward = 0;

  if (currentDifficulty === "easy") reward = 1;
  if (currentDifficulty === "medium") reward = 2;
  if (currentDifficulty === "hard") reward = 3;

  if (up) {
    coins += reward;
  } else {
    coins -= 1;
  }

  document.getElementById("coins").innerText =
    "Coins: " + coins;

  currentDifficulty = "";
}
