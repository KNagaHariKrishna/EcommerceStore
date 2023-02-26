import React, { useEffect, useState } from "react";

const GooglePayButton = () => {
  const [paymentsClient, setPaymentsClient] = useState(null);

  useEffect(() => {
    // Load the Google Pay API script
    const script = document.createElement("script");
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.onload = () => {
      const newPaymentsClient = new window.google.payments.api.PaymentsClient({
        environment: "TEST",
      });
      setPaymentsClient(newPaymentsClient);
    };
    document.body.appendChild(script);

    // Clean up the script tag
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGooglePayClick = async () => {
    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example",
              gatewayMerchantId: "exampleGatewayMerchantId",
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Example Merchant",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: "1.00",
        currencyCode: "USD",
        countryCode: "US",
      },
    };

    const options = {
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestShipping: true,
      shippingAddressRequired: true,
    };

    try {
      const paymentData = await paymentsClient.loadPaymentData(
        paymentDataRequest
      );
      console.log(paymentData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleGooglePayClick} className="buy">
      Pay with Google Pay
    </button>
  );
};

export default GooglePayButton;
