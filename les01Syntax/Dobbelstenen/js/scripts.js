// declarations
// const randomcijfer = Math.random;
const players = ['Magnus', 'Eline', 'Ding', 'Judith', 'Praggna'];
const scores = [];
const NUM_DICE = 3;

// show header
console.log(`
DOBBELSTENEN
============
aantal deelnemers: ${players.length}`);

// throw dice

for (let i = 0; i < players.length; i++) {
   const dice = [];
   for (let j = 0; j < NUM_DICE; j++) {
      dice[j] = Math.ceil(Math.random() * 6);
   }

   scores[i] = getTotal(dice);
   console.log(`${players[i]} gooit ${scores[i]} punten`);
    console.log(`%c${dicetoString(dice)}`, 'font-size:30px');
}

// show winner



// 'background: yellow; color: black'

function dicetoString(dice) {
   let retval = '';
   for (const d of dice) {
      switch (d) {
         case 1: retval += '⚀ '; break;
         case 2: retval += '⚁ '; break;
         case 3: retval += '⚂ '; break;
         case 4: retval += '⚃ '; break;
         case 5: retval += '⚄ '; break;
         case 6: retval += '⚅ '; break;
         default: break;
      }
   }
   return retval;
}

function getTotal(dice) {
   let total = 0;
   for (const d of dice) {
      total += d;
   }
   return total;
}

function getWinner(totals, names) {
   let winnerIndex = 0;
   let draw = false;
   for (let i = 1; i < names.length; i++) {
      if (totals[i] == totals[winnerIndex]) draw = true;
      else if (totals[i] > totals[winnerIndex]) {
         winnerIndex = i;
         draw = false;
      }
   }
   return draw ? 'geen winnaar' : names[winnerIndex];
}

console.log(`
WINNAAR:`);

console.log('%c' + getWinner(scores, players), 'padding: 10px; color: black; background-color: yellow; font-size: 16px; border: 5px double black;');
