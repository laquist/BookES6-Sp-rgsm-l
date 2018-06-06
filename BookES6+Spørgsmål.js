-/**
 * REFLESKTIONS- og EVALUERINGSopgave
 * 
 * Fomål: Du skal få endnu bedre styr på koden og reflektere over hvordan og hvorfor Book data sættes op i forskellige strukturer (datastrukturer). 
 * Tid: Du må maksimalt bruge tre lektioner (en halv dag) til opgaven. 
 * 
 * Du bestemmer selv hvordan du vil svare på opgaven. Du kan enten skrive dine svar under hvert spørgsmål eller skrive det ind i et Word dokument.
 * Når du er færdig skal du sende din besvarelse til din lærer (KLJO) via mail, så vil jeg give dig feedback.
 * 
 * Hjælp: Du kan finde mange af svarene ved at åbne programmet i din browser og bruge udviklerværktøjets console. Du kan fx kalde en metode eller property. 
 */

// Spørgsmål 1: Hvad betyder det når vi definerer en klasse i JS?
// Svar: Det er til at kunne lave objekter af klassen. Så i dette scenarie, så kan vi lave et objekt/en instans af Book, som så har nogle værdier og metoder/funktioner.
// Det er dog næsten det samme som at lave function.
class Book {
    // Spørgsmål 2: Beskriv med dine egne ord hvad en constructor er. Du må gerne finde en beskrivelse på nettet, men beskriv den med dine egne ord.
    // Svar: Constructoren bruges til at sætte de værdier af Book, som der skal sættes, når du opretter en ny Book (opretter et nyt objekt/en ny instans).
    //       Så i dette tilfælde har Book en title og year og isbn, som skal sættes når vi laver en ny book.
    // Spørgsmål 3: Hvilken datatype modtager denne constructor? Lav også et eksempel på hvordan denne ser ud med test data.
    // Svar: Object?
    //       var slots = {isbn: formEl.isbn.value, title: formEl.title.value, year: formEl.year.value};
    constructor(slots) {
        this.isbn = slots.isbn;
        this.title = slots.title;
        this.year = slots.year;
    };

    // Spørgsmål 4: Hvad er en statisk metode og hvorfor skriver vi at det skal være sådan en?
    // Svar: En statisk metode betyder at den ikke hører til det objekt/den instans man kører metoden på, men er fælles for alle objekterne/instanserne.
    //       Så selvom man har Book1, Book2, Book3, og kalder Book1.(static metode), så vil den give det samme resultat som Book2 og Book3, vil gøre. Det er en fælles metode.
    // Spørgsmål 5: Beskriv hvad convertRow2Obj metoden gør og hvordan den gør det.
    // Svar: bookRow er en enkelt række taget ud af den tabel, hvor vi har vores data. Så hvis vi har 4 rækker, som er 4 forskellige objekter, så er bookRow en enkelt række.
    //       Den bruger så den række til at lave et nyt objekt/instans. (Da vi ved den række fra tabellen indeholder de værdier vi skal bruge i vores constructor)
    static convertRow2Obj(bookRow) {
        let book = new Book(bookRow);
        return book;
    };

    static loadAll() {
        let i = 0, key='', keys=[], bookTableString='', bookTable={};
        try {
            if (localStorage['bookTable']){
                bookTableString = localStorage['bookTable'];
            }
        } catch (error) {
            console.error('Error when reading from Local Storage \n' + error)
        }
        if (bookTableString) {
            // Spørgsmål 6: Hvad gør parse()? Hvordan er bookTableString og bookTable anderledes?
            // Svar: JSON.parse parser fra et JSON objekt til et JS objekt. Så du får et JS objekt med de værdier som JSON objektet har.
            bookTable = JSON.parse(bookTableString)
            // Spørgsmål 7: Beskriv hvad Object.keys() metoden retunerer. Både hvilken datatype og ét eksempel på hvad keys variablen bliver sat til.
            // Svar: vores bookTable er et objekt (lidt som en slags container), som har et array af objekter, som så er de Books vi nu har. 
            //       Det er så det samme som keys bliver. Det bliver et objekt (container) (* Bliver det et array? typeof viser bare objekt.), som har et array af objekter (vores Books). Længere nede laver vi så hvert objekt i arrayet, om til book objekter.
            //       Keys returner/Bliver sat til:
            //       (2) ["1", "2"] (1 og 2 er ISBN på mine bøger)
            keys = Object.keys(bookTable);
            console.log(keys.length + ' books loaded')
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                Book.instances[key] = this.convertRow2Obj(bookTable[key]);
            }
        }
    };

    static saveAll() {
        let bookTableString='', error = false, numberOfBooks = Object.keys(Book.instances).length;
        try {
            // Spørgsmål 8: Hvordan ser hhv. Book.instances og bookTableString ud? Hvad er det funktionen stringify() gør
            // Svar: Book.instances er et objekt, som er sat op som et map (med alle de books der er gemt)
            //       {1: Book, 2: Book, 444: Book, 555: Book}
            //
            //       bookTableString ser bare ud som en JSON string, med de objekter/Books, som vi har.
            //       {"1":{"isbn":"1","title":"TestBog1","year":"1000"},"2":{"isbn":"2","title":"TestBog2","year":"2000"},"444":{"isbn":"444","title":"TestJohn","year":"4040"},"555":{"isbn":"555","title":"TestPoul","year":"5000"}}"
            //
            //       stringify() converter egentligt bare formatet. Den laver en JavaScript value om til en JSON string. 
            bookTableString = JSON.stringify(Book.instances);
            // Spørgsmål 9: Hvorfor skal vi stringify() Book.instances for, at kunne bruge localStorage?
            // Svar: Local Storage kan kun håndtere key/value pairs. Så det man vil gemme skal være key/value pairs. Og det er JSON's format.
            localStorage['bookTable'] = bookTableString;
        } catch (error) {
            console.error('Error when writing to Local Storage\n' + error)
            error = true;
        }
        if (!error) {
            console.log(numberOfBooks + ' books saved');
        }
    };
    
    static add(slots) {
        // Spørgsmål 10: Beskriv hvad der sker på næste linje.
        // Svar: Vi laver en ny key/value eller en ny række/ny record i vores map Book.instances, hvor vi sætter vores key til slots.isbn (som vi har fået som et parameter).
        //       Vi sætter så value til at være et helt objekt: slots - som indeholder: isbn, title, year værdierne)
        Book.instances[slots.isbn] = new Book(slots);
        console.log('Book ' + slots.isbn + ' created.')
    };
 
    static destroy(isbn) {
        if (Book.instances[isbn]) {
            delete Book.instances[isbn];
            console.log('Book ' + isbn + ' deleted.');
        } else {
            console.error('There is no book with ISBN ' + isbn + ' in database.');
        }
    };

    static clearData() {
        if (confirm('Do you really want to delete all book data?')) {
            delete localStorage['bookTable'];
        }
    };

    static createTestData() {
        Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
        Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999});
        Book.instances["0365030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
        Book.saveAll();
    };
};

// Spørgsmål 11: Nedenstående property er datatypen object. Hvordan ser dette Object ud når createTestData() har kørt?
// Svar: Det er stadig et objekt, men det er nu sat op som et map (key/value), med de Books/objekter som der bliver lavet i createTestData()
// Spørgsmål 12: Ud fra teorien om datastrukture er det så stillet op som en record eller et map? Hvorfor tror du at det er den datastruktur der er valgt?
// Svar: Det er stillet op som et map. Jeg tror det er fordi at du på den måde kan gemme et helt objekt på en enkelt plads/række/key-value slot. Fordi så kan du gemme et objekt, som så indeholder mange værdier. Jeg tror egentligt at objektet er sat op som en record.
// Spørgsmål 13: Hvilket formål har denne property i vores app?
// Svar: Book.instances er den liste der gemmer/indeholder alle vores Books/Objekter/Instanser
Book.instances = {};