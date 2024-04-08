
// JavaScript for checkout functionality
$(document).ready(function () {
    $("input[name='expiry-data']").mask("00 / 00");

    // Event listener for checkout button
    $('.checkout-button').click(function () {
        // Redirect to checkout page
        window.location.href = 'css/checkout.css';
    });
});
// JavaScript function to navigate back to index.html
function goBack() {
    window.location.href = 'index.html'; // Replace 'index.html' with the actual file path
}