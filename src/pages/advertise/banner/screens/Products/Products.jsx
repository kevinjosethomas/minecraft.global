import ProductCard from "./components/ProductCard";
import NewProductCard from "./components/NewProductCard";

export default function Products(props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {props.products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
      <NewProductCard />
    </div>
  );
}
