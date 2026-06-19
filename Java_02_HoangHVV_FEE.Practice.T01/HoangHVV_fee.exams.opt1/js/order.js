// Main
document.addEventListener('DOMContentLoaded',function(){

    // Handle decrement
    document.querySelectorAll('.btn-minus').forEach(function(btn){
        btn.addEventListener('click',function(){
            const input = this.closest('.quantity-group').querySelector('.quantity-input');
            let val = parseInt(input.value) || 1;

            if(val > 1){
                input.value = val -1;
                updateRow(this.closest('.product-row'));
                updateSummary();
            }
        })
    });

    // Handle Increment
    document.querySelectorAll('.btn-plus').forEach(function(btn){
        btn.addEventListener('click',function(){
            const input = this.closest('.quantity-group').querySelector('.quantity-input');
            let val = parseInt(input.value) || 1;
            input.value = val + 1;

            updateRow(this.closest('.product-row'));
            updateSummary();
        });
    });

    // Handle remove
    document.querySelectorAll('.btn-remove').forEach(function(btn){
        btn.addEventListener('click',function(){
            this.closest('.product-row').remove();
            updateSummary();
        });
    });

      // Handle input directly
    document.querySelectorAll('.quantity-input').forEach(function(input){
        input.addEventListener('change',function(){
            let val = parseInt(this.value) || 1;
            if(val < 1) val = 1;
            this.value = val;

            updateRow(this.closest('.product-row'));
            updateSummary();
        })
    });


});

// Update row data
function updateRow(row){
    const quantityInput = row.querySelector('.quantity-input');
    const priceElement = row.querySelector('.price');
    const discountElement = row.querySelector('.discount');
    const taxElement = row.querySelector('.tax');
    const totalElement = row.querySelector('.total');

    const quantity = parseInt(quantityInput.value) || 0;
    const price = parseFloat(priceElement.dataset.price);
    const discount = parseFloat(discountElement.dataset.discount) || 0 ;

    const tax = Math.ceil(quantity * price * 0.125);
    const total = quantity * price - discount + tax;

    taxElement.textContent = '$' + tax.toFixed(2);
    totalElement.textContent = '$' + total.toFixed(2);
}

/*
    Formulas:
    Tax = Quantity * Price * 12.5%, rounding up-to 1 
    Total = Quantity * Price - Discount + Tax
    Total Price = sum of totals
    Total Discount = sum of discounts
    Total Tax = sum of all taxes
*/
function updateSummary(){
    const rows = document.querySelectorAll('.product-row');
    let totalPrice = 0, totalDiscount = 0, totalTax = 0;

    rows.forEach(function(row){
        const quantity = parseInt(row.querySelector('.quantity-input').value) || 0;
        const price = parseFloat(row.querySelector('.price').dataset.price);
        const discount = parseFloat(row.querySelector('.discount').dataset.discount) || 0;
        
        const tax = Math.ceil(quantity * price * 0.125);
        const total = quantity * price - discount + tax;

        totalPrice += total;
        totalDiscount += discount;
        totalTax+= tax;
    });

    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);
    document.getElementById('total-discount').textContent = '$' + totalDiscount.toFixed(2);
    document.getElementById('total-tax').textContent = '$' + totalTax.toFixed(2);
}