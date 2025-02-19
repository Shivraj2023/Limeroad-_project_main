import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./brandproduct.css"; // Custom styles

const BrandProduct = () => {
  const { category, brandid } = useParams(); // Correct parameter name
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetch("/assets/assets.json")
      .then((response) => response.json())
      .then((data) => {
        const categoryMap = {
          men: data.mens_products || [],
          women: data.womens_products || [],
          kids: data.kids_products || [],
          home: data.home_products || [],
        };

        const selectedCategory = categoryMap[category] || [];
        const foundProduct = selectedCategory.find((p) => p.id === parseInt(brandid));

        setProduct(foundProduct);

        if (foundProduct) {
          const filteredProducts = selectedCategory.filter(
            (p) => p.category === foundProduct.category
          );
          setSimilarProducts(filteredProducts)

          // Ensure the found product is included if the filtered list is valid
          /* if (filteredProducts.length > 0) {
            setSimilarProducts([...filteredProducts, foundProduct]);
          } else {
            setSimilarProducts([foundProduct]);
          } */
        }
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [category, brandid]);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Fresh & Fabulous!</h2>
      <div className="row">
        {similarProducts.map((product, index) => (
          <div key={product.id} className="col-md-3">
            <Link to={`/products/${category}/${product.id}`} className="text-decoration-none">
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
