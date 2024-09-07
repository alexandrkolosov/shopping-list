const itemForm = document.getElementById('item-form');
const inputForm = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(evt) {
    evt.preventDefault();

    const newItem = inputForm.value;
    //Validate input
    if (newItem === '') {
        alert('Please add item');
        return;
    } 

    //Create item DOM element

    addItemToDOM(newItem);

    //ADD item to local storage 

    addItemToStorage(newItem);

   checkUI();

   inputForm.value = '';



}

function addItemToDOM(item) {
 
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(item));

   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);

   // Add li to the DOM
   itemList.appendChild(li);

   checkUI();
}

// Local strorage funtion 

function addItemToStorage(item) {
    const itemsFromStorage =  getItemsFromStorage();

    // Add new item to array

    itemsFromStorage.push(item);

    // Convert to JSON string and set to localStorage

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-times-circle');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}



function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;

}

// this is an action which allows us to REMOVE item from a list with using X 

function removeItem (evt) {
    if (evt.target.parentElement.classList.contains('remove-item')){
        if (confirm('Are you sure?')) { //CONFIRMATION OPTION
        evt.target.parentElement.parentElement.remove();

        checkUI();
        };
    };
}

function filterItems(evt) {
    const items = itemList.querySelectorAll('li');
    const text = evt.target.value.toLowerCase();
    items.forEach( item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);

        checkUI();
    }
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

function init () {
//Event listener

itemForm.addEventListener('submit', onAddItemSubmit); // this event activate additem when the button is submitted 
itemList.addEventListener('click', removeItem); //This event activate function when the red cross is clicked
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
}

init();