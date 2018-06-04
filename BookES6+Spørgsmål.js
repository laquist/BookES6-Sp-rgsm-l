/**
 * REFLESKTIONS- og EVALUERINGSopgave
 * 
 * Fomål: Du skal få endnu bedre styr på koden og refletere over hvordan og hvorfor Book data sættes op i forskellige strukturer (datastrukturer). 
 * Tid: Du må maksimalt bruge tre lektioner (en halv dag) til opgaven. 
 * 
 * Du bestemmer selv hvordan du vil svare på opgaven. Du kan enten skrive dine svar under hvert spørgsmål eller skrive det ind i et Word dokument.
 * Når du er færdig skal du sende din besvarelse til din lærer (KLJO) via mail, så vil jeg give dig feedback.
 * 
 * Hjælp: Du kan finde mange af svarene ved at åbne programmet i din browser og bruge udviklerværktøjets console. Du kan fx kalde en metode eller property. 
 */

// Spørgsmål 1: Hvad betyder det når vi definerer en klasse i JS?
// Svar: ...
class Book {
    // Spørgsmål 2: Beskriv med dine egne ord hvad en constructor er. Du må gerne finde en beskrivelse på nettet, men beskriv den med dine egne ord.
    // Spørgsmål 3: Hvilken datatype modtager denne constructor? Lav også et eksempel på hvordan denne ser ud med test data.
    constructor(slots) {
        this.isbn = slots.isbn;
        this.title = slots.title;
        this.year = slots.year;
    };

    // Spørgsmål 4: Hvad er en statisk metode og hvorfor skriver vi at det skal være sådan en?
    // Spørgsmål 5: Beskriv hvad convertRow2Obj metoden gør og hvordan den gør det.
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
            bookTable = JSON.parse(bookTableString)
            // Spørgsmål 7: Beskriv hvad Object.keys() mmetoden retunerer. Både hvilken datatype og ét eksempel på hvad keys variablen bliver sat til.
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
            bookTableString = JSON.stringify(Book.instances);
            // Spørgsmål 9: Hvorfor skal vi stringify() Book.instances for, at kunne bruge localStorage?
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
// Spørgsmål 12: Ud fra teorien om datastrukture er det så stillet op som en record eller et map? Hvorfor tror du at det er den datastruktur der er valgt? 
// Spørgsmål 13: Hvilket formål har denne property i vores app?
Book.instances = {};