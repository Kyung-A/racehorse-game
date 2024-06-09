import { rankingDialog } from "./variable.js";
import { addRankingEl } from "./addElement.js";
import { rankingList } from "./rankingList.js";
import { leavingOutList } from "./leavingOutList.js";

export default function ranking(el) {
  rankingList.push(el);

  if ([...rankingList, ...leavingOutList].length === 4) {
    addRankingEl(rankingList, leavingOutList);
    rankingDialog.showModal();
  }
}
