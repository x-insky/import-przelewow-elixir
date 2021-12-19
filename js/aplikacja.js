var odnosnikiMenuNawigacyjnego = document.querySelectorAll('nav a'),    // każdy <a> w <nav>
    podstronyGlownychDzialow = document.querySelectorAll('main .kontener-pozaekranowy section'),
    kontenerPodstronGlownychDzialow = document.querySelector('main .kontener-pozaekranowy > article'); 

// console.log(odnosnikiMenuNawigacyjnego.length, ': ', odnosnikiMenuNawigacyjnego);
 console.log(podstronyGlownychDzialow.length, ': ', podstronyGlownychDzialow);

podstronyGlownychDzialow

odnosnikiMenuNawigacyjnego.forEach( function(odnosnik, idx ) {
    console.log( odnosnik );

    odnosnik.addEventListener('click', function ( evt ) {
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