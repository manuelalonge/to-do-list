// dichiarazione variabili globali
let itemsList;
let clearList;

// All'init dell'applicazione prendo le note dal local storage
let storedNotes = Object.entries(window.localStorage).filter(entity => entity[0].includes('notes-'));

document.addEventListener('DOMContentLoaded', () => {

    itemsList = document.querySelector('.list');
    addButton = document.querySelector('#addButton');
    clearList = document.querySelector('#clearList');
    console.log('storedNotes: ', storedNotes);
    storedNotes.forEach(note => addItemToDom(note[1], itemsList, note[0]));

    // aggiunta di un item tramite click del bottone add
    addButton.addEventListener('click', (event) => {

        const noteId = 'notes-' + Date.now(); // genero ID
        var text = document.querySelector('#inputField').value; // testo della nota
        addItemToDom(text, itemsList, noteId); // aggiungo un elemento della lista al DOM
        window.localStorage.setItem(noteId, text); // setto al local storage la nuova nota
        storedNotes.push([noteId, text]); // salvo in memoria nel mio array la nuova nota
        text = null;

    });

    // rimozione di tutti gli items tramite il bottone 'CLEAR LIST'
    clearList.addEventListener('click', (e) => {
        // ciclo le note salvate in memoria nel mio array
        storedNotes.forEach(note => {
            removeItemFromDom(note[0]); // rimozione dell'elemento dalla lista al DOM
            window.localStorage.removeItem(note[0]); // rimozione della nota dal local storage
        });
        storedNotes = []; // svuoto la memoria del javascript eliminando tutte le note dall'array
    });


});

// aggiunta singolo item al DOM
function addItemToDom(text, list, noteId) {
    const el = document.createElement('li');
    const textNode = document.createTextNode(text);
    el.setAttribute('id', noteId); // aggiungo un id alla nota al DOM (la stessa che ho salvato al local storage ed in memoria)
    el.appendChild(textNode);
    el.classList.add('notepad__item');
    list.appendChild(el);

    el.addEventListener('click', () => {
        el.classList.add('done');
        window.localStorage.removeItem(noteId);
    });
}
