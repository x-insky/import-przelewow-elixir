var kontrahenci = [];

var przykladowyKontrahent = {
    nazwa: 'Osoba Jakaś-Przykładowa',
    nrKonta: '12345678901234567890123456',
    osobaFizyczna: true,
    miejscowosc: 'Warszawa',
    kod: '01-234',
    adresTypSzczegoly: 'al.',
    adresSzczegoly: 'Wielka 6/3',
    opis: 'dowolny tekst'
};

var elementKontrahenta;

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

function budujElementKontrahenta ( klient ) {

    var kontenerekDiv = document.createElement('div'),
        pElem = document.createElement('p'),
        tekstElem = document.createTextNode( klient.nazwa ),
        daneAdresowe = klient.adresTypSzczegoly + " " + klient.adresSzczegoly + ", " + klient.kod + " " + klient.miejscowosc,
        tekstElementAdresowy = document.createTextNode( daneAdresowe ),
        pElementAdresowy = document.createElement('p'),
        spanElem = document.createElement('span'),
        czyOsobaElem = document.createElement('input'),
        przyciskElem = document.createElement('button');

kontenerekDiv.classList.add('test-klasa-klient');

pElem.appendChild( tekstElem );  // dodanie samego tekstu do elementu z tablicy
pElem.classList.add('test-nazwa-osoby');   // dodanie zdefiniownej klasy dla tekstu - inny wygląd

pElementAdresowy.appendChild( tekstElementAdresowy ); // drugi wiersz
pElementAdresowy.classList.add('test-dane-adresowe');

przyciskElem.textContent = 'Wykonanie dowolnej akcji';  
spanElem.appendChild( przyciskElem );

spanElem.prepend( czyOsobaElem ); // status osoby przed przyciskiem akcji 
czyOsobaElem.setAttribute('type', 'checkbox');      // dodanie atrybutu, jako określenie typu tego przycisku  
    if ( klient.osobaFizyczna ) {
        czyOsobaElem.setAttribute('checked', true);    // warunkowe zaznacznie lub nie (odczyt )
        czyOsobaElem.setAttribute('title', 'osoba fizyczna: TAK');    // ale ten opisowy atrybut jest zawsze dodawany
    }
    else {
        czyOsobaElem.setAttribute('title', 'osoba fizyczna: NIE');    // przeciwna treść atrybutu opisowego
    }
czyOsobaElem.addEventListener('change', function ( evt ) {
    evt.preventDefault();   // nic nie rób
    var stan = evt.target.getAttribute('checked');
    console.log('stan przycisku:', stan);
    if ( stan ) evt.target.setAttribute('checked', true);
    else evt.target.setAttribute('checked', false);
    //return false;
});        // + zdarzenie 'click/change'

pElem.appendChild( spanElem );
kontenerekDiv.appendChild( pElem );  // przypisanie zawartości tekstowej dla nowego obiektu tekstowego w <li>
kontenerekDiv.appendChild( pElementAdresowy); // drugi wiersz z danumi adresowymi

return kontenerekDiv;   // zwróć to. co tutaj zbudowano dla jednej pozycji listy
}


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

elementKontrahenta = budujElementKontrahenta( przykladowyKontrahent );
console.log( elementKontrahenta );

document.getElementById('kontrahent-lista').appendChild( elementKontrahenta );
