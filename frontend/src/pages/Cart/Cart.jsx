import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br></br>
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs. {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs. {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottoms">
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
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here </p>
            <div className="promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
