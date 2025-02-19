import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './cartslice';

function Cartproducts() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', color: '#000' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ height: '60px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div className="container-fluid d-flex align-items-center">
          <Link className="navbar-brand" to="/?main=men" style={{ paddingLeft: '50px' }}>
            <img
              src="https://logos-world.net/wp-content/uploads/2023/01/Limeroad-Logo.jpg"
              alt="Logo"
              className="d-inline-block align-middle"
              style={{ height: '50px', width: 'auto' }}
            />
          </Link>
        </div>
      </nav>

      {/* Cart Section */}
      <div className="container mt-4">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Shopping Cart</h2>
        
        {/* Check if cart is empty */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row">
            {/* Left column: Cart items */}
            <div className="col-md-8">
              {cartItems.map((item) => (
                <div key={item.id} className="col-12 mb-4">
                  <div className="cart-item d-flex align-items-center" style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', height: '270px', width: '700px' }}>
                    {/* Image Section */}
                    <div className="cart-item-image" style={{ height: '200px', width: '200px' }}>
                      <Link to={`/products/${item.category}/${item.id}`}>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          style={{ height: '100%', width: '100%', objectFit: 'contain', borderRadius: '8px' }} 
                        />
                      </Link>
                    </div>

                    {/* Item Details Section */}
                    <div className="cart-item-details d-flex flex-column justify-content-between" style={{ height: '200px', width: '400px', paddingLeft: '30px' }}>
                      <h5>{item.title}</h5>
                      <p>Price: ₹{item.price}</p>
                      <p>Size: {item.size}</p>
                      <p>Quantity: {item.quantity}</p>
                      <div className="d-flex gap-2 mt-2">
                        {/* Quantity change buttons */}
                        <button
                          className="btn btn-light"
                          style={{ width: '50px', borderColor: '#343a40', borderRadius: '4px', backgroundColor: '#f0f0f0', color: '#343a40' }}
                          onClick={() => dispatch(increaseQuantity({ id: item.id }))}>
                          +
                        </button>
                        <button
                          className="btn btn-light"
                          style={{ width: '50px', borderColor: '#343a40', borderRadius: '4px', backgroundColor: '#f0f0f0', color: '#343a40' }}
                          onClick={() => dispatch(decreaseQuantity({ id: item.id }))} 
                          disabled={item.quantity <= 1}>
                          -
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          style={{ width: '100px', borderColor: '#dc3545', borderRadius: '4px', backgroundColor: 'transparent', color: '#dc3545' }}
                          onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column: Apply coupon and summary */}
            <div className="col-md-4">
              <div style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
                <h5>Apply Coupon</h5>
                <input type="text" placeholder="Enter coupon code" className="form-control" style={{ marginBottom: '20px' }} />
                
                <h5>Summary</h5>
                <p>Total Price: ₹{totalPrice}</p>
                <p>Free Delivery</p>
                <hr />
                <p><strong>Total Payable: ₹{totalPrice}</strong></p>
               

             <Link to="/payment" style={{ textDecoration: 'none' }}>
              <button className="btn btn-success btn-lg w-100" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}> Buy Now </button>
              </Link>                          
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cartproducts;
