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
let keyframes = [{ marginLeft: "0px" }, { marginLeft: "90%" }];
const timingFuntion = ["ease", "linear", "ease-in", "ease-out", "ease-in-out"];

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
  rankingDialog.close();
  startBtn.removeAttribute("disabled");
  startBtn.classList.remove("disabled-btn");

  rankingList.forEach((v) => {
    v.currentTarget.effect.target
      .getAnimations()
      .forEach((anim) => anim.cancel());
  });
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
  const horses = document.querySelectorAll(".horses-wrapper .horse");
  startBtn.setAttribute("disabled", true);
  startBtn.classList.add("disabled-btn");

  horses.forEach((el) => {
    // const randomDuration = Math.floor(Math.random() * 10000) + 9000;
    const randomDuration = Math.floor(Math.random() * 500) + 100;
    const randomTimingFuntion = Math.floor(Math.random() * 5);

    let option = {
      duration: null,
      timingFuntion: null,
      fill: "forwards",
      delay: 4000,
    };

    option.duration = randomDuration;
    option.timingFuntion = timingFuntion[randomTimingFuntion];

    el.animate(keyframes, option).onfinish = function (e) {
      ranking(e);
    };
  });
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

  if (rankingList.length === 4) {
    const list = document.getElementById("ranking-list");
    const title = document.querySelector("#ranking-dialog header h2");

    rankingList.forEach((v, i) => {
      const wrap = document.createElement("li");

      wrap.innerHTML = `<div class="horse" aria-label="${
        v.currentTarget.effect.target.outerText
      }">
        <span>${i + 1}</span>
        <span class="horse-name">${
          v.currentTarget.effect.target.outerText
        }</span>
        <div>
          <img src="./assets/horse.png" alt="${
            v.currentTarget.effect.target.outerText
          }" />
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
    rankingDialog.showModal();
  }
}
