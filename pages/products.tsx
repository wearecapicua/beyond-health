import CheckoutForm from "components/CheckoutForm";
import Image from "next/image";

export default function Home({ products }: any) {
  return (
    <ul>
    {products.productsWithPrices?.map((product: any) => (
      <li key={product.id}>
        <Image
          src={product.images[0]}
          alt={`Image of ${product.name}`}
          width={200}
          height={200}
          priority={true}
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <CheckoutForm
          productId={product.default_price}
          price={product.prices[0]?.unit_amount}
        />
      </li>
      ))}
    </ul>
  )
}

// Add getServerSideProps so we can return the data from server-side
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.HOST}/api/all-products`);
  const products = await res.json();

  // Pass data to the page via props
  return { props: { products } };
}