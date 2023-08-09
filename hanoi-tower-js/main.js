import "./style.css";

let rings = document.querySelectorAll(".ring");
let pegs = document.querySelectorAll(".tower");

// console.log(rings, pegs);

function getNumberOfPegs(peg) {
  return peg.children.length;
}

function movePeg(source, target) {
  const ringToMove = source.firstElementChild;
  if (ringToMove) {
    console.log("Moving ring:", ringToMove);

    if (target.firstElementChild) {
      // If target has children, insert before the first child
      target.insertBefore(ringToMove, target.firstChild);
    } else {
      // If target is empty, simply append the ring
      target.appendChild(ringToMove);
    }
  } else {
    console.warn("There is no ring to move");
  }
}

// function moveRings(sourcePeg, targetPeg, auxilaryPeg) {
//   let numOfDisksInPeg = getNumberOfPegs(sourcePeg);
//   if (numOfDisksInPeg === 1) {
//     // base case - if there is only one peg move it from the source to target
//     movePeg(sourcePeg, targetPeg);
//   } else {


//     movePeg(sourcePeg, targetPeg)
//     movePeg(sourcePeg, auxilaryPeg)
//     movePeg(targetPeg, auxilaryPeg)
//     movePeg(sourcePeg, targetPeg)
//     movePeg(auxilaryPeg, sourcePeg)
//     movePeg(auxilaryPeg, targetPeg)
//     movePeg(sourcePeg, targetPeg)
//     movePeg(sourcePeg, auxilaryPeg)
//     movePeg(targetPeg, auxilaryPeg)
//     movePeg(targetPeg, sourcePeg)
//     movePeg(auxilaryPeg, sourcePeg)
//     movePeg(targetPeg, auxilaryPeg)
//     movePeg(sourcePeg, targetPeg)
//     movePeg(sourcePeg, auxilaryPeg)
//     movePeg(targetPeg, auxilaryPeg)
//   }
// }


// // console.log(rings.length)

// // setTimeout(() => {
// //   moveRings(pegs[0], pegs[2], pegs[1], rings.length);
// // }, 1000);

// setTimeout(() => {
//   moveRings(pegs[0], pegs[2], pegs[1]);
// }, 1000);


// function moveRings(sourcePeg, targetPeg, auxilaryPeg, numberOfDisks) {
//   if (numberOfDisks === 1) {
//     // Base case: Move the top disk from source to target
//     setTimeout(() => {
//       movePeg(sourcePeg, targetPeg);
//     }, 1000); // Introduce a 1-second delay
//   } else {
//         // Recursive case:
//     // Move n-1 disks from source to auxiliary using target as auxiliary
//     moveRings(sourcePeg, auxilaryPeg, targetPeg, numberOfDisks - 1)

//     // Now, move the largest disk from source to target

//     setTimeout(() => {
//       movePeg(sourcePeg, targetPeg);
//     }, 1000); // Introduce a 1-second delay

//     // Finally, move the n-1 disks from auxiliary to target using source as auxiliary
//     moveRings(auxilaryPeg, targetPeg, sourcePeg, numberOfDisks - 1)
//   }
// }

// // Example usage
// setTimeout(() => {
//   const numberOfRings = rings.length;
//   moveRings(pegs[0], pegs[2], pegs[1], numberOfRings);
// }, 1000);


function moveRings(sourcePeg, targetPeg, auxilaryPeg, numberOfDisks) {
  function moveSingleRing(source, target) {
    return new Promise(resolve => {
      setTimeout(() => {
        movePeg(source, target);
        resolve();
      }, 1000);
    });
  }

  async function moveRecursive(source, target, auxiliary, n) {
    if (n === 1) {
      await moveSingleRing(source, target);
    } else {
      await moveRecursive(source, auxiliary, target, n - 1);
      await moveSingleRing(source, target);
      await moveRecursive(auxiliary, target, source, n - 1);
    }
  }

  moveRecursive(sourcePeg, targetPeg, auxilaryPeg, numberOfDisks);
}

// Example usage
setTimeout(() => {
  const numberOfRings = rings.length;
  moveRings(pegs[0], pegs[2], pegs[1], numberOfRings);
}, 1000);


