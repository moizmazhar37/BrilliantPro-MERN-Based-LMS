import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const Jazzcash = useRef();

  useEffect(() => {
    window.Jazzcash
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Register your course",
                amount: {
                  currency_code: "PKR",
                  value: 6650.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(Jazzcash.current);
  }, []);

  return (
    <div>
      <div ref={Jazzcash}></div>
    </div>
  );
}