document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payment-form');
    const rzpButton = document.getElementById('rzp-button1');
    let rzp1;  // Declare rzp1 globally

    // Fetch and initialize Razorpay when the form is submitted
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const params = {
            amount: document.getElementById('finaAmtCtrl').value,
            name: document.getElementById('agentName').value,
            email: document.getElementById('agentEmail').value,
            camount: document.getElementById('camount').value,
            contact: document.getElementById('agPhone').value,
            CompanyId: document.getElementById('CompanyId').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            payType: document.getElementById('payType').value,
        };

        try {
            console.log('Fetching Razorpay configuration...');
            console.log(params)
            let fd = new FormData();
           fd.append('amount', document.getElementById('finaAmtCtrl').value);
           fd.append('camount', document.getElementById('camount').value);
            fd.append('name', document.getElementById('agentName').value);
            fd.append('email', document.getElementById('agentEmail').value);
            fd.append('GatewayCharge', document.getElementById('GatewayCharge').value);
            fd.append('contact', document.getElementById('agPhone').value);
            fd.append('CompanyId', document.getElementById('CompanyId').value);
            fd.append('paymentMethod', document.getElementById('paymentMethod').value);
            fd.append('payType', document.getElementById('payType').value);
           
            const response = await fetch('/topup-options', {
                method: 'POST',
                body: fd
            });

            if (!response.ok) {
                throw new Error('Failed to fetch Razorpay configuration');
            }

            const options = await response.json();
            console.log('Razorpay configuration:', options);
            rzp1 = initializeRazorpay(options, params);

            // Directly open the Razorpay window after initialization for testing
            if (rzp1) {
                console.log('Opening Razorpay window...');
                rzp1.open();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function initializeRazorpay(options, params) {

        // Initialize Razorpay
        console.log('Initializing Razorpay with options:', options);
        const rzp = new Razorpay(options);

        // Set up click event for the button
        if (rzpButton) {
            rzpButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (rzp) {
                    console.log('Opening Razorpay window...');
                    rzp.open();
                } else {
                    console.error('Razorpay instance not initialized');
                }
            });
        } else {
            console.error('Button not found');
        }

        return rzp;
    }
});
