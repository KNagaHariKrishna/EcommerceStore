import React, { useState } from "react";
import "./App.css";
import GooglePayButton from "./GpayBtn";
import productsData from "./productsData";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
      setCartItems([...cartItems]);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="App">
      <dvi className="head">
        <p>Total items in cart: {cartItems.length}</p>
        <p>Total amount: {calculateTotal()} USD</p>
        {calculateTotal() > 0 ? <GooglePayButton /> : null}
      </dvi>
      <header className="App-header">
        <h1>Video Game Store</h1>
      </header>
      <main>
        {productsData.map((product) => (
          <div key={product.id} className="product">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="price">{product.price} $</p>
              <button onClick={() => addToCart(product)}>Add To Cart</button>
              <button onClick={() => removeFromCart(product)}>
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
