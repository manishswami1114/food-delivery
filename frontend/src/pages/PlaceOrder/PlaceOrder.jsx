// import React, { useContext } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";

// const PlaceOrder = () => {
//   const { getTotalAmount } = useContext(StoreContext);
//   return (
//     <form className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input type="text" placeholder="First Name" />
//           <input type="text" placeholder="Last Name" />
//         </div>
//         <input type="email" placeholder="Email Address" />
//         <input type="text" placeholder="Street" />
//         <div className="multi-fields">
//           <input type="text" placeholder="City" />
//           <input type="text" placeholder="State" />
//         </div>
//         <div className="multi-fields">
//           <input type="text" placeholder="Zip-Code" />
//           <input type="text" placeholder="Country" />
//         </div>
//         <input type="text" placeholder="Phone" />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//           <div className="cart-totals-details">
//               <p>Subtotal</p>
//               <p>Rs. {getTotalAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-totals-details">
//               <p>Delivery Fee</p>
//               <p>{getTotalAmount()===0?0:30}</p>
//             </div>
//             <hr />
//             <div className="cart-totals-details">
//               <b>Total</b>
//               <b>Rs. {getTotalAmount()===0?0:getTotalAmount() + 30}</b>
//             </div>
//           </div>
//           <button>PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalAmount } = useContext(StoreContext);

  const handlePayment = async () => {
    const totalAmount = getTotalAmount() === 0 ? 0 : getTotalAmount() + 30;

    if (totalAmount === 0) {
      alert("Cart is empty. Add items to proceed.");
      return;
    }

    try {
      // Create a Razorpay order by making a request to the backend
      const { data } = await axios.post(
        "https://dinedivine.onrender.com/api/payment/create-order",
        {
          amount: totalAmount,
          currency: "INR",
        }
      );

      if (data.success) {
        const { order } = data;

        // Options for Razorpay checkout
        const options = {
          key: "rzp_test_AtXrkdEAB9IL9W", // Replace with your Razorpay Key ID
          amount: order.amount,
          currency: order.currency,
          name: "DineDivine",
          description: "Test Transaction",
          order_id: order.id,
          handler: function (response) {
            // Handle successful payment response
            alert(
              `Payment successful. Payment ID: ${response.razorpay_payment_id}`
            );
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        // Open Razorpay's checkout popup
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        alert("Failed to create Razorpay order. Try again.");
      }
    } catch (error) {
      console.error("Error initiating payment", error);
      alert("Payment initiation failed. Please try again later.");
    }
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip-Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-totals-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-totals-details">
              <p>Delivery Fee</p>
              <p>{getTotalAmount() === 0 ? 0 : 30}</p>
            </div>
            <hr />
            <div className="cart-totals-details">
              <b>Total</b>
              <b>Rs. {getTotalAmount() === 0 ? 0 : getTotalAmount() + 30}</b>
            </div>
          </div>
          <button type="button" onClick={handlePayment}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
