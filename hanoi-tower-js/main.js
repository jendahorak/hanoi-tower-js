import "./style.css";

let rings = document.querySelectorAll(".ring");
let pegs = document.querySelectorAll(".tower");

console.log(rings, pegs);

function getNumberOfPegs(peg) {
  return peg.children.length;
}

function movePeg(source, target) {
  // delete div from source peg
  // add div to the target peg
  const ringToMove = source.firstElementChild;
  //   console.log("Ring to move:", ringToMove);
  if (ringToMove) {
    // console.log("Moving ring:", ringToMove);
    target.appendChild(ringToMove);
  } else {
    console.warn("There is no ring to move");
  }
}

function moveRings(sourcePeg, targetPeg, auxilaryPeg, numberOfDisks) {
  let numOfDisksInPeg = getNumberOfPegs(sourcePeg);
  if (numOfDisksInPeg === 1) {
    // base case - if there is only one peg move it from the source to target
    movePeg(sourcePeg, targetPeg);
  } else {
    // recursive case - if there are more than one disks, folow these steps:
    //   --
    moveRings(sourcePeg, auxilaryPeg, targetPeg, numOfDisksInPeg - 1);
    moveRings(auxilaryPeg, targetPeg, sourcePeg, numOfDisksInPeg - 1);
  }
}

setTimeout(() => {
  moveRings(pegs[0]);
}, 1000);
