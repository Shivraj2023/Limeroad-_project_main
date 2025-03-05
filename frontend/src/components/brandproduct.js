import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./brandproduct.css";

const BrandProduct = () => {
  const { category, brandid } = useParams(); 
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(()=>{
    const Fetchdata=async()=>{
     try{
       const response= await axios.get("http://localhost:5000/products")
         const data=response.data.products;
          
           let categoryMap={
           men:new Set(),
           women:new Set(),
           kids:new Set(),
           home:new Set(),
         }
      data.forEach(item => {
       if(item.mainCategory&&categoryMap[item.mainCategory]){
         categoryMap[item.mainCategory].add(item)
       }
      });
       categoryMap=({
        men:Array.from(categoryMap.men),
        women:Array.from(categoryMap.women),
        kids:Array.from(categoryMap.kids),
        home:Array.from(categoryMap.home)
      })
      const selectedCategory = categoryMap[category] || [];
      const foundProduct = selectedCategory.find((p) => p._id === brandid);
   
      setProduct(foundProduct);
        
      if (foundProduct) {
        const filteredProducts = selectedCategory.filter(
          (p) => p.category === foundProduct.category
        );
        setSimilarProducts(filteredProducts)
      }
      }
       catch(error){
         console.error("Error fetching products:", error);
       }
     }
     Fetchdata();
   },[category, brandid]);
 

  return (
    <div className="container mt-4 brand-product-page">
  <h2 className="fw-bold">Fresh & Fabulous!</h2>
  <div className="row justify-content-center">
    {similarProducts.map((product, index) => (
      <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3"> 
        <Link to={`/products/${category}/${product._id}`} className="text-decoration-none">
          <div className="card product-card">
            <span className="badge badge-number">{index + 1}</span>
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top product-image"
            />
            <div className="card-body">
              <p className="product-title">{product.title}</p>
              <p className="brand-name">By {product.brand}</p>
              <div className="price-details">
                <span className="discounted-price">₹{product.price}</span>
                <span className="original-price">₹{product.original_price}</span>
                <span className="discount">{product.offer_percent}% off</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
  );
};

export default BrandProduct;
