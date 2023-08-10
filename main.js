import './style.css';

const rings = document.querySelectorAll('.ring');
const pegs = document.querySelectorAll('.tower');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const moveSound = document.getElementById('move-sound');
const endSound = document.getElementById('end-sound');
const restartSound = document.getElementById('restart-sound')
const startSound = document.getElementById('start-sound')

function playSound(sound, vol=0.2) {
  sound.volume = vol;
  sound.play();
}

function movePeg(source, target) {
  const ringToMove = source.firstElementChild;
  if (ringToMove) {
    // console.log('Moving ring:', ringToMove)
    ringToMove.classList.add('fade-in');
    playSound(moveSound);
    if (target.firstElementChild) {
      // If target has children, insert before the first child
      target.insertBefore(ringToMove, target.firstChild);
    } else {
      // If target is empty, simply append the ring
      target.appendChild(ringToMove);
    }
  } else {
    console.warn('There is no ring to move');
  }
}

function animateTowerMovement(sourcePeg, targetPeg, auxilaryPeg, numberofRings) {
  function moveSingleRing(source, target) {
    return new Promise((resolve) => {
      setTimeout(() => {
        movePeg(source, target);
        resolve();
      }, 600);
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

  return moveRecursive(sourcePeg, targetPeg, auxilaryPeg, numberofRings); // Return the promise
}




async function moveRingsWithDelay(towerFrom, towerTo, delay) {
  while (towerFrom.firstChild) {
    towerTo.appendChild(towerFrom.firstChild);
    playSound(restartSound, 0.8)
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}


async function restartTheGame(rings) {


  const towerA = document.querySelector('.tower.A');
  // const towerB = document.querySelector('.tower.B');
  const towerC = document.querySelector('.tower.C');


  await moveRingsWithDelay(towerC, towerA, 100);


  // // Move all rings back to tower A
  // while (towerB.firstChild) {
  //   towerA.appendChild(towerB.firstChild);
  // }
  // while (towerC.firstChild) {
  //   towerA.appendChild(towerC.firstChild);
  // }

  // Reset the button states
  startButton.disabled = false;
  restartButton.classList.remove('active');

  // Enable the startButton button
  isAppRunning = false;
  startButton.disabled = false;
  startButton.classList.add('active');

}

let isAppRunning = false;

function startGame() {
  if (!isAppRunning) {
    playSound(startSound)
    console.log('The Towers are being moved...');
    isAppRunning = true;
    startButton.disabled = true;
    restartButton.disabled = true;
    startButton.classList.remove('active');
    const numberOfRings = rings.length;

    animateTowerMovement(pegs[0], pegs[2], pegs[1], numberOfRings).then(() => {
      console.log('The towers have been moved. You can start again...');
      playSound(endSound);

      isAppRunning = false;

      restartButton.disabled = false;
      restartButton.classList.add('active');
    });
  }
}

startButton.addEventListener('click', startGame);

restartButton.addEventListener('click', () => {
  restartTheGame(rings);
});
