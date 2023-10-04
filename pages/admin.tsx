import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "components/container";
import Layout from "components/layout";
import env from "lib/env";
import PriceColumn from "components/price-column";
import { useSession } from "next-auth/react"
import PaymentButton from "components/payment-button";

type User = {
  user_id: string;
  name: string;
  email: string;
  product: any;
  stripe_setup_id: string;
};

type AdminPageProps = {
  users: User[];
  preview: any;
};

export default function AdminPage({ preview, users }: AdminPageProps) {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [productPrices, setProductPrices] = useState<{ [key: string]: number }>(
    users.reduce((acc, user) => {
      acc[user.user_id] = user.product.price;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handlePriceUpdate = (userId: string, newPrice: number) => {
    setProductPrices((prevPrices) => ({
      ...prevPrices,
      [userId]: newPrice,
    }));
  };


  useEffect(() => {
    /* @ts-ignore */
    if (session?.user?.role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);
 

  return (
    <Layout preview={preview} fullPage >
      <Head>
        <title>Beyond Health</title>
      </Head>
      <Container>
        {users.length !== 0 && isAdmin ?
          <div>
            <h3 className="mt-12 mb-7">Pending Payments</h3>
            <table className="text-left">
              <tbody>
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4"></th>
                </tr>
                
                {users?.map((user, index) => {
console.log(user.product.price)
                return(
                  <tr key={`user-${index}`}>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.product.name}</td>
                    <PriceColumn
                      product={user.product}
                      userId={user.user_id}
                      onPriceUpdate={handlePriceUpdate}
                    />
                    <td>
                    <PaymentButton
                      setupId={user.stripe_setup_id}
                      price={productPrices[user.user_id]}
                    />
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          : users.length === 0 && isAdmin ?
            <p>There are no current pending payments to show</p>
          : !isAdmin ? 
            <p>Not authorized</p>
          : null
        }
      </Container>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    // Fetch user data from your API route
    const response = await fetch(`${env.host}/api/get-stripe-customer`)
    const data = await response.json()

    return {
      props: {
        users: data, // Pass the fetched user data as props
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error)
    return {
      props: {
        users: [], // Return an empty array if there's an error
      },
    }
  }
}
