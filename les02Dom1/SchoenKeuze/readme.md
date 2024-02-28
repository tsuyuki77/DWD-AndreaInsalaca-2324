
## C. afbeelding en onderschrift

Dit deel is geïnspireerd op de fotogallerij uit de theorie. Zorg dat je die goed begrijpt. De code is bijna identiek. Het enige wat je nog niet weet is hoe je dat streepje onder de link kan veranderen. Dat wordt pas volgende les uitgelegd. Het komt er op neer dat je met javascript de class naam 'selected' verwijdert van de oude, en toevoegt aan de nieuwe link. De code krijg je gratis: 

```
   ...
   lnk.addEventListener('click', function(e) {
      ...
      document.querySelector('#model .selected').classList.remove('selected');
      lnk.classList.add('selected');
   });
});
```
De rest zou moeten lukken.

## D. eindtekst

Vul nu de juiste eindtekst in onderaan: gekozen model, schoenmaat, een opsomming van de gekozen accessoires en de eindprijs. In welk element vind je de tekst van het gekozen model, waar vind je de schoenmaat? Inspecteer de HTML code! Voor de opsomming van de gekozen accessoires overloop je best alle opties met een lus (bv. een forEach) om de extraprijzen en de namen te verzamelen.
