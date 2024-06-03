import { myHorse } from "./myHorse.js";

export function addSpeechEl(el) {
  const element = el.currentTarget.effect.target;
  const textWrap = document.createElement("div");
  textWrap.classList.add("nope-run");
  textWrap.innerText = "안갈래";

  element.appendChild(textWrap);
}

export function addRankingEl(rankingList, leavingOutList) {
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
