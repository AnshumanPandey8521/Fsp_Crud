// script.js
let items = [];
let editingIndex = -1;

const form = document.getElementById("crudForm");
const itemNameInput = document.getElementById("itemName");
const itemsTable = document.getElementById("itemsTable").getElementsByTagName('tbody')[0];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const itemName = itemNameInput.value;

    if (editingIndex === -1) {
        // Add item
        items.push(itemName);
    } else {
        // Update item
        items[editingIndex] = itemName;
        editingIndex = -1;
    }

    itemNameInput.value = "";
    renderTable();
});

function renderTable() {
    itemsTable.innerHTML = "";
    items.forEach((item, index) => {
        const row = itemsTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.textContent = item;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.onclick = () => editItem(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => deleteItem(index);

        cell2.appendChild(editButton);
        cell2.appendChild(deleteButton);
    });
}

function editItem(index) {
    itemNameInput.value = items[index];
    editingIndex = index;
}

function deleteItem(index) {
    items.splice(index, 1);
    renderTable();
}

// Initial render
renderTable();
