import React from 'react';
import './Preorder.css';
import hamlet from '../assets/hero-image.jpg'; 

const Preorder = () => {
  const loadRazorpay = () => {
    const options = {
      key: 'rzp_test_qzGirRI0BIcMGt', // Replace with your Razorpay key
      amount: 649900, // Amount in paisa (₹6499)
      currency: 'INR',
      name: 'MINDSHIELD',
      description: 'Pre-order Payment',
      handler: function (response) {
        window.location.href = '/dashboard'; // Redirect to home page after success
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="preorder-layout">
      {/* Product Card */}
      <div className="preorder-container">
        <div className="card">
          <img
            src={hamlet} // Replace with the product image URL
            alt="Product"
            className="product-image"
          />

          {/* Price Display */}
          <h2 className="product-price">₹6,499</h2>

          {/* Features List */}
          <ul className="product-features">
            <li>Instant collision detection</li>
            <li>Emergency Contact</li>
            <li>Emergency Response within 3-5 seconds</li>
          </ul>

          {/* Buy Now Button */}
          <button className="buy-now" onClick={loadRazorpay}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preorder;
