import ProductCard from "./components/ProductCard";
import NewProductCard from "./components/NewProductCard";

export default function Products(props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {props.products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
      <NewProductCard />
    </div>
  );
}
