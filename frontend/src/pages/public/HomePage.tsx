import { useGetProductsQuery } from "../../services/productsApi";

function HomePage() {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div>
      <h1>Products</h1>

      {data?.data.products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>₹ {product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;