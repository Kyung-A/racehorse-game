import {
  startBtn,
  startDialog,
  dialogClose,
  dialogComplete,
  rankingDialog,
  rankingDialogComplete,
  horsesSelect,
} from "./variable.js";
import gameStart from "./gameStart.js";
import { setMyHorse } from "./myHorse.js";
import { rankingList, setRankingList } from "./rankingList.js";
import { leavingOutList, setLeavingOutList } from "./leavingOutList.js";

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

horsesSelect.addEventListener("click", (e) => {
  const target = e.target.parentNode.className;
  e.target.parentNode.lastElementChild.style.opacity = "1";
  setMyHorse(e.target.parentNode);

  const elArr = Array.prototype.filter.call(
    e.currentTarget.children,
    (el) => el.className !== target
  );

  elArr.forEach((v) => {
    v.lastElementChild.style.opacity = "0";
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

  setRankingList([]);
  setLeavingOutList([]);
}
