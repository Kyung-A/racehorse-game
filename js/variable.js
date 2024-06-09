export const startBtn = document.querySelector(".start-btn");
export const startDialog = document.getElementById("start-dialog");
export const dialogClose = document.getElementById("dialog-close");
export const dialogComplete = document.getElementById("dialog-complete");
export const rankingDialog = document.getElementById("ranking-dialog");
export const rankingDialogComplete = document.getElementById(
  "ranking-dialog-complete"
);
export const horsesSelect = document.querySelector(".horses-select");

export const keyframes = [
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
  [
    { marginLeft: "0px" },
    { marginLeft: "200px", offset: 0.8 },
    { marginLeft: "300px" },
  ],
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
  [{ marginLeft: "0px" }, { marginLeft: "105%" }],
];

export const timingFuntion = [
  "ease",
  "linear",
  "ease-in",
  "ease-out",
  "ease-in-out",
];
