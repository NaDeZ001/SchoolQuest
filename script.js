const quests = {
  easy: [
    "Tippe 10 Sekunden lang heimlich einen Beat auf den Tisch",
    "Schau jemanden an ohne zu lachen",
    "Flüstere deinen Namen rückwärts"
  ],
  medium: [
    "Tu so als würdest du einschlafen",
    "Schreibe ein Wort mit deiner falschen Hand",
    "Starre 15 Sekunden an die Decke"
  ],
  hard: [
    "Mach 10 Squats so unauffällig wie möglich",
    "Halte 20 Sekunden ein Pokerface egal was passiert",
    "Tu so als würdest du eine unsichtbare Fliege fangen"
  ]
};

let coins = 0;
let selected = null;
let time = 30;
let interval;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateChoices() {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  const types = ["easy", "medium", "hard"];

  types.forEach(type => {
    const quest = random(quests[type]);

    const div = document.createElement("div");
    div.className = "card";
    div.innerText = quest;

    div.onclick = () => selectQuest(div, type);

    cards.appendChild(div);
  });
}

function selectQuest(element, type) {
  if (selected) return;

  selected = type;

  document.querySelectorAll(".card").forEach(card => {
    card.classList.add("locked");
  });

  element.classList.remove("locked");
  element.classList.add("selected");

  startTimer();
}

function startTimer() {
  clearInterval(interval);
  time = 30;

  document.getElementById("up").style.display = "none";
  document.getElementById("down").style.display = "none";

  interval = setInterval(() => {
    time--;

    document.getElementById("timer").innerText =
      time + " Sekunden";

    document.getElementById("bar").style.width =
      (time / 30 * 100) + "%";

    if (time <= 0) {
      clearInterval(interval);
      document.getElementById("timer").innerText =
        "Zeit vorbei – abstimmen!";

      document.getElementById("up").style.display = "inline-block";
      document.getElementById("down").style.display = "inline-block";
    }
  }, 1000);
}

function vote(up) {
  let reward = 0;

  if (selected === "easy") reward = 1;
  if (selected === "medium") reward = 2;
  if (selected === "hard") reward = 3;

  if (up) {
    coins += reward;
  } else {
    coins -= 1;
  }

  document.getElementById("coins").innerText =
    "Coins: " + coins;

  selected = null;
  generateChoices();
}

generateChoices();
