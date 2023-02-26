import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const [cart, setCart] = useContext(CartContext);

  function updateQuantity(id, newQuantity) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  }

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
