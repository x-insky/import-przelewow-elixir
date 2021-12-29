var odnosnikiMenuNawigacyjnego = document.querySelectorAll('header nav a'),    // każdy <a> w <nav>
    kontenerPodstronGlownychDzialow = document.querySelector('.glowne-dzialy > article'),    
    podstronyGlownychDzialow = document.querySelectorAll('.glowne-dzialy > article > section'),
    kontenerEtapowPrzelewow = document.querySelector('.etapy-przelewow > article'),
    podstronyEtapowPrzelewow = document.querySelectorAll('.etapy-przelewow > article > section'),
    odnosnikiEtapowPrzelewow = document.querySelectorAll('.nawigacja-etapow a'); 

odnosnikiMenuNawigacyjnego.forEach( function(odnosnik, idx ) {
    console.log( odnosnik );

    odnosnik.addEventListener('click', function ( evt ) {   // reakcja na nawigację DZIAŁÓW
        evt.preventDefault();   // wyłączenie domyślnego zachowania - brak przejścia do elementu docelowego 

        var nrDzialu = parseInt( evt.target.getAttribute('data-nr') - 1 ) || 0; // odczytanie atrybutu wyzwalacza (-1 dla liczenia od zera), asekuracja zerem
        nrDzialu = ( nrDzialu === idx ) ? idx : 0;  // werfikacja braku grzebania w strukturze
        console.log( evt.target, evt.target.getAttribute('data-nr'), nrDzialu, idx );

        var stylLeft = ( idx * (-1 * 100 / podstronyGlownychDzialow.length) ).toString() + '%'; // odjęcie widoku o skok o widoczny elemnet (co X%), zależnie od ilości elementów
        console.log( stylLeft );
        kontenerPodstronGlownychDzialow.style.left = stylLeft;

        /* var doTranslacji = ( idx * ( 100 / podstronyGlownychDzialow.length) ).toString() + '%';
        console.log( doTranslacji );
        kontenerPodstronGlownychDzialow.style.transform = 'translateX(' + doTranslacji + ')'; */

    }, false);
});

console.log('kontenerEtapowPrzelewow', kontenerEtapowPrzelewow.length, ': ', kontenerEtapowPrzelewow);
console.log('podstronyEtapowPrzelewow', podstronyEtapowPrzelewow.length, ': ', podstronyEtapowPrzelewow);
console.log('odnosnikiEtapowPrzelewow', odnosnikiEtapowPrzelewow.length, ': ', odnosnikiEtapowPrzelewow);


odnosnikiEtapowPrzelewow.forEach( function(odnosnik, idx ) {    // reakcja na nawigację ETAPÓW
    console.log( odnosnik );

    odnosnik.addEventListener('click', function ( evt ) {
        evt.preventDefault();   // wyłączenie domyślnego zachowania - brak przejścia do elementu docelowego 

        var nrEtapu = parseInt( evt.target.getAttribute('data-nr') - 1 ) || 0; // odczytanie atrybutu wyzwalacza (-1 dla liczenia od zera), asekuracja zerem
        nrEtapu = ( nrEtapu === idx ) ? idx : 0;  // werfikacja braku grzebania w strukturze
        console.log( evt.target, evt.target.getAttribute('data-nr'), nrEtapu, idx );

        var stylLeft = ( idx * (-1 * 100 / podstronyEtapowPrzelewow.length) ).toString() + '%'; // odjęcie widoku o skok o widoczny elemnet (co X%), zależnie od ilości elementów
        console.log( idx, stylLeft );
        kontenerEtapowPrzelewow.style.left = stylLeft;

    }, false);
});