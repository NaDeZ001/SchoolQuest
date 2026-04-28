const quests = {
  easy: [
    "Klatsche 10x leise",
    "Tippe 5x schnell auf den Tisch",
    "Flüstere deinen Namen rückwärts"
  ],
  medium: [
    "Balanciere 15 Sekunden auf einem Bein",
    "Tu so als wärst du ein Lehrer für 10 Sek",
    "Schreibe deinen Namen mit der falschen Hand"
  ],
  hard: [
    "Halte 30 Sekunden Plank (unauffällig 😄)",
    "Mach 15 Squats leise",
    "Starre 20 Sekunden ohne zu lachen"
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
    div.className = "card " + type;
    div.innerHTML = `<b>${type.toUpperCase()}</b><br>${quest}`;

    div.onclick = () => selectQuest(type, quest);

    cards.appendChild(div);
  });
}

function selectQuest(type, quest) {
  selected = type;

  document.getElementById("selected").innerText =
    "Deine Quest: " + quest;

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
        "Zeit vorbei! Jetzt voten 👇";

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
