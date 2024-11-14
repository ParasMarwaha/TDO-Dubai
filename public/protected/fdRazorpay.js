document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('payment-form').addEventListener('submit', function(e) {
        if (document.getElementById('paymentMethod').value === 'wallet') {
            // Form will be submitted normally for wallet payments
            return;
        } else {
            e.preventDefault();

            const params = {
                amount: document.getElementById('finaAmtCtrl').value,
                name: document.getElementById('agName').value,
                email: document.getElementById('agentEmail').value,
                contact: document.getElementById('agPhone').value,
                CompanyId: document.getElementById('CompanyId').value,
                paymentMethod: document.getElementById('paymentMethod').value,
                payType: document.getElementById('payType').value,
                insId: document.getElementById('insId').value
            };

            try {
                let fd = new FormData();
                fd.append('finalAmt', document.getElementById('finaAmtCtrl').value);
                fd.append('agName', document.getElementById('agName').value);
                fd.append('agentEmail', document.getElementById('agentEmail').value);
                fd.append('agPhone', document.getElementById('agPhone').value);
                fd.append('CompanyId', document.getElementById('CompanyId').value);
                fd.append('paymentMethod', document.getElementById('paymentMethod').value);
                fd.append('payType', document.getElementById('payType').value);
                fd.append('insId', document.getElementById('insId').value);
                fetch('/fixedDeparture/razorpay-options', {
                    method: 'POST',
                    body: fd
                }).then(response => response.json())
                  .then(options => {
                      const rzp1 = new Razorpay(options);
                      rzp1.open();
                  }).catch(error => {
                      console.error('Error:', error);
                  });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});
