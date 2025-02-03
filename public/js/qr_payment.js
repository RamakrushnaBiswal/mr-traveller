// qr_payment.js
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve amount and number of tickets from URL
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const numberOfTickets = urlParams.get('tickets');

    // Display the total amount
    // document.getElementById('totalAmount').textContent = `Total Amount: ₹${discountedAmount}`;

    // Function to handle payment processing
    document.querySelector('.pay-btn').addEventListener('click', function() {
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = `Tickets are confirmed. Payment succeeded!`;
        successMessage.style.display = 'block';

        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = '/'; // Update this with your home page URL
        }, 2000);
    });
});
