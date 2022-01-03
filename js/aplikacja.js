var kontrahenci = [];

var przykladowyKontrahent = {
    nazwa: 'Osoba Jakaś',
    nrKonta: '12345678901234567890123456',
    osobaFizyczna: true,
    adresMiejscowosc: 'Warszawa',
    adresKod: '01-234',
    adresTypSzczegoly: 'al.',
    adresSzczegoly: 'Wielka 6/3'
};

var odnosnikiMenuNawigacyjnego = document.querySelectorAll('header nav a'),    // każdy <a> w <nav>
    kontenerPodstronGlownychDzialow = document.querySelector('.glowne-dzialy > article'),    
    podstronyGlownychDzialow = document.querySelectorAll('.glowne-dzialy > article > section'),

    odnosnikiEtapowPrzelewow = document.querySelectorAll('#nawigacja-etapow a'),
    kontenerEtapowPrzelewow = document.querySelector('.etapy-przelewow > article'),
    podstronyEtapowPrzelewow = document.querySelectorAll('.etapy-przelewow > article > section'),

    odnosnikiMenuKontrahentow = document.querySelectorAll('#nawigacja-kontrahenci a'),
    kontenerKontrahentow = document.querySelector('.kontrahenci > article'),
    podstronyKontrahentow = document.querySelectorAll('.kontrahenci > article > section');


        /*  ************************************************
                        F   U   N   K   C   J   E           
            ************************************************
        */


function powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera ( listaOdnosnikowPrzewijajacych, kontenerElementowSterowanych, ileElementowSterowanych ) {

    ileElementowSterowanych = ileElementowSterowanych || 1;

    listaOdnosnikowPrzewijajacych.forEach( function( odnosnik, idx ) {    
        console.log( odnosnik );
    
        odnosnik.addEventListener('click', function ( evt ) {
            evt.preventDefault();   // wyłączenie domyślnego zachowania - brak przejścia do elementu docelowego 
    
            var nrOczekiwany = parseInt( evt.target.getAttribute('data-nr') - 1 ) || 0; // odczytanie atrybutu wyzwalacza (-1 dla liczenia od zera), asekuracja zerem
            nrOczekiwany = ( nrOczekiwany === idx ) ? idx : 0;  // werfikacja braku grzebania w strukturze
            console.log( 'element:', evt.target, 'atrybut elementu:', evt.target.getAttribute('data-nr'), 'nrOczekiwany:', nrOczekiwany, 'index:', idx );
    
            var stylLeft = ( idx * ( -1 * 100 / ileElementowSterowanych ) ).toString() + '%'; // odjęcie widoku o skok o widoczny element (co X%), zależnie od ilości elementów
            console.log( idx, stylLeft );
            kontenerElementowSterowanych.style.left = stylLeft;

                // prawdopodobnie lepszy sposób na przewijanie elementów docelowych (działów/etapów/obrazków/...)
            /* var doTranslacji = ( idx * ( 100 / podstronyGlownychDzialow.length) ).toString() + '%';
            console.log( doTranslacji );
            kontenerPodstronGlownychDzialow.style.transform = 'translateX(' + doTranslacji + ')'; */
    
        }, false);
    });
}   // powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera-END


        /*  *****************************************************
                U   R   U   C   H   O   M   I   E   N   I   E           
            *****************************************************
        */


powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera( odnosnikiMenuNawigacyjnego, kontenerPodstronGlownychDzialow, podstronyGlownychDzialow.length );   // reakcja na nawigację DZIAŁÓW WITRYNY 

console.log('kontenerEtapowPrzelewow', kontenerEtapowPrzelewow.length, ': ', kontenerEtapowPrzelewow);
console.log('podstronyEtapowPrzelewow', podstronyEtapowPrzelewow.length, ': ', podstronyEtapowPrzelewow);
console.log('odnosnikiEtapowPrzelewow', odnosnikiEtapowPrzelewow.length, ': ', odnosnikiEtapowPrzelewow);

powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera( odnosnikiEtapowPrzelewow, kontenerEtapowPrzelewow, podstronyEtapowPrzelewow.length );    // reakcja na nawigację ETAPÓW PRZELEWÓW (zagnieżdżona podkategoria)

console.log('kontenerKontrahentow', kontenerKontrahentow.length, ': ', kontenerKontrahentow);
console.log('podstronyKontrahentow', podstronyKontrahentow.length, ': ', podstronyKontrahentow);
console.log('odnosnikiMenuKontrahentow', odnosnikiMenuKontrahentow.length, ': ', odnosnikiMenuKontrahentow);

powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera( odnosnikiMenuKontrahentow, kontenerKontrahentow, podstronyKontrahentow.length );    // reakcja na nawigację poddziału KONTRAHENTÓW (zagnieżdżona podkategoria)