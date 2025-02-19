// BrandCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import './brandcard.css'

function BrandCard({ image, brandName,brandid,main }) {
  

  return (
    <div className="card brand-card">
        <h3 className='custom'>{brandName} ALERT..!</h3>
        <Link to={`/brand/${main}/${brandid}`}>
        <img src={image} alt={brandName} className="card-img-top" />
      </Link>

      <div className="card-body">
    <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRmLtGCnpFfkNXI-18f7i0xu3nezn6m8VGBA&s" 
    alt={`${brandName} logo`} 
    className="brand-logo" />
   
   <div className="brand-info">
     <h6 className="brand-name">By {brandName}</h6>
      <p className="followers">
         {Math.floor(Math.random() * 9000) + 1000} Followers
    </p>
  </div>
  
  <div className="icons">
    <span className="heart-icon">
      <i className="fa-regular fa-heart"></i>
    </span>
    <span className="whatsapp-icon">
      <i className="fa-brands fa-whatsapp"></i>
    </span>
  </div>
</div>
</div>

  );
}

export default BrandCard;
