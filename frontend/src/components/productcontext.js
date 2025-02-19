import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/assets/assets.json")
      .then((response) => response.json())
      .then((data) => {
        // Flatten all category products into one array
        const allProducts = [
          ...(data.mens_products || []),
          ...(data.womens_products || []),
          ...(data.kids_products || []),
          ...(data.home_products || []),
        ];
        setProducts(allProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};
