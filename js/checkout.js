
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

const formEl = document.querySelector('.paymnform');
formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    fetch('https://reqres.in/api/users', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
});
