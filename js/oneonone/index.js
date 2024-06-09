const pcHorse = document.getElementById("pc-horse");
const myHorse = document.getElementById("my-horse");

const startBtn = document.querySelector(".start-btn");
const dialog = document.getElementById("result-dialog");
const title = document.querySelector("#result-dialog .pixel header h2");
const completeBtn = document.getElementById("dialog-complete");
const count = document.getElementById("count");

const myImg = myHorse.children[0].children[0];
const pcImg = pcHorse.children[0].children[0];
let px = 0;

startBtn.addEventListener("click", () => {
  countdown();
});

function countdown() {
  count.style.display = "flex";

  for (let i = 3; i >= 0; i--) {
    (function (x) {
      setTimeout(function () {
        count.innerText = x;
        if (x === 0) {
          count.style.display = "none";
        }
      }, 1000 * (4 - x));
    })(i);
  }
  gameStart();
}

function gameStart() {
  startBtn.setAttribute("disabled", true);
  startBtn.classList.add("disabled-btn");

  setTimeout(() => {
    pcImg.src = "./assets/horse-run1.png";
    myImg.src = "./assets/horse-run2.png";
    window.addEventListener("keydown", handleKeyDown);
  }, 4000);

  const keyframes = [{ marginLeft: "0px" }, { marginLeft: "90%" }];
  let option = {
    duration: 15000,
    timingFuntion: "ease",
    fill: "forwards",
    delay: 4000,
  };

  pcHorse.animate(keyframes, option).onfinish = function (e) {
    const img = e.currentTarget.effect.target.children[0].children[0];
    img.src = "./assets/horse1.png";
    result(px);
  };
}

function handleKeyDown(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    if (px < 90) {
      myHorse.style.marginLeft = `${(px += 0.5)}%`;
    }
    if (px >= 90) {
      result(px);
    }
  }
}

function result(px) {
  if (px >= 90) {
    pcHorse.getAnimations().forEach((anim) => anim.pause());
    pcImg.src = "./assets/horse1.png";
    myImg.src = "./assets/horse2.png";
    title.innerText = "우승 하셨습니다!";
    dialog.showModal();
  }
  if (px < 90) {
    myImg.src = "./assets/horse2.png";
    title.innerText = "아쉽게도 졌습니다.";
    dialog.showModal();
  }

  window.removeEventListener("keydown", handleKeyDown);
}

completeBtn.addEventListener("click", () => {
  dialog.close();

  startBtn.removeAttribute("disabled");
  startBtn.classList.remove("disabled-btn");
  count.innerText = "";

  pcHorse.getAnimations().forEach((anim) => anim.cancel());
  px = 0;
  myHorse.style.marginLeft = "0%";
});
