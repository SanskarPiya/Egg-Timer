let timerbtn = document.querySelector(".softBoilTimer");
let egg = document.querySelector(".loadingEgg");
let beep = document.querySelector(".beep-sound");
let timer = document.querySelector(".timer");
let timerModal = document.querySelector(".timerComplete");
let dismissbtn = document.querySelector(".dismiss-btn");
let rightarr = document.querySelector(".right-arr");
let leftarr = document.querySelector(".left-arr");
let facts = document.querySelector(".fact-description");

const TIME = {
  softboil: 180,
  mediumboil: 300,
  hardboil: 420,
};

const chickenFacts = [
  "Chickens can remember over 100 different faces (humans & animals). So don’t try to cut in line at the feeder—they’ll peckognize you.",
  "Chickens don’t fear death. They see it as just another egg-sistential crisis.",
  "Chickens are the closest living relatives to the Tyrannosaurus rex. So technically, when you eat nuggets, you’re eating dino bites.",
  "A chicken’s heart beats about 275 times per minute. No wonder they’re so egg-cited all the time.",
  "Chickens can dream during REM sleep, just like humans. Probably dreaming of crossing the road without being asked why.",
  "The world’s oldest chicken lived to be 16 years old. That bird was basically a hen-ior citizen.",
  "Hens communicate with their chicks before they hatch by clucking at the eggs. That’s some real egg-cellent parenting.",
  "Chickens have full-color vision, even better than humans. Which is why they never wear fowl fashion.",
  "A chicken can run up to 9 miles per hour. So if one’s chasing you… don’t wing it.",
  "Chickens can feel empathy for each other. If one chicken is sad, the others are like, “Don’t be egg-stra about it.”",
  "The largest recorded chicken egg was nearly 12 ounces. Omelette you finish, but that’s one egg-ceptional egg.",
  "Roosters can’t crow in complete darkness. So technically, they’re just alarm clucks.",
  "Chickens can taste saltiness but not sweetness. Which explains why no chicken has ever stolen your chocolate cake.",
  "There are more chickens in the world than people. Which means if they rise up… we’re all cluckered.",
  "Hens lay fewer eggs in winter due to shorter daylight hours. Even chickens take a snow day.",
  "Chickens clean themselves by taking dust baths. Spa day, but make it dirt cheap.",
  "A group of chickens is called a flock. But when they text each other, it’s called cluck-tok.",
  "Chickens can live without a head for a short time (like Mike the Headless Chicken, who lived 18 months!). That bird really knew how to wing it.",
  "A rooster’s crow can be as loud as 90 decibels (like a dog’s bark). Basically, they’re feathered alarm clocks.",
  "Chickens have three eyelids for each eye. So when they roll their eyes, it’s in 3D.",
  "Chickens were domesticated over 8,000 years ago. They’ve been clucking up human history ever since.",
];

let i = 0;
//Changing facts from display
rightarr.addEventListener("click", () => {
  i++;
  if (i >= chickenFacts.length) {
    i = chickenFacts.length - 1;
  }
  if (chickenFacts[i]) {
    facts.innerText = chickenFacts[i];
  }
});

leftarr.addEventListener("click", () => {
  i--;
  if (i <= 0) {
    i = 0;
  }
  if (chickenFacts[i]) {
    facts.innerText = chickenFacts[i];
  }
});

//Soft boil Timer
timerbtn.addEventListener("click", () => {
  timer.classList.remove("hide");
  timerbtn.classList.add("hide");

  const id = timerbtn.getAttribute("id");
  if (id === "softboil") {
    activateTime(TIME[id]); //time in seconds
  } else if (id === "mediumboil") {
    activateTime(TIME[id]);
  } else if (id === "hardboil") {
    activateTime(TIME[id]);
  } else {
    console.log("something is wrong");
  }
});

//Beep Function
const beepFunction = () => {
  beep.autoplay = true;
  beep.loop = true;
  beep.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
};

const rotateEgg = (timeleft) => {
  egg.style.animation = `rotateEgg ${timeleft}s linear 0s infinite normal`;
};

const activateTime = (timeleft) => {
  //timeleft -> Total time left in seconds
  rotateEgg(timeleft);

  let minute = Math.floor(timeleft / 60);
  let seconds = timeleft % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  timer.innerText = `${minute}:${seconds}`;

  let counterFunction = setInterval(() => {
    timeleft--;
    let minute = Math.floor(timeleft / 60);
    let seconds = timeleft % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    timer.innerText = `${minute}:${seconds}`;

    if (timeleft <= 0) {
      clearInterval(counterFunction); //-> Stops the timer function from continuing
      egg.style.animation = "none"; //-> Stops the rotating egg animation after time finishes
      timerModal.style.opacity = 1;
      beepFunction(); //-> Beeps after time finishes
    }
  }, 1000);
};

dismissbtn.addEventListener("click", () => {
  beep.currentTime = 0;
  beep.pause(); //-> Stopping Audio

  timer.classList.add("hide"); //-> Removing countdown
  timerbtn.classList.remove("hide"); //-> Adding Start Timer Button
  timerModal.style.opacity = 0; // -> Removing timerModal
});
