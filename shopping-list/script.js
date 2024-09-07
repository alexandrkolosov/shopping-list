const itemForm = document.getElementById('item-form');
const inputForm = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false; 


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

    // Check for edit mode

    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if(checkIfItemExists(newItem)) {
            alert('This item already exist');
            return;
        }
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
//Remove from local storage

function onClickItem(evt) {
    if (evt.target.parentElement.classList.contains('remove-item')) {
        removeItem(evt.target.parentElement.parentElement);
    } else {
        setItemToEdit(evt.target);
    }

}


//Check duplicate Items 

function checkIfItemExists(item) {
    const itemsFromStorage =getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(y => y.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22'
    inputForm.value = item.textContent;
}
// this is an action which allows us to REMOVE item from a list with using X 

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed 

    itemsFromStorage = itemsFromStorage.filter((y) => y != item);

    //Re-set to local storage 

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeItem (item) {
    if (confirm('Are you sure?')) {
        //remove from DOM
        item.remove();

        //Remove from Storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
 
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
    }

    //clear from local storage
    if (confirm('Are you to delete it ALL?')) {
    localStorage.removeItem('items');
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

    formBtn.innerHTML = '<i class="fa-solid fa-times-circle"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

function init () {
//Event listener

itemForm.addEventListener('submit', onAddItemSubmit); // this event activate additem when the button is submitted 
itemList.addEventListener('click', onClickItem); //This event activate function when the red cross is clicked
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
}

init();