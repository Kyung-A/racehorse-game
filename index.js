const startBtn = document.querySelector(".start-btn");
const startDialog = document.getElementById("start-dialog");
const dialogClose = document.getElementById("dialog-close");
const dialogComplete = document.getElementById("dialog-complete");

const rankingDialog = document.getElementById("ranking-dialog");
const rankingDialogComplete = document.getElementById(
  "ranking-dialog-complete"
);

const horsesSelect = document.querySelector(".horses-select");

let myHorse;
let rankingList = [];
let leavingOutList = [];

startBtn.addEventListener("click", () => {
  startDialog.showModal();
});

dialogClose.addEventListener("click", () => {
  startDialog.close();
});

dialogComplete.addEventListener("click", () => {
  startDialog.close();
  countdown();
});

rankingDialogComplete.addEventListener("click", () => {
  gameReset();
});

function countdown() {
  const count = document.getElementById("count");
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
  let keyframes = [
    [{ marginLeft: "0px" }, { marginLeft: "90%" }],
    [
      { marginLeft: "0px" },
      { marginLeft: "100px", offset: 0.5 },
      { marginLeft: "90%" },
    ],
    [
      { marginLeft: "0px" },
      { marginLeft: "70%", offset: 0.8 },
      { marginLeft: "90%" },
    ],
    [{ marginLeft: "0px" }, { marginLeft: "300px" }],
    [
      { marginLeft: "0px" },
      { marginLeft: "70%", offset: 0.3 },
      { marginLeft: "80%", offset: 0.8 },
      { marginLeft: "90%" },
    ],
    [
      { marginLeft: "0px" },
      { marginLeft: "100px", offset: 0.3 },
      { marginLeft: "150px", offset: 0.4 },
      { marginLeft: "70%", offset: 0.8 },
      { marginLeft: "90%" },
    ],
    [{ marginLeft: "0px" }, { marginLeft: "0px" }],
    [{ marginLeft: "0px" }, { marginLeft: "150%" }],
  ];
  const timingFuntion = [
    "ease",
    "linear",
    "ease-in",
    "ease-out",
    "ease-in-out",
  ];

  const horses = document.querySelectorAll(".horses-wrapper .horse");
  startBtn.setAttribute("disabled", true);
  startBtn.classList.add("disabled-btn");

  setTimeout(() => {
    horses.forEach((el, i) => {
      const img = el.children[0].children[0];
      img.src = `./assets/horse-run${i + 1}.png`;
    });
  }, 4000);

  horses.forEach((el, i) => {
    const randomDuration = Math.floor(Math.random() * 10000) + 9000;
    // const randomDuration = Math.floor(Math.random() * 500) + 100;
    const randomNum1 = Math.floor(Math.random() * 5);
    const randomNum2 = Math.floor(Math.random() * 8);

    let option = {
      duration: null,
      timingFuntion: null,
      fill: "forwards",
      delay: 4000,
    };

    option.duration = randomDuration;
    option.timingFuntion = timingFuntion[randomNum1];

    el.animate(keyframes[randomNum2], option).onfinish = function (e) {
      if (randomNum2 === 3 || randomNum2 === 6 || randomNum2 === 7) {
        addSpeechEl(e);
        leavingOutList.push(e);
      } else {
        ranking(e);
      }
      const img = e.currentTarget.effect.target.children[0].children[0];
      const imgName = e.currentTarget.effect.target.ariaLabel;
      img.src = `./assets/${imgName}.png`;
    };
  });
}

function addSpeechEl(el) {
  const element = el.currentTarget.effect.target;
  const textWrap = document.createElement("div");
  textWrap.classList.add("nope-run");
  textWrap.innerText = "안갈래";

  element.appendChild(textWrap);
}

horsesSelect.addEventListener("click", (e) => {
  const target = e.target.parentNode.className;
  e.target.parentNode.lastElementChild.style.opacity = "1";
  myHorse = e.target.parentNode;

  const elArr = Array.prototype.filter.call(
    e.currentTarget.children,
    (el) => el.className !== target
  );

  elArr.forEach((v) => {
    hideName(v);
  });
});

function hideName(el) {
  el.lastElementChild.style.opacity = "0";
}

function ranking(el) {
  rankingList.push(el);

  if ([...rankingList, ...leavingOutList].length === 4) {
    addRankingEl(rankingList, leavingOutList);
    rankingDialog.showModal();
  }
}

function addRankingEl(rankingList, leavingOutList) {
  const list = document.getElementById("ranking-list");
  const title = document.querySelector("#ranking-dialog header h2");

  rankingList.forEach((v, i) => {
    const wrap = document.createElement("li");

    wrap.innerHTML = `<div class="horse" aria-label="${
      v.currentTarget.effect.target.ariaLabel
    }" aria-placeholder="${v.currentTarget.effect.target.ariaPlaceholder}">
      <span>${i + 1}</span>
      <span class="horse-name">${
        v.currentTarget.effect.target.ariaPlaceholder
      }</span>
      <div>
        <img src="./assets/${
          v.currentTarget.effect.target.ariaLabel
        }.png" alt="${v.currentTarget.effect.target.ariaPlaceholder}" />
      </div>
    </div>`;

    if (i === 0) {
      if (myHorse.ariaLabel === v.currentTarget.effect.target.ariaLabel) {
        title.innerText = "축하드립니다. 1등입니다!";
      } else {
        title.innerText = "아쉽게도 졌습니다.";
      }
    }

    list.appendChild(wrap);
  });

  leavingOutList.forEach((v) => {
    const wrap = document.createElement("li");

    wrap.innerHTML = `<div class="horse" aria-label="${v.currentTarget.effect.target.ariaLabel}" aria-placeholder="${v.currentTarget.effect.target.ariaPlaceholder}">
      <span style="font-size: 16px; color: #d01b00;">탈락</span>
      <span class="horse-name">${v.currentTarget.effect.target.ariaPlaceholder}</span>
      <div>
        <img src="./assets/${v.currentTarget.effect.target.ariaLabel}.png" alt="${v.currentTarget.effect.target.ariaPlaceholder}" />
      </div>
    </div>`;

    list.appendChild(wrap);
  });
}

function gameReset() {
  rankingDialog.close();
  startBtn.removeAttribute("disabled");
  startBtn.classList.remove("disabled-btn");

  const list = document.getElementById("ranking-list");
  const title = document.querySelector("#ranking-dialog header h2");
  const count = document.getElementById("count");
  const nopeRun = document.querySelectorAll(".nope-run");

  list.replaceChildren();
  title.innerText = "";
  count.innerText = "";

  nopeRun.forEach((el) => el.remove());
  [...rankingList, ...leavingOutList].forEach((v) => {
    v.currentTarget.effect.target
      .getAnimations()
      .forEach((anim) => anim.cancel());
  });

  rankingList = [];
  leavingOutList = [];
}
