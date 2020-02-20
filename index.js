let itemsList;
let clearList;


let storedNotes = Object.entries(window.localStorage).filter(entity => entity[0].includes('notes-'));

document.addEventListener('DOMContentLoaded', () => {

    itemsList = document.querySelector('.list');
    addButton = document.querySelector('#addButton');
    clearList = document.querySelector('#clearList');
    console.log('storedNotes: ', storedNotes);
    storedNotes.forEach(note => addItemToDom(note[1], itemsList, note[0]));


    addButton.addEventListener('click', () => {

        const noteId = 'notes-' + Date.now();
        var text = document.querySelector('#inputField').value;
        addItemToDom(text, itemsList, noteId);
        window.localStorage.setItem(noteId, text);
        storedNotes.push([noteId, text]);
        text = null;

    });


    clearList.addEventListener('click', (e) => {
        storedNotes.forEach(note => {
            removeItemFromDom(note[0]);
            window.localStorage.removeItem(note[0]);
        });
        storedNotes = [];
    });

    //Funzione autosave

    /*
    function getEditor() {
        var elems = document.getElementsByTagName('input');

        if (elems.length <= 0) {
            return null;
        }
        return elems[0];
    };

    function restore(noteId) {
        var saved = window.localStorage.getItem(noteId);
        var editor = getEditor();
        if (saved && editor) {
            editor.value = saved;
        }
    };

    restore();
    */




});


function addItemToDom(text, list, noteId) {
    const el = document.createElement('li');
    const textNode = document.createTextNode(text);
    el.setAttribute('id', noteId);
    el.appendChild(textNode);
    el.classList.add('notepad__item');
    list.appendChild(el);

    el.addEventListener('click', () => {
        el.classList.add('done');
        window.localStorage.removeItem(noteId);
    });
}

// rimozione singolo item dal DOM tramite la sua chiave
function removeItemFromDom(key) {
    const el = document.querySelector('#' + key);
    el.remove();
  }

