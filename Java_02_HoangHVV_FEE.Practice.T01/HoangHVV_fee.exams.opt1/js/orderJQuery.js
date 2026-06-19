// Main
$(document).ready(function(){
    // Handle minus
    $('.btn-minus').on('click',function(){
        const $input = $(this).closest('.quantity-group').find('.quantity-input');
        let val = parseInt($input.val()) || 1;
        if(val > 1){
            $input.val(val-1);
            updateRow($(this).closest('.product-row'));
            updateSummary();
        }
    });

    // Handle plus
    $('.btn-plus').on('click', function() {
        const $input = $(this).closest('.quantity-group').find('.quantity-input');
        let val = parseInt($input.val()) || 1;
        $input.val(val + 1);

        updateRow($(this).closest('.product-row'));
        updateSummary();
    });

    // Handle Remove 
    $('.btn-remove').on('click',function(){
        $(this).closest('.product-row').remove();
        updateSummary();
    });

    // Handle input directly
    $('.quantity-input').on('change', function() {
        let val = parseInt($(this).val()) || 1;
        if (val < 1) val = 1;
        $(this).val(val);

        updateRow($(this).closest('.product-row'));
        updateSummary();
    });

});


function updateRow($row){
    const quantity = parseInt ($row.find('.quantity-input').val()) || 0;
    const price = parseFloat($row.find('.price').data('price'));
    const discount = parseFloat($row.find('.discount').data('discount'));
    
    const tax = Math.ceil(quantity * price * 0.125);
    const total = quantity * price - discount + tax;

    $row.find('.tax').text('$' + tax.toFixed(2));
    $row.find('.total').text('$' + total.toFixed(2));

}

function updateSummary() {
    let totalPrice = 0, totalDiscount = 0, totalTax = 0;

    $('.product-row').each(function() {
        const $row = $(this);
        const quantity = parseInt($row.find('.quantity-input').val()) || 0;
        const price = parseFloat($row.find('.price').data('price'));
        const discount = parseFloat($row.find('.discount').data('discount')) || 0;

        const tax = Math.ceil(quantity * price * 0.125);
        const total = quantity * price - discount + tax;

        totalPrice += total;
        totalDiscount += discount;
        totalTax += tax;
    });

    $('#total-price').text('$' + totalPrice.toFixed(2));
    $('#total-discount').text('$' + totalDiscount.toFixed(2));
    $('#total-tax').text('$' + totalTax.toFixed(2));
}