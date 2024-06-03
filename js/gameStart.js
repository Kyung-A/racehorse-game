import { startBtn, keyframes, timingFuntion } from "./variable.js";
import { addSpeechEl } from "./addElement.js";
import ranking from "./ranking.js";
import { leavingOutList } from "./leavingOutList.js";

export default function gameStart() {
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
