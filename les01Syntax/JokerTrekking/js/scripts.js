/* eslint-disable no-magic-numbers */
const Minimum = 1000;
const Maximum = 9999;
const Spelers = 10000;

let eencijfers = 0;
let tweeCijfers = 0;
let driecijfers = 0;
let viercijfers = 0;
let geencijfers = 0;
let winstverdeling = 0;
const winst = [];
const magic = 2.5;


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
      if (randomcijferArray[i].randomcijfer % 10 === (Trekking % 10)) {
         eencijfers++;
         winst.push(magic);
      }
      if (randomcijferArray[i].randomcijfer % 100 === (Trekking % 100)) {
         tweeCijfers++;
         winst.push(10);
      }
      if (randomcijferArray[i].randomcijfer % 1000 === (Trekking % 1000)) {
         driecijfers++;
         winst.push(100);
         winstverdeling += 100;
      }
      if (randomcijferArray[i].randomcijfer === Trekking) {
         viercijfers++;
         winst.push(500);
      }
      if (randomcijferArray[i].randomcijfer !== Trekking) {
         geencijfers++;
      }
   }
   winstverdeling /= TotaalSpelers;
}

BerekeningRandom(Spelers);

function GemiddeldeWinst() {
   let winstTotaal = 0;
   for (let i = 0; i < winst.length; i++) {
      winstTotaal += winst[i];
   }
   return winstTotaal / Spelers;
}

winstverdeling = GemiddeldeWinst();

// console.log('Array: ', CijferArray); // Hier wordt er de 10 000 randomcijfers getoont
console.log('%c// trekking', 'color: pink; font-size: 18px;');
console.log('%cGetrokken getal:', 'color: yellow;', Trekking);
console.log('%c// gokken', 'color: pink; font-size: 18px;');
console.log('Aantal iteraties:', Spelers);
console.log('%c// resultaten', 'color: pink; font-size: 18px;');

console.log(`0 juist: ${geencijfers}
1 juist: ${eencijfers}
2 juist: ${tweeCijfers}
3 juist: ${driecijfers}
4 juist: ${viercijfers}
`);
console.log(`%cGemiddelde winst: €${winstverdeling.toFixed(3)}`, 'padding: 10px; color: gold; background-color: grey; font-size: 16px;');
