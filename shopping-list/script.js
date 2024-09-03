const itemForm = document.getElementById('item-form');
const inputForm = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addItem(evt) {
    evt.preventDefault();

    const newItem = inputForm.value;
    //Validate input
    if (newItem === '') {
        alert('Please add item');
        return;
    }
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(newItem));

   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);

   // Add li to the DOM
   itemList.appendChild(li);

   checkUI();

   inputForm.value = '';



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

// this is an action which allows us to REMOVE item from a list with using X 

function removeItem (evt) {
    if (evt.target.parentElement.classList.contains('remove-item')){
        if (confirm('Are you sure?')) { //CONFIRMATION OPTION
        evt.target.parentElement.parentElement.remove();

        checkUI();
        };
    };
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
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

//Event listener

itemForm.addEventListener('submit', addItem); // this event activate additem when the button is submitted 
itemList.addEventListener('click', removeItem); //This event activate function when the red cross is clicked
clearButton.addEventListener('click', clearItems);

checkUI();