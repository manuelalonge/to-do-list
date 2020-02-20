// dichiarazione variabili globali
let itemsList;

// All'init dell'applicazione prendo le note dal local storage
let storedNotes = Object.entries(window.localStorage).filter(entity => entity[0].includes('notes-'));

document.addEventListener('DOMContentLoaded', () => {

    itemsList = document.querySelector('.list');
    inputElement = document.querySelector('#inputField');
    console.log('storedNotes: ', storedNotes);
    storedNotes.forEach(note => addItemToDom(note[1], itemsList, note[0]));

    // aggiunta di un item tramite input (click su invio tastiera)
    inputElement.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            const noteId = 'notes-' + Date.now(); // genero ID
            var text = event.target.value; // testo della nota
            addItemToDom(text, itemsList, noteId); // aggiungo un elemento della lista al DOM
            window.localStorage.setItem(noteId, text); // setto al local storage la nuova nota
            storedNotes.push([noteId, text]); // salvo in memoria nel mio array la nuova nota
            text = null;
        }
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
        el.style.color = 'red';
        removeItemFromDom(noteId);
        window.localStorage.removeItem(noteId);
    });
}

// rimozione singolo item dal DOM tramite la sua chiave
function removeItemFromDom(key) {
    const el = document.querySelector('#' + key);
    el.remove();
}