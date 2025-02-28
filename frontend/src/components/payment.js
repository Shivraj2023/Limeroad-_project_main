import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios, { Axios } from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


const PaymentPage = () => {
  const [paymentMode, setPaymentMode] = useState(null);
  const [errors, setErrors] = useState({});

  


  const [FormData,setFormData]=useState({
    pincode:"",
    mobileNumber:"",
    fullName:"",
    locality:"",
    houseNumber:"",
    landmark:"",
    city:"",
    state:"",
    addressType:"home"

  })
  
  
  const cartItems = useSelector((state) => state.cart.items);

  console.log("cartitems=======",cartItems);
   
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const validateForm = () => {
    let newErrors = {};
    
    if (!FormData.pincode.match(/^\d{6}$/)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    if (!FormData.mobileNumber.match(/^\d{10}$/)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits";
    }
    if (!FormData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!FormData.locality.trim()) {
      newErrors.locality = "Locality is required";
    }
    if (!FormData.houseNumber.trim()) {
      newErrors.houseNumber = "House number is required";
    }
    if (!FormData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!FormData.state.trim()) {
      newErrors.state = "State is required";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData( (prev)=>({...prev, [name]:value}));
  }

  const handleCheckout = async (e) => {
    e.preventDefault();

    const stripePromise = await loadStripe("pk_test_51QxNehQ0kxVljOm8JKCbrHaYbCIVRk7WbF0R6vjGF8V9Twicd7rJIq9ABoroHmeVlQWpuAs5OtAokeCipvH96ITB00AUdYGAvl");

    if (!validateForm()) return;

    const body = {
        cart: cartItems,
        address: FormData,
        price: totalPrice,
    };
       const token=localStorage.getItem("authToken");
       console.log("authToken");
    try {
        const response = await axios.post("http://localhost:5000/payment", body, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        });
       
        const session = response.data; 

       
        const result = await stripePromise.redirectToCheckout({
            sessionId: session.id,  
        });

        if (result.error) {
            console.error("Stripe Checkout Error:", result.error.message);
        }

    } catch (error) {
        console.error("Payment Failed:", error.response ? error.response.data : error.message);
    }
};




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

      {/* Payment Page Content */}
      <div className="container mt-4">
        <div className="row">
          {/* Shipping Address and Cart Section */}
          <div className="col-md-6">
            <div className="card p-3">
              <h5>Please Fill Address For Shipping</h5>
              {/* Address Form Fields */}
              <div className="form-group">
                <label>Pincode *</label>
                <input type="text" name="pincode" value={FormData.pincode} onChange={handleChange} placeholder="6 Digit Pincode" className="form-control" />
                {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input type="text" name="mobileNumber" value={FormData.mobileNumber} onChange={handleChange}  className="form-control"  />
                {errors.mobileNumber && <small className="text-danger">{errors.mobileNumber}</small>}
              </div>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={FormData.fullName} onChange={handleChange} className="form-control" />
                {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
              </div>
              <div className="form-group">
                <label>Locality/Area *</label>
                <input type="text" name="locality" value={FormData.locality} onChange={handleChange} className="form-control" />
                {errors.locality && <small className="text-danger">{errors.locality}</small>}
                
              </div>
              <div className="form-group">
                <label>Flat / House No. / Building Name *</label>
                <input type="text" name="houseNumber" value={FormData.houseNumber} onChange={handleChange} className="form-control" />
                {errors.houseNumber && <small className="text-danger">{errors.houseNumber}</small>}
              </div>
              <div className="form-group">
                <label>Building/Street/Landmark *</label>
                <input type="text" name="landmark" value={FormData.landmark} onChange={handleChange} className="form-control" />
                {errors.landmark && <small className="text-danger">{errors.landmark}</small>}
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" value={FormData.city} onChange={handleChange}  className="form-control" />
                  {errors.city && <small className="text-danger">{errors.city}</small>}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input type="text" name="state" value={FormData.state} onChange={handleChange}  className="form-control" />
                  {errors.state && <small className="text-danger">{errors.state}</small>}
                </div>
              </div>
              <div className="mt-2">
                <span>Address Type</span>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="addressType"  value="Home" checked={FormData.addressType === "Home"} onChange={handleChange} />
                  <label className="form-check-label">Home</label>
                   
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="addressType" value="Office" checked={FormData.addressType === "Office"} onChange={handleChange} />
                  <label className="form-check-label">Office</label>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="mt-4">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="row">
                  {/* Cart Items */}
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="col-12 mb-4">
                      <div className="cart-item d-flex align-items-center" style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.28)', borderRadius: '8px', height: '270px', width: '630px' }}>
                        {/* Image Section */}
                        <div className="cart-item-image" style={{ height: '200px', width: '200px' }}>
                          <Link to={`/cartpage`}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ height: '100%', width: '100%', objectFit: 'contain', borderRadius: '8px' }}
                            />
                          </Link>
                        </div>
                        {/* Item Details */}
                        <div className="cart-item-details ms-3 ps-5">
                          <h5>{item.title}</h5>
                          
                          <div className="d-flex justify-content-between ">
                            
                            <div>
                            <p>₹{item.price}</p>
                              <p>Size: {item.size}</p> {/* Display item size */}
                              <p>Quantity: {item.quantity}</p> {/* Display item quantity */}
                              <p>Total: ₹{item.price * item.quantity}</p> {/* Display total price for the item */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Edit Cart Button - Only displayed once, after the last item */}
                  <div className="col-12 mt-3 mb-5">
                    <Link to="/cartpage" className="btn btn-primary w-50 d-block mx-auto">
                      Edit Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <div className="col-md-6">
            <div className="card p-3">
              <h5>Payment Mode</h5>
              <ul className="nav nav-tabs">
                {['ATM / Debit Card', 'Credit Card', 'Net Banking', 'Wallets'].map((mode) => (
                  <li key={mode} className="nav-item">
                    <button className={`nav-link ${paymentMode === mode ? 'active' : ''}`} onClick={() => setPaymentMode(mode)}>
                      {mode}
                    </button>
                  </li>
                ))}
              </ul>
              {paymentMode && (
          <div className="mt-3">
            {paymentMode === "ATM / Debit Card" || paymentMode === "Credit Card" ? (
              <>
                <div className="form-group">
                  <label>Card Number *</label>
                  <input type="text" className="form-control" placeholder="Enter Card Number" />
                </div>
                <div className="form-group">
                  <label>Name on Card *</label>
                  <input type="text" className="form-control" placeholder="Cardholder Name" />
                </div>
                <div className="form-row d-flex">
                  <div className="form-group col-4">
                    <label>Month & Year</label>
                    <input type="text" className="form-control" placeholder="MM/YY" />
                  </div>
                  <div className="form-group col-3">
                    <label>CVV</label>
                    <input type="text" className="form-control" placeholder="***" />
                  </div>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <label className="form-check-label">Save this card</label>
                </div>
              </>
            ) : (
              <p className="mt-2">You selected {paymentMode}. Please proceed with the respective payment method.</p>
            )}
          </div>
        )}

        {/* Amount payable and confirm button */}
        {paymentMode && (
          <>
            <div className="mt-3 bg-light p-2 text-danger text-center">
              <h6>Amount Payable: ₹{totalPrice}</h6>
            </div>
            <button className="btn btn-success w-100 mt-2" onClick={handleCheckout}>Confirm Order</button>
          </>
        )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
