console.log('engines starts');

// declarations
// const randomcijfer = Math.random;
const players = ['Magnus', 'Eline', 'Ding', 'Judith', 'Praggna'];
const scores = [players.length];
const NUM_DICE = 3;

// show header
console.log(`
DOBBELSTENEN
============
aantal deelnemers: ${players.length}`);

// throw dice

for (let i = 0; i < players.length; i++) {
   const dice = [NUM_DICE];
   for (let j = 0; j < NUM_DICE.length; j++) {
      dice[j] = Math.random() * 7;
   }

   // getTotal -> getTotalScore

   scores[i] = getTotalScore(dice);
   console.log(`${players[i]} gooit ${scores[i]} punten`);
   console.log(dice.toString(dice));
}

// show winner

console.log('\n WINNAAR: ');
console.log(`\n  ${getWinner(scores, players) }`);

// 'background: yellow; color: black'

function diceToString(dice) {
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

function getTotalScore(dice) {
   let total = 0;
   for (const d of dice) {
      total += d;
   }
   return total;
}

function getWinner(totals, names) {
   let winnerIndex = 0;
   let draw = false;
   for (let i = 1; i < totals.length; i++) {
      if (totals[i] == totals[winnerIndex]) draw = true;
      else if (totals[i] > totals[winnerIndex]) {
         winnerIndex = i;
         draw = false;
      }
   }
   return draw ? 'geen winnaar' : names[winnerIndex];
}
