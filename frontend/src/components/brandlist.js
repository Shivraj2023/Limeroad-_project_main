
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import BrandCard from './brandcard';
import './brandlist.css';


const BrandList = () => {
  const [searchParams] = useSearchParams();
  const main = searchParams.get('main');      
  const sub = searchParams.get('sub');   
  const [brandImages, setBrandImages] = useState([]);

  useEffect(() => {
    fetch("/assets/assets.json")
      .then((response) => response.json())
      .then((data) => {
        let products = [];
      
        const categoryKey = main?.toLowerCase() === 'kids'? 'kids_products'
         : `${main?.toLowerCase()}s_products`; 
        
       
        
        if (sub?.toLowerCase() === 'myfeed') {
          products = [
            ...(data.mens_products || []),
            ...(data.womens_products || []),
            ...(data.kids_products || []),
            ...(data.home_products || [])
          ];
        }
        
        else if (['men', 'women', 'kids'].includes(main?.toLowerCase())) {
          
          const allProducts = data[categoryKey] || [];
          
          products = sub
            ? allProducts.filter(
                (item) => item.category?.toLowerCase() === sub.toLowerCase()
              )
            : allProducts;
        }
  
        
        const uniqueBrands = [
          ...new Set(
            products.map(item =>
              JSON.stringify({
                brandImage: item.brand_image,
                brandName: item.brand_name || 'Brand',
                brandId:item.id,
              })
            )
          )
        ].map(JSON.parse);
  
        setBrandImages(uniqueBrands);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [main, sub]);
  
  

  if (!brandImages.length) {
    return <p className="text-center mt-4">No brands available for this category.</p>;
  }

  return (
    <div className="container my-4">
    <div className="row g-4">
      {brandImages.filter((brand) => brand.brandImage && brand.brandName).length > 0 ? (
        brandImages
          .filter((brand) => brand.brandImage && brand.brandName)
          .map((brand, index) => (
            <div 
              key={index} 
              className="col-12 col-sm-6 col-md-4 col-lg-3 item-container"
            >
              <BrandCard 
                image={brand.brandImage} 
                brandName={brand.brandName} 
                brandid={brand.brandId}
                main={main}
              />
            </div>
          ))
      ) : (
        <div className="col-12 text-center">
          <p className="no-brands-card">
            No brands found for the selected categorie.
          </p>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default BrandList;
