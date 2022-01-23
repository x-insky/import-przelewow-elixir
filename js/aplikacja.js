var kontrahenci = [     // przykładowe dane osób i firm
{
    imie: 'Anna',
    nazwisko: 'Jakaś-Przykładowa',
    nrKonta: '12345678901234567890123456',
    osobaFizyczna: true,
    miejscowosc: 'Warszawa',
    kod: '01-234',
    adresTypSzczegoly: 'al.',
    adresSzczegoly: 'Wielka 6/3',
    opis: 'dowolny tekst'
},{
    imie: 'Bartosz',
    nazwisko: 'Kolejny',
    nrKonta: '56789012345678901234561234',
    osobaFizyczna: true,
    miejscowosc: 'Strzelce Krajeńskie',
    kod: '23-456',
    adresTypSzczegoly: 'ul.',
    adresSzczegoly: 'Spółdzielcza 24E/9',
    opis: 'cokolwiek, co mnie definiuje'
},{
    nazwa: 'Pierwsza Firma',
    formaDzialalnosci: 'z o.o.',
    nrKonta: '67890123456789012345612345',
    osobaFizyczna: false,
    miejscowosc: 'Gorzów Wielkopolski',
    kod: '34-567',
    adresTypSzczegoly: 'ul.',
    adresSzczegoly: 'Lotnicza 58',
    opis: 'niewypłacalne dranie'
}
];

var elementKontrahentow = document.createElement('div');

var odnosnikiMenuNawigacyjnego = document.querySelectorAll('header nav a'),    // każdy <a> w <nav>
    kontenerPodstronGlownychDzialow = document.querySelector('.glowne-dzialy > article'),    
    podstronyGlownychDzialow = document.querySelectorAll('.glowne-dzialy > article > section'),

    odnosnikiEtapowPrzelewow = document.querySelectorAll('#nawigacja-etapow a'),
    kontenerEtapowPrzelewow = document.querySelector('.etapy-przelewow > article'),
    podstronyEtapowPrzelewow = document.querySelectorAll('.etapy-przelewow > article > section'),

    odnosnikiMenuKontrahentow = document.querySelectorAll('#nawigacja-kontrahenci a'),
    kontenerKontrahentow = document.querySelector('.kontrahenci > article'),
    podstronyKontrahentow = document.querySelectorAll('.kontrahenci > article > section'),

    odnosnikiMenuKontrahentowDodaj = document.querySelectorAll('#nawigacja-kontrahenci-dodaj a'),
    kontenerKontrahentowDodaj = document.querySelector('.kontrahent-dodaj-nowy > article'),
    podstronyKontrahentowDodaj = document.querySelectorAll('.kontrahent-dodaj-nowy > article > section'),

    glowneMenuNawigacyjne = document.querySelectorAll('header .menu-pokazywane-ukrywane')[0], // pobierz pierwszy pasujący, powienien być to <ul> w <header>-ze witryny  
    przelacznikPokazywaniaMenuGlownego = document.querySelectorAll('header .przelacznik-widocznosci-menu')[0], // jw. też wewnątrz pierwszego <header>-a (nie użyto id)

    menuNawigacyjneKontrahenci = document.querySelectorAll('#kontrahenci .menu-pokazywane-ukrywane')[0], // pobierz pierwszy pasujący, powienien być to <ul> w <header>-ze witryny  
    przelacznikPokazywaniaMenuKontrahenci = document.querySelectorAll('#kontrahenci .przelacznik-widocznosci-menu')[0]; // jw. też wewnątrz pierwszego <header>-a (nie użyto id)


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
        tekstElem,
        kontenerekDivSzczegoly = document.createElement('div'),
        daneAdresowe = klient.adresTypSzczegoly + " " + klient.adresSzczegoly + ", " + klient.kod + " " + klient.miejscowosc,
        tekstElementAdresowy = document.createTextNode( daneAdresowe ),
        pElementAdresowy = document.createElement('p'),
        tekstElementKonto = document.createTextNode( klient.nrKonta ),
        pElementKonto = document.createElement('p'),
        spanElem = document.createElement('span'),
        czyOsobaElem = document.createElement('input'),
        przyciskElem = document.createElement('button'),
        nazwaTypu = klient.osobaFizyczna ? 'osoba' : 'firma';   // nazwa typu z odstępami

kontenerekDiv.classList.add('test-klasa-klient');

if ( klient.osobaFizyczna ) tekstElem = document.createTextNode( klient.imie + " " + klient.nazwisko );
else tekstElem = document.createTextNode( klient.nazwa + " " + klient.formaDzialalnosci);
pElem.appendChild( tekstElem );  // dodanie samego tekstu do elementu z tablicy
pElem.classList.add('test-nazwa-osoby');   // dodanie zdefiniownej klasy dla tekstu - inny wygląd

if ( klient.osobaFizyczna ) {
    czyOsobaElem.setAttribute('checked', true);    // warunkowe zaznacznie lub nie (odczyt )
    czyOsobaElem.setAttribute('title', 'osoba fizyczna: TAK');    // ale ten opisowy atrybut jest zawsze dodawany
}
else {
    czyOsobaElem.setAttribute('title', 'osoba fizyczna: NIE');    // przeciwna treść atrybutu opisowego
}

przyciskElem.textContent = 'Wykonanie dowolnej akcji';
spanElem.appendChild( przyciskElem );
spanElem.classList.add('test-kolor');

spanElem.prepend ( document.createTextNode( nazwaTypu ) );

spanElem.prepend( czyOsobaElem ); // status osoby przed przyciskiem akcji 
czyOsobaElem.setAttribute('type', 'checkbox');      // dodanie atrybutu, jako określenie typu tego przycisku  
    if ( klient.osobaFizyczna ) {
        czyOsobaElem.setAttribute('checked', true);    // warunkowe zaznacznie lub nie (odczyt )
        czyOsobaElem.setAttribute('title', 'osoba fizyczna: TAK');    // ale ten opisowy atrybut jest zawsze dodawany
    }
    else {
        czyOsobaElem.setAttribute('title', 'osoba fizyczna: NIE');    // przeciwna treść atrybutu opisowego
    }
czyOsobaElem.addEventListener('click', function ( evt ) {
    var stan = !!evt.target.getAttribute('checked');
    console.log('stan przycisku:', stan);
    if ( stan ) evt.target.setAttribute('checked', 'checked');
    else evt.target.removeAttribute('checked');

    evt.preventDefault();   // nic nie rób
});        // zdarzenie 'click'

pElem.appendChild( spanElem );

pElementAdresowy.appendChild( tekstElementAdresowy ); // drugi wiersz: adres
pElementAdresowy.classList.add('test-dane-adresowe');

pElementKonto.appendChild( tekstElementKonto );
pElementKonto.classList.add('test-dane-konto');

kontenerekDivSzczegoly.classList.add('test-szczegoly');
kontenerekDivSzczegoly.appendChild( pElementAdresowy );
kontenerekDivSzczegoly.appendChild( pElementKonto );    // drugi wiersz: konto

kontenerekDiv.appendChild( pElem );  // przypisanie zawartości tekstowej dla nowego obiektu tekstowego w <li>
kontenerekDiv.appendChild( kontenerekDivSzczegoly ); // drugi wiersz z danymi adresowymi i numerem konta

return kontenerekDiv;   // zwróć to, co tutaj zbudowano dla jednej pozycji listy
}   // budujElementKontrahenta-END

function pokazUkryjMenu ( elementAktywujacy, elementMenuPokazUkryj, czyMenuGlowne ) {

elementAktywujacy.addEventListener('click', function ( evt ) {
    var elementZMarginesem,
        czyPosiadaKlaseZMarginesem;

    elementMenuPokazUkryj.classList.toggle('widoczne');
        if ( czyMenuGlowne ) {
            elementZMarginesem = document.querySelector('header + .bannery-pozaekranowe');
            czyPosiadaKlaseZMarginesem = elementMenuPokazUkryj.classList.contains('widoczne');
            console.log('czyPosiadaKlaseZMarginesem:', czyPosiadaKlaseZMarginesem);
            if ( czyPosiadaKlaseZMarginesem ) elementZMarginesem.classList.add('dodaj-gorny-margines'); 
            else elementZMarginesem.classList.remove('dodaj-gorny-margines');
        }
    });

}   // pokazUkryjMenu-END


        /*  *****************************************************
                U   R   U   C   H   O   M   I   E   N   I   E           
            *****************************************************
        */

powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera( odnosnikiMenuNawigacyjnego, kontenerPodstronGlownychDzialow, podstronyGlownychDzialow.length );   // reakcja na nawigację DZIAŁÓW WITRYNY 

console.log('kontenerEtapowPrzelewow', ': ', kontenerEtapowPrzelewow);
console.log('podstronyEtapowPrzelewow', podstronyEtapowPrzelewow.length, ': ', podstronyEtapowPrzelewow);
console.log('odnosnikiEtapowPrzelewow', odnosnikiEtapowPrzelewow.length, ': ', odnosnikiEtapowPrzelewow);

powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera( odnosnikiEtapowPrzelewow, kontenerEtapowPrzelewow, podstronyEtapowPrzelewow.length );    // reakcja na nawigację ETAPÓW PRZELEWÓW (zagnieżdżona podkategoria)

console.log('kontenerKontrahentow', ': ', kontenerKontrahentow);
console.log('podstronyKontrahentow', podstronyKontrahentow.length, ': ', podstronyKontrahentow);
console.log('odnosnikiMenuKontrahentow', odnosnikiMenuKontrahentow.length, ': ', odnosnikiMenuKontrahentow);

powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera( odnosnikiMenuKontrahentow, kontenerKontrahentow, podstronyKontrahentow.length );    // reakcja na nawigację poddziału KONTRAHENTÓW (zagnieżdżona podkategoria)

powiazZdarzenieKliknieciaWNawigacjiZPrzewinieciemKontenera( odnosnikiMenuKontrahentowDodaj, kontenerKontrahentowDodaj, podstronyKontrahentowDodaj.length );    // reakcja na nawigację poddziału KONTRAHENTÓW (zagnieżdżona podkategoria)


pokazUkryjMenu( przelacznikPokazywaniaMenuGlownego, glowneMenuNawigacyjne, true );  // akcje dla klikania przycisku pokazywania/ukrywania głównego menu nawigacyjnego

pokazUkryjMenu( przelacznikPokazywaniaMenuKontrahenci, menuNawigacyjneKontrahenci, false );  // akcje dla klikania przycisku pokazywania/ukrywania menu nawigacyjnego kontrahentów


kontrahenci.forEach( function( kontrahent ) {
    var elementKontrahenta = budujElementKontrahenta( kontrahent ); // wytwórz strukturę dl ajednego elementu na podstawie danych
    // console.log( elementKontrahenta );
    elementKontrahentow.appendChild( elementKontrahenta );  // wstaw do bloku to co zbudowano po sztuce

});

document.getElementById('kontrahent-lista').appendChild( elementKontrahentow );
