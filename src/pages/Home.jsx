import { Link } from "react-router-dom";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-subtitle">Discover Amazing Products at Great Prices</p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
