// Object to keep track of items and their quantities
let cartItems = {};

// Function to add a checkout button to the sidebar
function addCheckoutButton() {
    const sidebar = document.querySelector('.side-bar');
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.classList.add('checkout-button');
    checkoutButton.onclick = function () {
        // Redirect to the checkout page
        window.location.href = 'checkout.html';
    };
    sidebar.appendChild(checkoutButton);
}

// Function to update the count next to the cart icon
function updateCartCount() {
    const countElement = document.querySelector(".cart .count");
    const itemCount = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    countElement.textContent = itemCount;
}

// Function to update the total amount
function updateTotal() {
    const totalElement = document.getElementById("total");
    const totalAmount = Object.values(cartItems).reduce((total, item) => total + (item.price * item.quantity), 0);
    totalElement.textContent = '$' + totalAmount.toFixed(2);
}

// Function to clear the cart
function clearCart() {
    const sidebarCart = document.querySelector('#cartItem');
    sidebarCart.textContent = 'Your cart is empty';
    cartItems = {}; // Clear cart items
    updateCartCount(); // Update count next to the cart icon
    updateTotal(); // Update the total amount
}

// Function to add item to cart and update count
function addToCart(itemName, itemPrice) {
    // Update the count
    updateCartCount();

    // Check if item already exists in cart
    if (cartItems[itemName]) {
        // If item already exists, increase its quantity
        cartItems[itemName].quantity++;
        // Update the displayed item text with quantity
        cartItems[itemName].element.querySelector('.quantity').textContent = '(' + cartItems[itemName].quantity + ')';
    } else {
        // If item does not exist, create new item in cart
        const sidebarCart = document.querySelector('#cartItem');
        const newItem = document.createElement('div');
        newItem.classList.add('cart-item'); // Add a class to style the cart item

        // Create item name element
        const itemNameElement = document.createElement('span');
        itemNameElement.textContent = itemName;

        // Create price element
        const priceElement = document.createElement('span');
        priceElement.textContent = '$' + itemPrice;

        // Create quantity element
        const quantityElement = document.createElement('span');
        quantityElement.textContent = '(1)';
        quantityElement.classList.add('quantity');

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.classList.add('remove-button');
        removeButton.onclick = function () {
            // Decrease the quantity
            cartItems[itemName].quantity--;
            // Update the displayed quantity
            quantityElement.textContent = '(' + cartItems[itemName].quantity + ')';
            // If quantity becomes zero, remove the item from cartItems and sidebar
            if (cartItems[itemName].quantity === 0) {
                sidebarCart.removeChild(newItem);
                delete cartItems[itemName];
                // Check if cart is empty and update the message
                if (Object.keys(cartItems).length === 0) {
                    sidebarCart.textContent = 'Your cart is empty';
                }
            }
            // Update the count
            updateCartCount();
            // Update the total amount
            updateTotal();
        };

        // Create plus button
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.classList.add('plus-button');
        plusButton.onclick = function () {
            // Increase the quantity
            cartItems[itemName].quantity++;
            // Update the displayed quantity
            quantityElement.textContent = '(' + cartItems[itemName].quantity + ')';
            // Update the count
            updateCartCount();
            // Update the total amount
            updateTotal();
        };

        // Append elements to newItem
        newItem.appendChild(itemNameElement);
        newItem.appendChild(priceElement);
        newItem.appendChild(quantityElement);
        newItem.appendChild(removeButton);
        newItem.appendChild(plusButton);

        // Append newItem to sidebar cart
        sidebarCart.appendChild(newItem);

        // Store item details in cartItems object
        cartItems[itemName] = {
            element: newItem,
            price: itemPrice,
            quantity: 1
        };

        // Update the total amount
        updateTotal();
    }
}

function showSidebar() {
    const sidebar = document.querySelector('.side-bar_container');
    const overlay = document.querySelector('.overlay');
    sidebar.classList.remove('hidden');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Disable scrolling
    // Check if the checkout button already exists
    if (!document.querySelector('.checkout-button')) {
        addCheckoutButton(); // Add the checkout button if it doesn't exist
    }
}

// Function to hide sidebar and remove dimmed background
function hideSidebar() {
    const sidebar = document.querySelector('.side-bar_container');
    const overlay = document.querySelector('.overlay');
    sidebar.classList.add('hidden');
    overlay.classList.remove('show');
    document.body.style.overflow = ''; // Enable scrolling
}

// Event listener for clicking close button
document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('close-button')) {
        hideSidebar();
    }
});
// Event listener for clicking cart icon
const cartIcon = document.querySelector('.cart');
cartIcon.addEventListener('click', function () {
    const sidebar = document.querySelector('.side-bar_container');
    const overlay = document.querySelector('.overlay');
    if (sidebar.classList.contains('hidden')) {
        showSidebar();
    } else {
        hideSidebar();
    }
});