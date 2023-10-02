// pages/buy.js

import Link from "next/link";

export default function BuyPage() {
  return (
    <div className="container">
      <h1>Buy Course</h1>
      <form>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate" />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" id="price" name="price" readOnly value="$50" />
        </div>
        <button type="submit">Buy Now</button>
      </form>
      <Link href="/courses">Back to Courses</Link>
    </div>
  );
}
