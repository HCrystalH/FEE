const itemNameInput = document.getElementById("itemName");
const itemCostInput = document.getElementById("itemCost");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("shoppingBody");
const grandTotal = document.getElementById("grandTotal");

let total = 0;
addBtn.addEventListener("click",addItem);

function addItem(){
    const itemName = itemNameInput.value.trim();
    const itemCost = Number(itemCostInput.value);

    // Validation
    if(!itemName){
        alert("Item name is required");
        return;
    }

    if(isNaN(itemCost) || itemCost <=0){
        alert("Cost must be a positive number");
        return;
    }

    // Create row
    const tr = document.createElement("tr");

    // Item name Cell
    const nameId = document.createElement("td");
    nameId.textContent = itemName;

    // Item cost Cell
    const costId = document.createElement("td");
    costId.textContent = itemCost;

    // Action Cell
    const actionId = document.createElement("td");
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click",function(){
        const cost = Number(costId.textContent);

        total -= cost;
        grandTotal.textContent = `$${total.toFixed(2)}`;

        tr.remove();
    });

    actionId.appendChild(removeBtn);

    // Append cells to row
    tr.appendChild(nameId);
    tr.appendChild(costId);
    tr.appendChild(actionId);

    // Append row to table
    tableBody.appendChild(tr);

    // Update Total
    total += itemCost;
    grandTotal.textContent = `$${total.toFixed(2)}`;

    // Clear inputs
    itemNameInput.value="";
    itemCostInput.value="";

    // itemNameInput.focus();
}
