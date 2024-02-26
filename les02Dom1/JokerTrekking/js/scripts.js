const Minimum = 1000;
const Maximum = 9999;
const Spelers = 10000;

let eencijfers = 0;
let tweeCijfers = 0;
let driecijfers = 0;
let viercijfers = 0;
let geencijfers = 0;

function RandomCijfer(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
const Trekking = RandomCijfer(Minimum, Maximum); // Trekking cijfer

function BerekeningRandom(TotaalSpelers) {
   const randomcijferArray = [];
   for (let i = 1; i < TotaalSpelers; i++) {
      const randomcijfer = RandomCijfer(Minimum, Maximum);
      randomcijferArray.push({ randomcijfer });
   }
   
   for (let i = 0; i < randomcijferArray.length; i++) {
      if (randomcijferArray[i] % 10 == Trekking % 10) eencijfers++;
      if (randomcijferArray[i] % 100 == Trekking % 100) tweeCijfers++;
      if (randomcijferArray[i] % 1000 == Trekking % 1000) driecijfers++;
      if (randomcijferArray[i] == Trekking) viercijfers++;
      if (randomcijferArray[i] != Trekking) geencijfers++;
   }
}
BerekeningRandom();

// console.log('Array: ', CijferArray); // Hier wordt er de 10 000 randomcijfers getoont
console.log('// trekking');
console.log('Getrokken getal:', Trekking);
console.log('// gokken');
console.log('Aantal iteraties:', Spelers);
console.log('// resultaten');

console.log(`0 juist: ${geencijfers}
1 juist: ${eencijfers}
2 juist: ${tweeCijfers}
3 juist: ${driecijfers}
4 juist: ${viercijfers}
`);
console.log('Gemiddelde winst:');
