let total =0;

// Add Item
$('#addBtn').on("click",function(){
    const itemName = $("#itemName").val().trim();
    const itemCost = Number($("#itemCost").val());

    // Validation
    if(!itemName){
        alert("Item name is required");
        return;
    }

    if(isNaN(itemCost) || itemCost <= 0){
        alert("Cost must be a positive number");
        return;
    }


    // Create row
    const row = `
        <tr>
            <td> ${itemName} </td>
            <td class="cost"> ${itemCost.toFixed(2)} </td>
            <td>
                <button class="removeBtn"> Remove </button>
            </td>
        </tr>
    `;

    // Append row
    $("#shoppingBody").append(row);

    // Update total
    total += itemCost;
    updateGrandTotal();

    // Clear inputs
    $("#itemName").val("");
    $("#itemCost").val("");
});

$("#shoppingBody").on("click",".removeBtn", function(){
    const row = $(this).closest("tr");

    const cost = Number(row.find(".cost").text());

    total -= cost;

    row.remove();

    updateGrandTotal();
});

function updateGrandTotal(){
    $("#grandTotal").text(
        `$${total.toFixed(2)}`
    );

    (total > 500) ? $("#grandTotal").css("color","red") : $("#grandTotal").css("color","black");
}