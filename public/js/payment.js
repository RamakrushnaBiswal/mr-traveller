document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    const paymentMethods = document.getElementById('paymentMethods');
    const ticketsSelect = document.getElementById('tickets');
    const tourGuideCheckbox = document.getElementById('tourGuide');
    const originalAmountSpan = document.getElementById('originalAmount');
    const discountedAmountSpan = document.getElementById('discountedAmount');

    const TICKET_PRICE = 50;
    const TOUR_GUIDE_PRICE = 50;

    // Function to calculate the total amount including discount and additional charges
    function calculateTotal() {
        const numberOfTickets = parseInt(ticketsSelect.value);
        let totalAmount = numberOfTickets * TICKET_PRICE;
        let discountedAmount = totalAmount;

        // Calculate discount if 5 or more tickets are selected
        if (numberOfTickets >= 5) {
            const discount = totalAmount * 0.1; // 10% discount
            discountedAmount -= discount; // Subtract discount from total amount
        }

        // Add additional charge for tour guide if selected
        if (tourGuideCheckbox.checked) {
            discountedAmount += TOUR_GUIDE_PRICE;
        }

        // Update the total amount display
        originalAmountSpan.innerText = `₹${totalAmount}`;
        discountedAmountSpan.innerText = `₹${discountedAmount}`;
    }

    // Event listeners to trigger calculation when ticket number or tour guide option changes
    ticketsSelect.addEventListener('change', calculateTotal);
    tourGuideCheckbox.addEventListener('change', calculateTotal);

    // Initialize total amount on page load
    calculateTotal();

    // Handle form submission
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Ensure payment methods are displayed on form submission
        paymentMethods.style.display = 'block';

        // Logic for handling specific payment method selection and redirection
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (selectedPaymentMethod && selectedPaymentMethod.value === 'qr') {
            const numberOfTickets = parseInt(ticketsSelect.value);
            let totalAmount = numberOfTickets * TICKET_PRICE;

            if (numberOfTickets >= 5) {
                const discount = totalAmount * 0.1;
                totalAmount -= discount;
            }

            if (tourGuideCheckbox.checked) {
                totalAmount += TOUR_GUIDE_PRICE;
            }

            // Redirect to QR code payment page with total amount and number of tickets as query parameters
            window.location.href = `http://localhost:3000/qrpay`;
        }
    });
});
